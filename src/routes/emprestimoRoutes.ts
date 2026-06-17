import express from "express";
import { todosEmprestimos, createEmprestimo, devolverEmprestimo } from "../controllers/emprestimocontroller";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = express.Router()

router.get('/emprestimo', authMiddleware, todosEmprestimos)
router.post('/emprestimo', authMiddleware, createEmprestimo)
router.put('/emprestimo/:id', authMiddleware, devolverEmprestimo)
export default router