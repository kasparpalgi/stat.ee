import OracleDB, { BindParameters } from 'oracledb';
import { debugLogError, logQueryError, logQuerySuccess, replaceNaWith0 } from '../../application';
import dotenv from 'dotenv';
import path from 'path';
import * as fs from 'fs';

dotenv.config();

let { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING, ORACLE_CERT_DN } = process.env;


export async function dbQuery(textQuery: string, variables: BindParameters,correlationID: string ): Promise<any> {
    const connection = new DatabaseConnection();
    let dbConnect: OracleDB.Connection;
    try {
        dbConnect = await connection.connectWithDB();
        const result = await dbConnect.execute(textQuery, variables, { outFormat: OracleDB.OUT_FORMAT_OBJECT });
        logQuerySuccess(correlationID, textQuery, result);
        const json = replaceNaWith0(result.rows[0]);
        return json;
    } catch (error) {
        debugLogError(error);
        logQueryError(correlationID, textQuery, error);
        throw new Error('Query not found');
    } finally {
        new DatabaseConnection().doRelease(dbConnect);
    }
}

export default class DatabaseConnection {
    private oracleDB = OracleDB;

    private dbConfig = {
        user: ORACLE_USER,
        password: ORACLE_PASSWORD,
        connectString: ORACLE_CONNECT_STRING,
        sslServerCert: ORACLE_CERT_DN !== undefined ? caCertificate() : undefined,
        sslServerCertDN: ORACLE_CERT_DN,
    };

    public async init(): Promise<void> {
    }

    public async connectWithDB(): Promise<OracleDB.Connection> {
        return new Promise((resolve, reject) => {
            
            this.oracleDB.getConnection(
                this.dbConfig, (err: any, connection: any) => {
                if (err) {
                    debugLogError(err);
                    reject(err.message);
                }
                resolve(connection);
            });
        });
    }

    public doRelease(connection) {
        connection.release((err) => {
            if (err) {
                debugLogError(err);
            }
        });
    }
}


export function caCertificate(): string {
    try {
        console.log('Reading SSL certificate');
        // Path to SSL certificate and key
        const certificatePath = path.join(process.cwd(), 'certs', 'ca.pem');
        // Read SSL certificate and key
        const certificate = fs.readFileSync(certificatePath, 'utf8');
        return certificate;
    } catch (error) {
        debugLogError(error);
        throw new Error('SSL certificate not found');
    }
}
