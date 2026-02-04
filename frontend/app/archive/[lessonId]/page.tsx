'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Row, Col, Card, Spin, Result, Button } from 'antd'
import LessonPlanForm from './LessonPlanForm'
import Link from 'next/link'
import { pdf, PDFViewer } from '@react-pdf/renderer'
import { LessonPlanPDF } from '@/app/components/LessonPlanPDF'

type LessonPlan = {
	id: string
	title: string
	discipline?: string
	gradeLevel?: string
	author?: string
	summary?: string
	objectives?: string
	skills?: string
	resources?: string
	development?: string
	evaluation?: string
}

export default function LessonPlanEditPage() {
	const { lessonId } = useParams()
	const [lesson, setLesson] = useState<LessonPlan | null>(null)
	const [previewData, setPreviewData] = useState<LessonPlan | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch(`http://localhost:3333/lesson-plans/${lessonId}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError(data.error)
					setLoading(false)
					return
				}
				setLesson(data)
				setPreviewData(data)
				setLoading(false)
			})
	}, [lessonId])

	if (loading) {
		return <Spin />
	}

	if (error || !previewData || !lesson) {
		return (
			<Card>
				<Result
					status="404"
					title="Plano de aula não encontrado"
					subTitle="O plano de aula solicitado não existe ou foi removido."
					extra={
						<Link href="/archive">
							<Button type="primary">Voltar para Planos de Aula</Button>
						</Link>
					}
				/>
			</Card>
		)
	}

	return (
		<Row gutter={16} style={{ padding: 24 }}>
			<Col span={12}>
				<Card title="Editar plano de aula">
					<LessonPlanForm
						initialValues={lesson}
						lessonId={lesson!.id}
						onChange={(values) => setPreviewData({ ...lesson, ...values })}
					/>
				</Card>
			</Col>

			<Col span={12}>
				<Card
					title="Visualizar plano de aula"
					style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
					styles={{
						body: {
							display: 'flex',
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 16,
						},
					}}
				>
					<PDFViewer width="100%" height="100%">
						<LessonPlanPDF data={previewData} />
					</PDFViewer>

					<Button
						type="primary"
						onClick={async () => {
							const blob = await pdf(
								<LessonPlanPDF data={previewData} />,
							).toBlob()

							const url = URL.createObjectURL(blob)
							window.open(url)
						}}
					>
						Baixar PDF
					</Button>
				</Card>
			</Col>
		</Row>
	)
}
