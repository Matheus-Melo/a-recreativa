export default async function TestApiPage() {
	const res = await fetch(`${process.env.API_URL}/lesson-plans`, {
		cache: 'no-store',
	})

	if (!res.ok) {
		throw new Error('Erro ao buscar planos de aula')
	}

	const data = await res.json()

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Teste de conexão com API</h1>

			<pre className="bg-gray-100 p-4 rounded text-sm text-black">
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	)
}
