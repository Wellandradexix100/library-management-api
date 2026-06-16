import { Request, Response } from "express";
import { loginService, registerService, createAdminService } from "../services/authService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.status(200).json(user);
};

export const register = async (req: Request, res: Response) => {
    const { nome, email, password } = req.body;
    const user = await registerService(nome, email, password);
    res.status(201).json(user);
};

export const createAdmin = async (req: Request, res: Response) => {
    const { nome, email, password } = req.body;
    const user = await createAdminService(nome, email, password);
    res.status(201).json(user);
};