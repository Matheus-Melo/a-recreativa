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
	const data = await prisma.lessonPlan.findMany()
	res.json(data)
})

export default router
