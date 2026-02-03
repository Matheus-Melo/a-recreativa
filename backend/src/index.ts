import express from 'express'
import cors from 'cors'
import lessonPlanRoutes from './routes/lessonPlan'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_, res) => {
	res.json({ ok: true })
})

app.use('/lesson-plans', lessonPlanRoutes)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
	console.log(`🚀 API rodando na porta ${PORT}`)
})
