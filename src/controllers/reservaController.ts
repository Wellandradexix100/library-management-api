import { Request, Response } from "express";
import { getReservasService, createReservaService, cancelarReservaService, efetivarReservaService } from "../services/reservaService";

export const todosReservas = async (req: Request, res: Response) => {
    const reservas = await getReservasService();
    res.status(200).json(reservas);
}

export const createReserva = async (req: Request, res: Response) => {
    const { livroId, usuarioId, dataExpiracao } = req.body;
    const reserva = await createReservaService(livroId, usuarioId, new Date(dataExpiracao));
    res.status(201).json(reserva);
}

export const cancelarReserva = async (req: Request, res: Response) => {
    const reservaId = req.params.id as string;
    const response = await cancelarReservaService(reservaId);
    res.status(200).json(response);
}

export const efetivarReserva = async (req: Request, res: Response) => {
    const reservaId = req.params.id as string;
    const { previstaDevolucao } = req.body;
    const emprestimo = await efetivarReservaService(reservaId, new Date(previstaDevolucao));
    res.status(201).json(emprestimo);
}
