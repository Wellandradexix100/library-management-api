import express from "express";
import { todosEmprestimos, createEmprestimo } from "../controllers/emprestimocontroller";

const router = express.Router()

router.get('/emprestimo', todosEmprestimos)
router.post('/emprestimo', createEmprestimo)

export default router