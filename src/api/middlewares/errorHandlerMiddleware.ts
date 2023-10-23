import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../lib';

export function errorHandlerMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction) {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    console.error('Error Handler Middleware', err?.message, err.statusCode, err?.stack, err?.name);
    return res.status(err.statusCode).json({ error: err.message });
}
