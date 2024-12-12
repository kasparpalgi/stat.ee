import dotenv from 'dotenv';
import { debugLogError } from '../../application/logger';

interface EnvironmentConfig {
    PORT: number;
    SSL: boolean;
    LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    LOG_REQUEST: boolean;
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
        };

        this.validateConfig();
    }

    private getValue(key: string): string | undefined {
        return this.envVars[key];
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