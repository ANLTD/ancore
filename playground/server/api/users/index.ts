export default defineEventHandler(async (event): Promise<any> => {
	const params = getQuery(event)

	const items = []

	for (let i = 0; i < 200; i++) {
		items.push({id: i + 1, name: 'Andrey', info: params.info})
	}

	const start = params.skip ? Number(params.skip) : 0
	const end = params.limit ? Number(params.limit) + start : 10

	const result = items.slice(start, end)

	return {
		items: result,
		count: items.length
	}
})