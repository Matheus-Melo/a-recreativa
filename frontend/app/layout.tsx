import type { Metadata } from 'next'
import './globals.css'
import 'antd/dist/reset.css'
import AppLayout from './AppLayout'

export const metadata: Metadata = {
	title: 'A Recreativa',
	description: 'Teste técnico',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body className="antialiased">
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	)
}
