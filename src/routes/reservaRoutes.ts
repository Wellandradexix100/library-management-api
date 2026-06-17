import express from 'express';
import { todosReservas, createReserva, cancelarReserva, efetivarReserva } from '../controllers/reservaController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { isAdminMiddleware } from '../middlewares/IsAdminMiddleware';

const router = express.Router();

router.get('/reservas', authMiddleware, todosReservas);
router.post('/reservas', authMiddleware, createReserva);
router.delete('/reservas/:id/cancelar', authMiddleware, isAdminMiddleware, cancelarReserva);
router.post('/reservas/:id/efetivar', authMiddleware, isAdminMiddleware, efetivarReserva);

export default router;
