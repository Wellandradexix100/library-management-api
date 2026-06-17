import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: 'Erro de validação',
            issues: error.issues
        });
    }

    console.error(error);

    return res.status(500).json({
        message: 'Erro interno no servidor'
    });
};
