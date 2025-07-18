export default defineEventHandler(async (event): Promise<any> => {
	const params = getQuery(event)

	return {
		count: 2,
		items: [
			{id: 1, name: 'Andrey', info: params.info},
			{id: 2, name: 'An', info: params.info},
		]
	}
})