import { randomUUID } from "crypto";
import { ModelIndicator } from "src/domain/model_indicator";

import dotenv from 'dotenv';

dotenv.config();
const { LOG_LEVEL, LOG_REQUEST } = process.env;

export function debugLogError(exception ?: any) {
    if (LOG_LEVEL === 'debug') {
        console.log(exception);
    }
}

function logToStdout( message: QueryLog | RequestLog) {
    if (LOG_REQUEST === 'false') {
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

export function logRequestError(request_id: string, error_message: string) {
    logToStdout({
        id: request_id,
        timestamp: new Date().toISOString(),
        severity: 'ERROR',
        event_code: 500,
        event_type: 'error',
        error_message: error_message,
        additional_info: "An error occurred while processing the request.",
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