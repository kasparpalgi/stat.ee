import { debugLogError, debugLogInfo } from '../../application/logger';
import { env } from '../config/environment';
import OracleDB, {
    InitOracleClientOptions,
    Pool,
    PoolAttributes
} from "oracledb";

/**
 * Oracle database configuration class that handles connection pooling and client initialization.
 * This implementation supports both node-oracledb Thin and Thick modes.
 */
export class OracleConfig {
    private static instance: OracleConfig;
    private initialized = false;
    private pool?: Pool;
    private config: PoolAttributes;

    private constructor() {
        this.config = this.loadConfig();
    }

    public static getInstance(): OracleConfig {
        if (!OracleConfig.instance) {
            OracleConfig.instance = new OracleConfig();
        }
        return OracleConfig.instance;
    }

  

    public async initialize(clientOpts?: InitOracleClientOptions): Promise<void> {
        // Skip initialization if no valid Oracle client configuration is available
        if (env.canUseDatabase() === false) {
            debugLogInfo('Database is not enabled, skipping initialization');
            return;
        }
        if (this.initialized) return;

        try {
            // Log the start of initialization
            debugLogInfo('Initializing Oracle client...');

            // Initialize the Oracle client with optional configuration
            await this.initializeOracleClient(clientOpts);

            // Configure connection settings like outFormat and autoCommit
            await this.configureConnectionSettings();

            // Test the connection to ensure Oracle is accessible
            await this.testConnection();

            // Create a connection pool for efficient connection management
            await this.createConnectionPool();

            // Mark initialization as complete
            this.initialized = true;
        } catch (error) {
            debugLogError(`Failed to initialize Oracle client: ${error}`);
            throw new Error(`Oracle initialization failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }


    private async initializeOracleClient(clientOpts?: InitOracleClientOptions): Promise<void> {
        const initOptions: InitOracleClientOptions = {
            driverName: 'Stat-ee : 1.0.0',
            errorUrl: 'https://node-oracledb.readthedocs.io/en/latest/user_guide/initialization.html#enabling-node-oracledb-thick-mode',
            ...clientOpts
        };

        try {
            // Optionally run in node-oracledb Thick mode
            if (env.get('ORACLE_DRIVER_MODE') === 'thick') {
                debugLogInfo('Thick mode explicitly requested');

                let thickModeOpts = { ...initOptions };

                // On Windows and macOS Intel platforms, set the Oracle Client library path
                if (process.platform === 'win32' || (process.platform === 'darwin' && process.arch === 'x64')) {
                    const libDir = process.env.NODE_ORACLEDB_CLIENT_LIB_DIR;
                    if (libDir) {
                        thickModeOpts.libDir = libDir;
                        debugLogInfo(`Using Oracle client library directory: ${libDir}`);
                    }
                }

                OracleDB.initOracleClient(thickModeOpts);
                debugLogInfo('Oracle client initialized in thick mode');
                return;
            }

            // Default initialization without thick mode
            debugLogInfo('Initializing Oracle client in default mode');
            OracleDB.initOracleClient(initOptions);
            debugLogInfo('Oracle client initialized successfully');

        } catch (error) {
            debugLogInfo('Standard initialization failed, falling back to thin mode');
            debugLogInfo(`Initialization error: ${error}`);
            await this.initializeThinMode();
        }

        debugLogInfo(OracleDB.thin ? 'Running in thin mode' : 'Running in thick mode');
    }

    private async initializeThinMode(): Promise<void> {
        debugLogInfo('Initializing Oracle client in thin mode');
        this.config = {
            ...this.config,
            thinMode: true
        };
        debugLogInfo('Oracle thin mode enabled');
    }

    private async configureConnectionSettings(): Promise<void> {
        OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;
        OracleDB.autoCommit = true;
        debugLogInfo('Oracle connection settings configured');
    }

    private async testConnection(): Promise<void> {
        debugLogInfo('Attempting test connection...');
        try {
            const testConnection = await OracleDB.getConnection(this.config);
            await testConnection.close();
            debugLogInfo('Test connection successful');
        } catch (connError) {
            debugLogError(`Test connection failed: ${connError}`);
            throw new Error(`Connection test failed: ${connError instanceof Error ? connError.message : String(connError)}`);
        }
    }

    private async createConnectionPool(): Promise<void> {
        debugLogInfo('Creating connection pool...');
        this.pool = await OracleDB.createPool(this.config);
        debugLogInfo(`Connection pool created successfully. Min: ${this.config.poolMin}, Max: ${this.config.poolMax}`);
    }

    public getPool(): Pool {
        if (!this.initialized || !this.pool) {
            throw new Error('Oracle client not initialized. Call initialize() first.');
        }
        return this.pool;
    }

    public async close(): Promise<void> {
        if (this.pool) {
            try {
                debugLogInfo('Closing connection pool...');
                await this.pool.close(0);
                this.initialized = false;
                debugLogInfo('Connection pool closed successfully');
            } catch (error) {
                debugLogError(`Failed to close pool: ${error}`);
                throw error;
            }
        }
    }

    private loadConfig(): PoolAttributes {
        if (env.canUseDatabase() === false) {
            debugLogInfo('Database is not enabled, skipping configuration');
            return null;
        }
        debugLogInfo('Loading database configuration...');
        const config: PoolAttributes = {
            user: env.get('ORACLE_USER').trim(),
            password: env.get('ORACLE_PASSWORD').trim(),
            connectString: env.get('ORACLE_CONNECT_STRING').trim(),
            poolMin: env.get('ORACLE_POOL_MIN'),
            poolMax: env.get('ORACLE_POOL_MAX'),
            poolIncrement: env.get('ORACLE_POOL_INCREMENT'),
            poolTimeout: 60,
            queueTimeout: 60000,
            enableStatistics: env.get('ORACLE_ENABLE_STATS')
        };
        debugLogInfo('Database configuration loaded successfully');
        return config;
    }
}