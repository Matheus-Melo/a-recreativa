import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { upload } from '../lib/upload'
import path from 'path'
import fs from 'fs'
import { z } from 'zod'

const router = Router()

const nullableString = z
	.string()
	.optional()
	.transform((v) => v ?? null) // because prisma rejects undefined fields

export const lessonPlanSchema = z.object({
	title: z.string().min(1, 'Título é obrigatório'),
	discipline: nullableString,
	gradeLevel: nullableString,
	author: nullableString,
	summary: nullableString,
	objectives: nullableString,
	skills: nullableString,
	duration: nullableString,
	resources: nullableString,
	development: nullableString,
	evaluation: nullableString,
})

router.post('/', upload.single('file'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'Plano de aula obrigatório' })
		}

		const parsed = lessonPlanSchema.safeParse(req.body)

		if (!parsed.success) {
			return res.status(400).json({
				error: 'Dados inválidos',
				details: z.treeifyError(parsed.error),
			})
		}

		const data = parsed.data
		const file = req.file

		const lessonPlan = await prisma.lessonPlan.create({
			data: {
				originalFileName: file.originalname,
				originalFileType: file.mimetype,
				originalFilePath: file.path,
				...data,
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

router.get('/:id/original', async (req, res) => {
	const { id } = req.params

	const lessonPlan = await prisma.lessonPlan.findUnique({
		where: { id },
	})

	if (!lessonPlan) {
		return res.status(404).json({ error: 'Plano de aula não encontrado' })
	}

	const filePath = path.resolve(lessonPlan.originalFilePath)

	if (!fs.existsSync(filePath)) {
		return res.status(404).json({ error: 'Arquivo original não encontrado' })
	}

	res.download(filePath, lessonPlan.originalFileName)
})

router.put('/:id', async (req, res) => {
	const parsed = lessonPlanSchema.safeParse(req.body)

	if (!parsed.success) {
		return res.status(400).json({
			error: 'Dados inválidos',
			details: z.treeifyError(parsed.error),
		})
	}

	const updated = await prisma.lessonPlan.update({
		where: { id: req.params.id },
		data: parsed.data,
	})

	res.json(updated)
})

export default router
