import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { upload } from '../lib/upload'

const router = Router()

router.post('/', upload.single('file'), async (req, res) => {
	try {
		const file = req.file
		const data = req.body
		if (!file) {
			return res.status(400).json({ error: 'Plano de aula obrigatório' })
		}

		const lessonPlan = await prisma.lessonPlan.create({
			data: {
				originalFileName: file.originalname,
				originalFileType: file.mimetype,
				originalFilePath: file.path,
				title: data.title,
				discipline: data.discipline,
				gradeLevel: data.gradeLevel,
				author: data.author,
				summary: data.summary,
				objectives: data.objectives,
				skills: data.skills,
				duration: data.duration,
				resources: data.resources,
				development: data.development,
				evaluation: data.evaluation,
			},
		})

		res.status(201).json(lessonPlan)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Erro ao criar plano de aula' })
	}
})

router.get('/', async (_req, res) => {
	const data = await prisma.lessonPlan.findMany({
		select: {
			id: true,
			title: true,
			discipline: true,
			gradeLevel: true,
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	res.json(data)
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	const lessonPlan = await prisma.lessonPlan.findUnique({
		where: { id },
	})

	if (!lessonPlan) {
		return res.status(404).json({ error: 'Plano de aula não encontrado' })
	}

	res.json(lessonPlan)
})

router.put('/:id', async (req, res) => {
	const { id } = req.params

	const updated = await prisma.lessonPlan.update({
		where: { id },
		data: {
			title: req.body.title,
			discipline: req.body.discipline || null,
			gradeLevel: req.body.gradeLevel || null,
			author: req.body.author || null,
			summary: req.body.summary || null,
			objectives: req.body.objectives || null,
			skills: req.body.skills || null,
			resources: req.body.resources || null,
			development: req.body.development || null,
			evaluation: req.body.evaluation || null,
		},
	})

	res.json(updated)
})

export default router
