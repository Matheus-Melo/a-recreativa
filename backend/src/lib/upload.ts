import multer from 'multer'
import path from 'path'
import { randomUUID } from 'crypto'
import fs from 'fs'

const uploadDir = path.resolve('uploads/lesson-plans')

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
	destination: (_req, _file, callback) => {
		callback(null, path.resolve('uploads/lesson-plans'))
	},
	filename: (_req, file, callback) => {
		const ext = path.extname(file.originalname)
		callback(null, `${randomUUID()}${ext}`)
	},
})

export const upload = multer({
	storage,
	fileFilter: (_req, file, callback) => {
		const allowed = [
			'application/pdf',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		]

		if (allowed.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Tipo de arquivo inválido'))
		}
	},
})
