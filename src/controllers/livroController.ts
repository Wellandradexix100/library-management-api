import { Request, Response } from "express";
import { getLivrosService, createLivroService, deleteLivroService } from "../services/livroService";

export const todosLivros = async (req: Request, res: Response) => {
    try {
        const livros = await getLivrosService();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

export const adicionarLivro = async (req: Request, res: Response) => {
    const { titulo, autorId, anoPublicacao } = req.body;
    try {
        const livro = await createLivroService(titulo, autorId, anoPublicacao);
        res.status(201).json(livro);
    } catch (error) {
        if (error instanceof Error && error.message === "Livro inválido") {
            return res.status(400).json({ message: error.message });
        }
        res.status(400).json({ message: 'Erro ao adicionar livro' });
    }
}

export const deletarLivro = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteLivroService(String(id));
        res.status(200).json({ message: 'Livro deletado' });
    } catch (error) {
        if (error instanceof Error && error.message === 'Livro não encontrado') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: 'Erro ao deletar livro' });
    }
}
