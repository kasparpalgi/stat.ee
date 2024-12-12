import { debugLogError } from '../../application/logger';
import { OracleConfig } from './oracle-config';
import {
    BindParameters,
    Connection,
    ExecuteOptions,
    OUT_FORMAT_OBJECT
} from "oracledb";

export class OracleClient {
    private config: OracleConfig;

    constructor() {
        this.config = OracleConfig.getInstance();
    }

    /**
     * Executes a query with bind parameters
     */
    public async query<T = any>(
        sql: string,
        bindParams: BindParameters = {},
        options: ExecuteOptions = {}
    ): Promise<T[]> {
        let connection: Connection | undefined;

        try {
            connection = await this.config.getPool().getConnection();

            const result = await connection.execute(sql, bindParams, {
                outFormat: OUT_FORMAT_OBJECT,
                maxRows: options.maxRows || 1000,
                ...options
            });

            return (result.rows || []) as T[];

        } catch (error) {
            debugLogError(`Query execution failed: ${error}`);
            throw error;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (error) {
                    debugLogError(`Failed to close connection: ${error}`);
                }
            }
        }
    }

    /**
     * Executes a query and returns a single result
     */
    public async queryOne<T = any>(
        sql: string,
        bindParams: BindParameters = {},
        options: ExecuteOptions = {}
    ): Promise<T | null> {
        const results = await this.query<T>(sql, bindParams, { ...options, maxRows: 1 });
        
        return results[0] || null;
    }
}

// Export a default instance
export default new OracleClient(); 