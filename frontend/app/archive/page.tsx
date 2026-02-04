'use client'

import { useEffect, useState } from 'react'
import { Card, Table, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const { Text } = Typography

type LessonPlanRow = {
	id: string
	title: string
	discipline?: string
	gradeLevel?: string
	createdAt: string
}

export default function ArchivePage() {
	const [data, setData] = useState<LessonPlanRow[]>([])
	const router = useRouter()

	useEffect(() => {
		fetch('http://localhost:3333/lesson-plans')
			.then((res) => res.json())
			.then(setData)
	}, [])

	const columns = [
		{
			title: 'Titulo',
			dataIndex: 'title',
			key: 'title',
			render: (text: string) => <Text ellipsis>{text}</Text>,
		},
		{
			title: 'Disciplina',
			dataIndex: 'discipline',
			key: 'discipline',
			render: (text: string) => <Text ellipsis>{text}</Text>,
		},
		{
			title: 'Série / Ano',
			dataIndex: 'gradeLevel',
			key: 'gradeLevel',
			render: (text: string) => <Text ellipsis>{text}</Text>,
		},
		{
			title: 'Criado em',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (text: string) => <Text ellipsis>{text}</Text>,
		},
		{
			title: 'Ações',
			key: 'actions',
			render: (_, record) => (
				<Link href={`/archive/${record.id}`}>Visualizar</Link>
			),
		},
	]

	return (
		<>
			<Card title="Planos de Aula" style={{ margin: 24, overflowX: 'auto' }}>
				<Table rowKey="id" columns={columns} dataSource={data} />
			</Card>
		</>
	)
}
