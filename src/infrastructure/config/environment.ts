import dotenv from 'dotenv';
import { debugLogError } from '../../application/logger';

interface EnvironmentConfig {
    PORT: number;
    SSL: boolean;
    LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    LOG_REQUEST: boolean;
    JSON_ENABLED: boolean;
    // Oracle Configuration
    ORACLE_ENABLED: boolean;
    ORACLE_USER?: string;
    ORACLE_PASSWORD?: string;
    ORACLE_CONNECT_STRING?: string;
    ORACLE_POOL_MIN?: number;
    ORACLE_POOL_MAX?: number;
    ORACLE_POOL_INCREMENT?: number;
    ORACLE_ENABLE_STATS?: boolean;
    ORACLE_CLIENT_LIB_DIR?: string;
    TNS_ADMIN?: string;
    ORACLE_DRIVER_MODE: 'thin' | 'thick' ;
}

class Environment {
    private static instance: Environment;
    private config: EnvironmentConfig;
    private envVars: NodeJS.ProcessEnv;

    private constructor() {
        // Load .env file
        const dotenvResult = dotenv.config();

        // Combine process.env with dotenv, giving precedence to dotenv
        this.envVars = {
            ...process.env,
            ...(dotenvResult.error ? {} : dotenvResult.parsed || {})
        };

        this.loadEnvironment();
    }

    public static getInstance(): Environment {
        if (!Environment.instance) {
            Environment.instance = new Environment();
        }
        return Environment.instance;
    }

    private loadEnvironment(): void {
        this.config = {
            PORT: this.getNumberValue('PORT', 80),
            SSL: this.getBooleanValue('SSL', false),
            LOG_LEVEL: this.getLogLevel('LOG_LEVEL', 'info'),
            LOG_REQUEST: this.getBooleanValue('LOG_REQUEST', true),
            // JSON API Configuration
            JSON_ENABLED: this.getBooleanValue('JSON_ENABLED', true),
            // Database API Configuration
            ORACLE_ENABLED: this.getBooleanValue('ORACLE_ENABLED', true),
            ORACLE_USER: this.getString('ORACLE_USER', null),
            ORACLE_PASSWORD: this.getString('ORACLE_PASSWORD', null),
            ORACLE_CONNECT_STRING: this.getString('ORACLE_CONNECT_STRING', null),
            ORACLE_POOL_MIN: this.getNumberValue('ORACLE_POOL_MIN', 10),
            ORACLE_POOL_MAX: this.getNumberValue('ORACLE_POOL_MAX', 50),
            ORACLE_POOL_INCREMENT: this.getNumberValue('ORACLE_POOL_INCREMENT', 5),
            ORACLE_ENABLE_STATS: this.getBooleanValue('ORACLE_ENABLE_STATS', false),
            ORACLE_CLIENT_LIB_DIR: this.getString('ORACLE_CLIENT_LIB_DIR', null),
            TNS_ADMIN: this.getString('TNS_ADMIN', null),
            ORACLE_DRIVER_MODE: this.getDriverMode('ORACLE_DRIVER_MODE', 'thick') ,
        };

        this.validateConfig();
    }
    public canUseDatabase(): boolean {
        return this.config.ORACLE_ENABLED;
    }

    public canUseJson(): boolean {
        return this.config.JSON_ENABLED;
    }

    private getValue(key: string): string | undefined {
        return this.envVars[key];
    }

    private getString(key: string, defaultValue: string | null): string | null {
        const value = this.getValue(key);
        if (!value) return defaultValue;
        return value;
    }

    private getDriverMode(key: string, defaultValue: 'thin' | 'thick'): 'thin' | 'thick'{
        const value = this.getValue(key)?.toLowerCase();
        if (!value) return defaultValue;
        
        if (value !== 'thin' && value !== 'thick') {
            throw new Error(`Environment variable ${key} must be 'thin' or 'thick'`);
        }
        return value as 'thin' | 'thick';
    }

    private getNumberValue(key: string, defaultValue: number): number {
        const envValue = this.getValue(key);
        if (!envValue) return defaultValue;

        const numValue = parseInt(envValue, 10);
        if (isNaN(numValue)) {
            throw new Error(`Environment variable ${key} must be a valid number`);
        }
        return numValue;
    }

    private getBooleanValue(key: string, defaultValue: boolean): boolean {
        const envValue = this.getValue(key)?.toLowerCase();
        if (!envValue) return defaultValue;

        if (envValue !== 'true' && envValue !== 'false') {
            throw new Error(`Environment variable ${key} must be either 'true' or 'false'`);
        }
        return envValue === 'true';
    }

    private getLogLevel(key: string, defaultValue: 'info'): 'debug' | 'info' | 'warn' | 'error' {
        const envValue = this.getValue(key)?.toLowerCase();
        if (!envValue) return defaultValue;

        if (!['debug', 'info', 'warn', 'error'].includes(envValue)) {
            throw new Error(`Environment variable ${key} must be one of: debug, info, warn, error`);
        }
        return envValue as 'debug' | 'info' | 'warn' | 'error';
    }

    private validateConfig(): void {
        if (this.config.PORT <= 0 || this.config.PORT > 65535) {
            throw new Error('PORT must be between 1 and 65535');
        }

        // Only validate Oracle config if Oracle is enabled
        if (this.config.ORACLE_ENABLED) {
            // Check required Oracle configuration
            if (!this.config.ORACLE_USER) {
                throw new Error('ORACLE_USER is required when Oracle is enabled');
            }


            if (!this.config.ORACLE_CONNECT_STRING) {
                throw new Error('ORACLE_CONNECT_STRING is required when Oracle is enabled');
            }

            // Validate Oracle pool configuration
            if (this.config.ORACLE_POOL_MIN > this.config.ORACLE_POOL_MAX) {
                throw new Error('ORACLE_POOL_MIN cannot be greater than ORACLE_POOL_MAX');
            }

            if (this.config.ORACLE_POOL_INCREMENT <= 0) {
                throw new Error('ORACLE_POOL_INCREMENT must be greater than 0');
            }
        }
    }

    public get<K extends keyof EnvironmentConfig>(key: K | null): EnvironmentConfig[K] | null {
        try {
            return key ? this.config[key] : null;
        } catch (error) {
            debugLogError(`Failed to get environment variable ${key}: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    // Utility method to check if a variable exists and has a non-null value
    public has(key: string): boolean {
        try {
            return key in this.envVars && this.envVars[key] !== null && this.envVars[key] !== undefined;
        } catch (error) {
            debugLogError(`Failed to check environment variable ${key}: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}

export const env = Environment.getInstance(); 