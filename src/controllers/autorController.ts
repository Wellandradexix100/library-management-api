import { Request, Response } from "express";
import { getAutoresService, createAutorService, deleteAutorService } from "../services/autorService";

export const todosAutores = async (req: Request, res: Response) => {
    const autores = await getAutoresService();
    res.status(200).json(autores);
}

export const adicionarAutor = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const autor = await createAutorService(nome);
    res.status(201).json(autor);
}

export const deletarAutor = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteAutorService(String(id));
    res.status(200).json({ message: 'Autor deletado' });
}