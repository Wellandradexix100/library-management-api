import { Request, Response } from "express";
import { createEmprestimoService, getEmprestimosService, devolverEmprestimoService } from "../services/emprestimoservice";

export const todosEmprestimos = async (req: Request, res: Response) => {
    const emprestimos = await getEmprestimosService()
    res.status(200).json(emprestimos)
}

export const createEmprestimo = async (req: Request, res: Response) => {
    const { livroId, usuarioId, previstaDevolucao } = req.body
    const emprestimo = await createEmprestimoService(livroId, usuarioId, previstaDevolucao)
    res.status(201).json(emprestimo)
}

export const devolverEmprestimo = async (req: Request, res: Response) => {
    const emprestimoId = req.params.id as string
    const emprestimoDevolvido = await devolverEmprestimoService(emprestimoId)
    res.status(200).json(emprestimoDevolvido)
}