import { Request, Response } from "express";
import { getLivrosService, createLivroService, deleteLivroService } from "../services/livroService";

export const todosLivros = async (req: Request, res: Response) => {
    const livros = await getLivrosService();
    res.status(200).json(livros);
}

export const adicionarLivro = async (req: Request, res: Response) => {
    const { titulo, autorId, anoPublicacao, quantidade } = req.body;
    const livro = await createLivroService(titulo, autorId, anoPublicacao, quantidade);
    res.status(201).json(livro);
}

export const deletarLivro = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteLivroService(String(id));
    res.status(200).json({ message: 'Livro deletado' });
}
