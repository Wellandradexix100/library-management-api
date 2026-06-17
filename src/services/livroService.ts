import { prisma } from "../../lib/prisma";
import { AppError } from "../errors/AppError";

export const getLivrosService = async () => {
    return await prisma.livro.findMany();
}

export const createLivroService = async (titulo: string, autorId: string, anoPublicacao: any, quantidade: number = 1) => {
    if (!titulo || !autorId) {
        throw new AppError("Livro inválido", 400);
    }

    const livro = await prisma.livro.create({
        data: {
            titulo,
            autorId,
            anoPublicacao,
            capaUrl: "",
            sinopse: "",
            genero: "",
            editora: "",
            numeroEdicao: "",
            quantidade
        }
    });

    return livro;
}

export const deleteLivroService = async (id: string) => {
    const livro = await prisma.livro.findUnique({ where: { id } });
    
    if (!livro) {
        throw new AppError("Livro não encontrado", 404);
    }

    await prisma.livro.delete({ where: { id } });
    return true;
}
