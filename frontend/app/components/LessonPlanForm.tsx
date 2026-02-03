'use client'
import { Button, Form, Input } from 'antd'

export default function LessonPlanForm() {
	const [form] = Form.useForm()

	const onFinish = (values: any) => {
		console.log(values)
	}

	return (
		<Form form={form} layout="vertical" onFinish={onFinish}>
			<Form.Item
				label="Título"
				name="title"
				rules={[{ required: true, message: 'Título é obrigatório' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item label="Disciplina" name="discipline">
				<Input />
			</Form.Item>

			<Form.Item label="Série / Ano" name="gradeLevel">
				<Input />
			</Form.Item>

			<Form.Item label="Autor" name="author">
				<Input />
			</Form.Item>

			<Form.Item label="Resumo" name="summary">
				<Input.TextArea rows={2} />
			</Form.Item>

			<Form.Item label="Objetivos" name="objectives">
				<Input.TextArea rows={3} />
			</Form.Item>

			<Form.Item label="Habilidades Trabalhadas" name="skills">
				<Input.TextArea rows={3} />
			</Form.Item>

			<Form.Item
				label="Tempo (Tempo para realização da atividade)"
				name="duration"
			>
				<Input.TextArea rows={2} />
			</Form.Item>

			<Form.Item label="Recursos" name="resources">
				<Input.TextArea rows={2} />
			</Form.Item>

			<Form.Item label="Desenvolvimento" name="development">
				<Input.TextArea rows={4} />
			</Form.Item>

			<Form.Item label="Avaliação" name="evaluation">
				<Input.TextArea rows={3} />
			</Form.Item>

			<Button type="primary" htmlType="submit">
				Salvar plano de aula
			</Button>
		</Form>
	)
}
