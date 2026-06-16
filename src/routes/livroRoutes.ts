import { todosLivros, adicionarLivro, deletarLivro } from "../controllers/livroController"
import { Router } from "express"

const router = Router()

router.get('/livros', todosLivros)
router.post('/livros', adicionarLivro)
router.delete('/livros/:id', deletarLivro)

export default router