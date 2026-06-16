import { Request, Response } from "express";
import { getAutoresService, createAutorService, deleteAutorService } from "../services/autorService";

export const todosAutores = async (req: Request, res: Response) => {
    try {
        const autores = await getAutoresService();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

export const adicionarAutor = async (req: Request, res: Response) => {
    const { nome } = req.body;
    try {
        const autor = await createAutorService(nome);
        res.status(201).json(autor);
    } catch (error) {
        if (error instanceof Error && error.message === 'Nome do autor inválido') {
            return res.status(400).json({ message: error.message });
        }
        res.status(400).json({ message: 'Erro ao adicionar autor' });
    }
}

export const deletarAutor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteAutorService(String(id));
        res.status(200).json({ message: 'Autor deletado' });
    } catch (error) {
        if (error instanceof Error && error.message === 'Autor não encontrado') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: 'Erro ao deletar autor' });
    }
}