'use client'

import { Upload, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'
import mammoth from 'mammoth'
import DOMPurify from 'dompurify'

const { Dragger } = Upload
const { Text } = Typography

type Props = {
	onFileSelect: (file: File) => void
}

export default function FileUploadPreview({ onFileSelect }: Props) {
	const [fileUrl, setFileUrl] = useState<string | null>(null)
	const [fileType, setFileType] = useState<string | null>(null)
	const [docxPreview, setDocxPreview] = useState<string | null>(null)

	const handleBeforeUpload = async (file: File) => {
		onFileSelect(file)
		setFileType(file.type)

		if (file.type === 'application/pdf') {
			const url = URL.createObjectURL(file)
			setFileUrl(url)
			setDocxPreview(null)
		}

		if (
			file.type ===
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		) {
			const arrayBuffer = await file.arrayBuffer()
			const result = await mammoth.convertToHtml({ arrayBuffer })
			// ! important to sanitize before we set innerHTML to keep the app safe from malicious documents
			const cleanHtml = DOMPurify.sanitize(result.value)

			setDocxPreview(cleanHtml)
			setFileUrl(null)
		}

		return false
	}

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Dragger
				multiple={false}
				accept=".pdf,.docx"
				showUploadList={false}
				beforeUpload={handleBeforeUpload}
			>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Clique ou arraste um PDF ou DOCX</p>
			</Dragger>

			{/* PDF Preview */}
			{fileUrl && (
				<div
					style={{
						marginTop: 16,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{fileType === 'application/pdf' ? (
						<iframe src={fileUrl} style={{ width: '100%', flex: 1 }} />
					) : (
						<Text type="secondary">
							Preview disponível apenas para arquivos PDF.
						</Text>
					)}
				</div>
			)}

			{/* DOCX Preview */}
			{docxPreview && (
				<div
					style={{
						marginTop: 16,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					}}
					dangerouslySetInnerHTML={{ __html: docxPreview }}
				></div>
			)}
		</div>
	)
}
