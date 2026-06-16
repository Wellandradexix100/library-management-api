import { prisma } from "../../lib/prisma";

export const getLivrosService = async () => {
    return await prisma.livro.findMany();
}

export const createLivroService = async (titulo: string, autorId: string, anoPublicacao: any) => {
    if (!titulo || !autorId) {
        throw new Error("Livro inválido");
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
            quantidade: 1
        }
    });

    return livro;
}

export const deleteLivroService = async (id: string) => {
    const livro = await prisma.livro.findUnique({ where: { id } });
    
    if (!livro) {
        throw new Error("Livro não encontrado");
    }

    await prisma.livro.delete({ where: { id } });
    return true;
}
