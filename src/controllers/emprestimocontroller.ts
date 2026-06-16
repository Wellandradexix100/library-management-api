import { Request, Response } from "express";
import { createEmprestimoService, getEmprestimosService } from "../services/emprestimoservice";

export const todosEmprestimos = async (req: Request, res: Response) => {
    const emprestimos = await getEmprestimosService()
    res.status(200).json(emprestimos)
}

export const createEmprestimo = async (req: Request, res: Response) => {
    const { livroId, usuarioId } = req.body
    try {
        const emprestimo = await createEmprestimoService(livroId, usuarioId)
        res.status(201).json(emprestimo)
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar emprestimo' })
    }
}