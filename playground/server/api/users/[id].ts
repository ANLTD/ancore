export default defineEventHandler(async (event): Promise<any> => {
	const { id } = event.context.params as Record<string, string>
	return {id, name: 'Andrei'}
})