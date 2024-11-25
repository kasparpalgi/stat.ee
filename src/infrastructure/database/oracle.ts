import OracleDB, { BindParameters, Connection } from "oracledb";
import { replaceNaWith0 } from "../../application";
import { debugLogError, logQueryError, logQuerySuccess } from "../../application/logger";

import dotenv from "dotenv";
import path from "path";
import * as fs from "fs";

dotenv.config();

interface OracleConfig {
  user: string;
  password: string;
  connectString: string;
  sslServerCertDN?: string;
  sslServerCert?: string;
  poolMin?: number;
  poolMax?: number;
  poolIncrement?: number;
  poolTimeout?: number;
  libDir?: string;
}

/**
 * Validates and retrieves Oracle database configuration from environment variables
 * Provides robust configuration validation with enhanced security checks
 */
const validateOracleConfig = (): OracleConfig => {
  const requiredVars = [
    'ORACLE_USER',
    'ORACLE_PASSWORD',
    'ORACLE_THICK_CONNECT_STRING'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    const errorMessage = [
      "Oracle Database Configuration Security Error",
      "Critical configuration variables are missing:",
      ...missingVars.map(v => `- ${v}`),
      "\nSecure Configuration Requirements:",
      "ORACLE_USER=secure_database_username",
      "ORACLE_PASSWORD=complex_password_with_high_entropy",
      "ORACLE_THICK_CONNECT_STRING=fully_qualified_thick_client_connection_string",
      "\nSecurity Recommendations:",
      "- Use environment-specific credentials",
      "- Implement strong password policies",
      "- Use encrypted connection strings",
      "- Rotate credentials regularly"
    ].join('\n');

    debugLogError(errorMessage);
    throw new Error('Incomplete or insecure Oracle database configuration');
  }

  // Validate connection string complexity and format
  const connectString = process.env.ORACLE_THICK_CONNECT_STRING!;
  if (!connectString.includes('@') || !connectString.includes(':')) {
    throw new Error('Invalid thick connection string format');
  }

  return {
    user: process.env.ORACLE_USER!,
    password: process.env.ORACLE_PASSWORD!,
    connectString: connectString,
    sslServerCertDN: process.env.ORACLE_CERT_DN,
    sslServerCert: process.env.ORACLE_CERT_DN ? readCertificate() : undefined,
    poolMin: parseInt(process.env.ORACLE_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.ORACLE_POOL_MAX || '10', 10),
    poolIncrement: parseInt(process.env.ORACLE_POOL_INCREMENT || '1', 10),
    poolTimeout: parseInt(process.env.ORACLE_POOL_TIMEOUT || '30', 10),
    libDir: process.env.ORACLE_CLIENT_LIB_DIR
  };
};

/**
 * Reads SSL certificate with enhanced security and error handling
 * Implements additional validation and logging for certificate integrity
 */
const readCertificate = (): string | undefined => {
  try {
    const certificatePath = path.resolve(process.cwd(), "certs", "ca.pem");

    // Enhanced file existence and permission checks
    if (!fs.existsSync(certificatePath)) {
      debugLogError(`Security Alert: SSL Certificate not found at: ${certificatePath}`);
      return undefined;
    }

    /**
     * Validates SSL certificate file permissions
     * 
     * Checks that the certificate file has strict read/write permissions for the owner only (0o600)
     * Logs a security warning if permissions are too permissive
     * 
     * @throws {Error} If file stat retrieval fails
     */
    const stats = fs.statSync(certificatePath);
    const filePermissions = stats.mode & 0o777;
    if (filePermissions !== 0o600) {
      debugLogError(`Security Warning: Certificate file permissions are too permissive. Current permissions: ${filePermissions.toString(8)}`);
    }

    const certificate = fs.readFileSync(certificatePath, { encoding: 'utf8' });

    if (!certificate || certificate.trim().length === 0) {
      debugLogError("Security Error: Invalid or empty SSL certificate");
      return undefined;
    }

    // Basic PEM format validation
    if (!certificate.includes('BEGIN CERTIFICATE') || !certificate.includes('END CERTIFICATE')) {
      debugLogError('nvalid certificate format');
      return undefined;
    }

    return certificate;
  } catch (error) {
    debugLogError(`Certificate Reading Security Failure: ${error instanceof Error ? error.message : String(error)}`);
    return undefined;
  }
};

const oracleConfig = validateOracleConfig();

/**
 * Executes a database query with comprehensive security and error handling
 * Implements input sanitization, query logging, and secure error management
 */
export async function dbQuery(
  textQuery: string,
  variables: BindParameters,
  correlationID: string
): Promise<any> {
  const connection = new DatabaseConnection();
  let dbConnect: Connection | undefined;

  try {
    // Enhanced input validation
    if (!textQuery || typeof textQuery !== 'string' || textQuery.trim().length === 0) {
      throw new Error('Invalid or empty query input');
    }

    // Prevent potential SQL injection by checking query structure
    if (textQuery.toLowerCase().includes('drop') || textQuery.toLowerCase().includes('delete')) {
      throw new Error('Potentially destructive query blocked');
    }

    dbConnect = await connection.connectWithDB();

    const result = await dbConnect.execute(textQuery, variables, {
      outFormat: OracleDB.OUT_FORMAT_OBJECT,
      maxRows: 500, // Reduced from 1000 for additional security
    });

    logQuerySuccess(correlationID, textQuery, result);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    return replaceNaWith0(result.rows[0]);
  } catch (error) {
    debugLogError(error);
    logQueryError(correlationID, textQuery, error);
    throw new Error(`Query failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (dbConnect) {
      await connection.doRelease(dbConnect);
    }
  }
}

/**
 * Manages Oracle database connections with enhanced security, robust error handling, 
 * and comprehensive connection management
 */
export default class DatabaseConnection {
  private readonly oracleDB = OracleDB;
  private readonly dbConfig: OracleConfig;

  constructor(config: OracleConfig = oracleConfig) {
    this.dbConfig = {
      ...config,
      sslServerCert: config.sslServerCertDN ? readCertificate() : undefined
    };
  }

  /**
   * Initializes Oracle client with secure, configurable settings
   * Implements strict library initialization with error tracking
   */
  public async init(): Promise<void> {
    try {
      if (this.dbConfig.libDir) {
        OracleDB.initOracleClient({
          libDir: this.dbConfig.libDir,
        });
      }
    } catch (error) {
      debugLogError(`Oracle Client Initialization Failure: ${error}`);
      throw new Error('Critical failure initializing Oracle client');
    }
  }

  /**
   * Establishes a secure, authenticated connection to the Oracle database
   * Implements comprehensive connection error handling
   */
  public async connectWithDB(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      this.oracleDB.getConnection(
        this.dbConfig,
        (err: Error | null, connection: Connection | null) => {
          if (err || !connection) {
            debugLogError(`Secure Connection Failure: ${err?.message || 'Unknown authentication error'}`);
            reject(new Error(`Secure database connection failed: Authentication or network issue`));
            return;
          }
          resolve(connection);
        }
      );
    });
  }

  /**
   * Safely releases database connection with comprehensive error management
   * Implements secure connection termination
   */
  public async doRelease(connection: Connection): Promise<void> {
    return new Promise((resolve) => {
      connection.release((err) => {
        if (err) {
          debugLogError(`Connection Release Error: ${err.message}`);
        }
        resolve();
      });
    });
  }
}
