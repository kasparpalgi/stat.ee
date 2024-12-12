import { randomUUID } from "crypto";
import { env } from "../infrastructure/config/environment";
import { ModelIndicator } from '../domain/model_indicator';

export function debugLogError(exception?: any) {
    if (env.get('LOG_LEVEL') === 'debug') {
        console.log(exception);
    }
}

export function debugLogInfo(message: string) {
    if (env.get('LOG_LEVEL') === 'debug') {
        console.log(message);
    }
}

export function logToStdout(message: QueryLog | RequestLog | Record<string, any>) {
    if (!env.get('LOG_REQUEST')) {
        return;
    }
    process.stdout.write(JSON.stringify(message) + '\n');
}

export function logModelLoadError(cluster: string, model: ModelIndicator, error_message: string) {
    logToStdout({
        id: randomUUID(),
        timestamp: new Date().toISOString(),
        severity: 'ERROR',
        event_code: 500,
        event_type: 'error',
        error_message: error_message,
        additional_info: `Cannot load model for cluster ${cluster} and model ${model}.`,
    });
}



export function logRequestSuccess(request_id: string, response_data: Record<string, any>) {
    logToStdout({
        id: request_id,
        timestamp: new Date().toISOString(),
        severity: 'INFO',
        event_code: 200,
        event_type: 'success',
        additional_info: "Processed without errors.",
        response_data: JSON.stringify(response_data),
    });
}

export function logQuerySuccess(correlation_id: string, query: string, response_data: Record<string, any>,) {
    logToStdout({
        id: randomUUID(),
        correlation_id: correlation_id,
        timestamp: new Date().toISOString(),
        query: query,
        response: JSON.stringify(response_data),
    });

}

export function logQueryError(correlation_id: string, query: string, error_message: string) {
    logToStdout({
        id: randomUUID(),
        correlation_id: correlation_id,
        timestamp: new Date().toISOString(),
        query: query,
        response: error_message,
    });

}


interface RequestLog {
    id: string;
    timestamp: string;
    severity: 'INFO' | 'ERROR';
    event_code: number;
    event_type: string;
    error_message?: string | null;
    response_data?: string | null;
    additional_info: string;
}


interface QueryLog {
    id: string;
    correlation_id: string;
    timestamp: string;
    query: string;
    response: string;
}