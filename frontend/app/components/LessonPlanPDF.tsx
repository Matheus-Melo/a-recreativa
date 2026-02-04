import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

type LessonPlan = {
	title: string
	discipline?: string
	gradeLevel?: string
	author?: string
	summary?: string
	objectives?: string
	skills?: string
	duration?: string
	resources?: string
	development?: string
	evaluation?: string
}

const styles = StyleSheet.create({
	page: {
		padding: 32,
		fontSize: 12,
		fontFamily: 'Helvetica',
		lineHeight: 1.5,
	},

	title: {
		fontSize: 20,
		marginBottom: 8,
		fontWeight: 'bold',
	},

	meta: {
		fontSize: 10,
		color: '#555',
		marginBottom: 12,
	},

	section: {
		marginTop: 12,
	},

	sectionTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4,
	},

	sectionContent: {
		fontSize: 12,
	},
})

function Section({ title, content }: { title: string; content?: string }) {
	if (!content) return null

	return (
		<Text style={styles.section}>
			<Text style={styles.sectionTitle}>
				{title}
				{'\n'}
			</Text>
			<Text style={styles.sectionContent}>{content}</Text>
		</Text>
	)
}

export function LessonPlanPDF({ data }: { data: LessonPlan }) {
	return (
		<Document>
			<Page style={styles.page}>
				{(data.discipline || data.gradeLevel || data.author) && (
					<Text style={styles.meta}>
						{data.discipline && `${data.discipline} `}
						{data.gradeLevel && `• ${data.gradeLevel} `}
						{data.author && `• ${data.author}`}
					</Text>
				)}

				<Text style={styles.title}>{data.title}</Text>

				<Section title="Resumo" content={data.summary} />

				<Section title="Objetivos" content={data.objectives} />

				<Section title="Habilidades Trabalhadas" content={data.skills} />

				<Section
					title="Tempo e Recursos"
					content={
						data.duration &&
						'Tempo para realização da atividade: ' +
							data.duration +
							'\n\n' +
							data.resources
					}
				/>

				<Section title="Desenvolvimento" content={data.development} />

				<Section title="Avaliação" content={data.evaluation} />
			</Page>
		</Document>
	)
}
