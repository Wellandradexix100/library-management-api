import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.funcao !== "ADMIN") {
        throw new AppError("Apenas administradores podem criar outros administradores", 403);
    }
    next();
};