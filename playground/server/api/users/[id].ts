export default defineEventHandler<Promise<{id?: number, name: string}>>(async (event) => {
	const id = getRouterParam(event, 'id')

	return {id: Number(id), name: 'Andrei'}
})