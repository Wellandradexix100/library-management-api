import { Request, Response, NextFunction } from "express";

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.funcao !== "ADMIN") {
        return res.status(403).json({ message: "Apenas administradores podem criar outros administradores" });
    }
    next();
};