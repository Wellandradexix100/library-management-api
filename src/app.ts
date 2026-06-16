import 'dotenv/config'
import livroRoutes from './routes/livroRoutes'
import autorRoutes from './routes/autorRoutes'
import emprestimoRoutes from './routes/emprestimoRoutes'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Estamos a todo vapor 🚅')
})

app.use('/api', livroRoutes)
app.use('/api', autorRoutes)
app.use('/api', emprestimoRoutes)

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})