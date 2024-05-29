import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export type ErrorPayload = {
    error: string;
    status: StatusCodes;
    message: string;
};

export const REQUEST_VALIDATION_ERROR: ErrorPayload = {
    status: StatusCodes.BAD_REQUEST,
    error: 'invalid-request',
    message: 'The request payload is incorrect',
};

const asErrors = <T>(et: {
    [K in keyof T]: Pick<ErrorPayload, 'status' | 'message'> & {
        /**
         * Determines if the error can leak information about users to attackers.
         */
        sensitive?: boolean;
    };
}) => et;

export const ERRORS = asErrors({
    'bad-request': {
        status: StatusCodes.BAD_REQUEST,
        message: 'Bad Request',
    },
    'route-not-found': {
        status: StatusCodes.NOT_FOUND,
        message: 'Route not found',
    },
    'disabled-endpoint': {
        status: StatusCodes.CONFLICT,
        message: 'This endpoint is disabled',
    },
    'invalid-request': {
        status: StatusCodes.BAD_REQUEST,
        message: 'The request payload is incorrect',
    },
    'company-not-found': {
        status: StatusCodes.BAD_REQUEST,
        message: 'Ettevõtet ei leitud.',
    },
    'cluster-not-found': {
        status: StatusCodes.NOT_FOUND,
        message: 'Klaster muu.',
    },
    'forbidden': {
        status: StatusCodes.FORBIDDEN,
        message: 'Forbidden',
    },
    'forbidden-endpoint-in-production': {
        status: StatusCodes.BAD_REQUEST,
        message: 'This endpoint is only available on test environments',
    },
    'internal-error': {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
    },
});

export const sendError = (
    res: Response,
    code: keyof typeof ERRORS,
    {
        customMessage,
        redirectTo,
    }: { customMessage?: string; redirectTo?: string } = {},
    forwardRedirection?: boolean
) => {
    const error = ERRORS[code];
    const message = customMessage ?? error.message;
    const status = error.status;

    return res.status(status).send({ status, message, error: error });
};

/**
 * This is a custom error middleware for Express.
 * https://expressjs.com/en/guide/error-handling.html
 */
export async function serverErrors(
    error: Error,
    _req: Request,
    res: Response,
    // * See: https://stackoverflow.com/a/61464426
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): Promise<unknown> {
    return sendError(res, 'internal-error', {
        customMessage: JSON.stringify({
            message: error.message || 'An unknown error occurred',
            stack: error.stack,
        }),
    });
}

export const sendUnspecifiedError = (res: Response, e: unknown) => {
    const error = e as Error;
    if (error.message in ERRORS) {
        return sendError(res, error.message as keyof typeof ERRORS);
    } else {
        return sendError(res, 'internal-error', {
            customMessage: JSON.stringify({
                message: error.message || 'An unknown error occurred',
                stack: error.stack,
            }),
        });
    }
};