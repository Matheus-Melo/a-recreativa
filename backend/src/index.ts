import express from 'express'
import cors from 'cors'
import { lessonPlansRouter } from './routes/lessonPlan'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => {
	res.json({ ok: true })
})

app.use('/lesson-plans', lessonPlansRouter)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
	console.log(`🚀 API rodando na porta ${PORT}`)
})
