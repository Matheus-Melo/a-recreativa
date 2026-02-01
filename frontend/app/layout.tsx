import type { Metadata } from 'next'
import './globals.css'
import 'antd/dist/reset.css'

export const metadata: Metadata = {
	title: 'A Recreativa',
	description: 'Teste técnico',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`antialiased`}>{children}</body>
		</html>
	)
}
