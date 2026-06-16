import express from "express";
import { todosAutores, adicionarAutor, deletarAutor } from "../controllers/autorController";

const router = express.Router()

router.get('/autor', todosAutores)
router.post('/autor', adicionarAutor)
router.delete('/autor/:id', deletarAutor)

export default router
