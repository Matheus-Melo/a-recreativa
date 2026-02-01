import { Router } from 'express'
import { prisma } from '../lib/prisma'

export const lessonPlansRouter = Router()

lessonPlansRouter.post('/', async (_req, res) => {
	const lessonPlan = await prisma.lessonPlan.create({
		data: {
			title: 'Plano de Aula Teste',
			originalFileName: 'exemplo.pdf',
			originalFileType: 'pdf',
			originalFilePath: '/uploads/exemplo.pdf',
		},
	})

	res.json(lessonPlan)
})

lessonPlansRouter.get('/', async (_req, res) => {
	const data = await prisma.lessonPlan.findMany()
	res.json(data)
})
