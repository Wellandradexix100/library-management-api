import { prisma } from "../../lib/prisma";
import { AppError } from "../errors/AppError";

export const getReservasService = async () => {
    return await prisma.reserva.findMany();
}

export const createReservaService = async (livroId: string, usuarioId: string, dataExpiracao: Date) => {
    const livro = await prisma.livro.findUnique({ where: { id: livroId } })
    if (!livro) {
        throw new AppError('Livro não encontrado', 404)
    }

    if (livro.quantidade <= 0) {
        throw new AppError('Livro indisponível para empréstimo ou reserva', 400);
    }

    const usuario = await prisma.user.findUnique({ where: { id: usuarioId } })
    if (!usuario) {
        throw new AppError('Usuário não encontrado', 404)
    }

    const [reserva] = await prisma.$transaction([
        prisma.reserva.create({
            data: {
                livroId,
                userId: usuarioId,
                dataExpiracao
            }
        }),
        prisma.livro.update({
            where: { id: livroId },
            data: { quantidade: { decrement: 1 } }
        })
    ]);

    return reserva;
}

export const cancelarReservaService = async (reservaId: string) => {
    const reserva = await prisma.reserva.findUnique({ where: { id: reservaId } })

    if (!reserva) {
        throw new AppError('Reserva não encontrada', 404)
    }

    await prisma.$transaction([
        prisma.reserva.delete({
            where: { id: reservaId }
        }),
        prisma.livro.update({
            where: { id: reserva.livroId },
            data: { quantidade: { increment: 1 } }
        })
    ]);

    return { message: 'Reserva cancelada com sucesso' };
}

export const efetivarReservaService = async (reservaId: string, previstaDevolucao: Date) => {
    const reserva = await prisma.reserva.findUnique({ where: { id: reservaId } })

    if (!reserva) {
        throw new AppError('Reserva não encontrada', 404)
    }

    const [emprestimo] = await prisma.$transaction([
        prisma.emprestimo.create({
            data: {
                livroId: reserva.livroId,
                userId: reserva.userId,
                previstaDevolucao
            }
        }),
        prisma.reserva.delete({
            where: { id: reservaId }
        })
    ]);

    return emprestimo;
}
