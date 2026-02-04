'use client'

import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const { Header, Content } = Layout

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	return (
		<Layout style={{ height: '100vh' }}>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
					background: '#fff',
					borderBottom: '1px solid #f0f0f0',
				}}
			>
				<Menu
					mode="horizontal"
					selectedKeys={[pathname]}
					items={[
						{
							key: '/',
							label: <Link href="/">Novo plano</Link>,
						},
						{
							key: '/archive',
							label: <Link href="/archive">Arquivo</Link>,
						},
					]}
				/>
			</Header>

			<Content style={{ padding: 24, overflow: 'scroll' }}>{children}</Content>
		</Layout>
	)
}
