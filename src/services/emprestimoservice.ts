import { prisma } from "../../lib/prisma";
import { AppError } from "../errors/AppError";

export const getEmprestimosService = async () => {
    const emprestimos = await prisma.emprestimo.findMany()
    return emprestimos
}

export const createEmprestimoService = async (livroId: string, usuarioId: string, previstaDevolucao: Date) => {
    const livro = await prisma.livro.findUnique({ where: { id: livroId } })
    if (!livro) {
        throw new AppError('Livro não encontrado', 404)
    }
    const usuario = await prisma.user.findUnique({ where: { id: usuarioId } })
    if (!usuario) {
        throw new AppError('Usuário não encontrado', 404)
    }
    const emprestimo = await prisma.emprestimo.create({
        data: {
            livroId,
            userId: usuarioId,
            previstaDevolucao: previstaDevolucao
        }
    })
    return emprestimo
}

export const devolverEmprestimoService = async (emprestimoId: string) => {
    const emprestimo = await prisma.emprestimo.findUnique({ where: { id: emprestimoId } })
    if (!emprestimo) {
        throw new AppError('Empréstimo não encontrado', 404)
    }
    const emprestimoDevolvido = await prisma.emprestimo.update({
        where: { id: emprestimoId },
        data: { dataDevolucao: new Date().toISOString() }
    })
    return emprestimoDevolvido
}