'use client'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'

type Props = {
	initialValues: any
	lessonId: string
	onChange?: (values: any) => void
}

export default function LessonPlanForm({
	initialValues,
	lessonId,
	onChange,
}: Props) {
	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue(initialValues)
	}, [form, initialValues])

	const onFinish = async (values: any) => {
		await fetch(`http://localhost:3333/lesson-plans/${lessonId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onValuesChange={(_, allValues) => {
				onChange?.(allValues)
			}}
			onFinish={onFinish}
		>
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
				<Input.TextArea />
			</Form.Item>

			<Form.Item label="Objetivos" name="objectives">
				<Input.TextArea />
			</Form.Item>

			<Form.Item label="Habilidades Trabalhadas" name="skills">
				<Input.TextArea />
			</Form.Item>

			<Form.Item
				label="Tempo (Tempo para realização da atividade)"
				name="duration"
			>
				<Input.TextArea />
			</Form.Item>

			<Form.Item label="Recursos" name="resources">
				<Input.TextArea />
			</Form.Item>

			<Form.Item label="Desenvolvimento" name="development">
				<Input.TextArea />
			</Form.Item>

			<Form.Item label="Avaliação" name="evaluation">
				<Input.TextArea />
			</Form.Item>

			<Button type="primary" htmlType="submit">
				Salvar plano de aula
			</Button>
		</Form>
	)
}
