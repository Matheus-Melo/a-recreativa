import { Card, Col, Row } from 'antd'
import FileUploadPreview from './components/FileUploadPreview'
import LessonPlanForm from './components/LessonPlanForm'

export default function Home() {
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
					<FileUploadPreview />
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
					<LessonPlanForm />
				</Card>
			</Col>
		</Row>
	)
}
