import { prisma } from "../../lib/prisma";

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
        throw new Error("Nome do autor inválido");
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
        throw new Error("Autor não encontrado");
    }

    await prisma.autor.delete({ where: { id } });
    return true;
}
