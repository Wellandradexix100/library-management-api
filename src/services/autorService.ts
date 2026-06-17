import { prisma } from "../../lib/prisma";
import { AppError } from "../errors/AppError";

export const getAutoresService = async () => {
    return await prisma.autor.findMany({
        select: {
            nome: true,
            id: true,
            livros: {
                select: {
                    titulo: true,
                    anoPublicacao: true
                }
            }
        }
    });
}

export const createAutorService = async (nome: string) => {
    if (!nome) {
        throw new AppError("Nome do autor inválido", 400);
    }

    const autor = await prisma.autor.create({
        data: {
            nome
        }
    });

    return autor;
}

export const deleteAutorService = async (id: string) => {
    const autor = await prisma.autor.findUnique({ where: { id } });
    
    if (!autor) {
        throw new AppError("Autor não encontrado", 404);
    }

    await prisma.autor.delete({ where: { id } });
    return true;
}
