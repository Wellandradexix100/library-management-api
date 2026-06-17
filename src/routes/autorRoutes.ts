import express from "express";
import { todosAutores, adicionarAutor, deletarAutor } from "../controllers/autorController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = express.Router()

router.get('/autor', todosAutores)
router.post('/autor', authMiddleware, adicionarAutor)
router.delete('/autor/:id', authMiddleware, deletarAutor)

export default router
