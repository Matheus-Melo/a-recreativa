'use client'

import { Card, Col, Row } from 'antd'
import FileUploadPreview from './components/FileUploadPreview'
import LessonPlanForm from './components/LessonPlanForm'
import { useState } from 'react'

export default function Home() {
	const [file, setFile] = useState<File | null>(null)

	return (
		<Row
			gutter={16}
			style={{
				padding: 24,
				height: '100%',
				boxSizing: 'border-box',
			}}
		>
			<Col span={12} style={{ height: '100%' }}>
				<Card
					title="Documento Original"
					style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
					styles={{
						body: {
							flex: 1,
							overflow: 'scroll',
						},
					}}
				>
					<FileUploadPreview onFileSelect={setFile} />
				</Card>
			</Col>

			<Col span={12} style={{ height: '100%' }}>
				<Card
					title="Plano de Aula"
					style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
					styles={{
						body: {
							flex: 1,
							overflow: 'scroll',
						},
					}}
				>
					<LessonPlanForm file={file} />
				</Card>
			</Col>
		</Row>
	)
}
