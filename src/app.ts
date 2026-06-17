import 'dotenv/config'
import livroRoutes from './routes/livroRoutes'
import autorRoutes from './routes/autorRoutes'
import emprestimoRoutes from './routes/emprestimoRoutes'
import authRoutes from './routes/authRoutes'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Estamos a todo vapor 🚅')
})

import { ErrorHandler } from './middlewares/ErrorHandler'

app.use('/api', livroRoutes)
app.use('/api', autorRoutes)
app.use('/api', emprestimoRoutes)
app.use('/api', authRoutes)

app.use(ErrorHandler)

export default app;