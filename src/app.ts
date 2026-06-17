import livroRoutes from './routes/livroRoutes'
import autorRoutes from './routes/autorRoutes'
import emprestimoRoutes from './routes/emprestimoRoutes'
import authRoutes from './routes/authRoutes'
import reservaRoutes from './routes/reservaRoutes'
import express from 'express'

const app = express()


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Estamos a todo vapor 🚅')
})

import { ErrorHandler } from './middlewares/ErrorHandler'

app.use('/api', livroRoutes)
app.use('/api', autorRoutes)
app.use('/api', emprestimoRoutes)
app.use('/api', authRoutes)
app.use('/api', reservaRoutes)

app.use(ErrorHandler)

export default app;