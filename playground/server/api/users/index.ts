export default defineEventHandler(async (event): Promise<any> => {
	const params = getQuery(event)

	const items = []

	for (let i = 0; i < 60; i++) {
		items.push({id: i + 1, name: 'Andrei', info: params.info})
	}

	const start = params.skip ? Number(params.skip) : 0
	const end = params.limit ? Number(params.limit) + start : 10

	const result = items.slice(start, end)

	return {
		items: result,
		count: items.length
	}
})