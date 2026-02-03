export default defineEventHandler(async (event): Promise<any> => {
	const id = getRouterParam(event, 'id')
	return {id, name: 'Andrei'}
})