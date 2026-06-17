import { todosLivros, adicionarLivro, deletarLivro } from "../controllers/livroController"
import { Router } from "express"
import { authMiddleware } from "../middlewares/AuthMiddleware"

const router = Router()

router.get('/livros', authMiddleware, todosLivros)
router.post('/livros', authMiddleware, adicionarLivro)
router.delete('/livros/:id', authMiddleware, deletarLivro)

export default router