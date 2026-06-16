import { prisma } from "../../lib/prisma";

export const getEmprestimosService = async () => {
    const emprestimos = await prisma.emprestimo.findMany()
    return emprestimos
}

export const createEmprestimoService = async (livroId: string, usuarioId: string) => {
    const livro = await prisma.livro.findUnique({ where: { id: livroId } })
    if (!livro) {
        throw new Error('Livro não encontrado')
    }
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } })
    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }
    const emprestimo = await prisma.emprestimo.create({
        data: {
            livroId,
            usuarioId
        }
    })
    return emprestimo
}