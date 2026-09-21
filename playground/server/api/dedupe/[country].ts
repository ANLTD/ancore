let calls = 0

export default defineEventHandler<Promise<{ call: number, country: string }>>(async (event) => {
	calls++

	const call = calls
	const country = getRouterParam(event, 'country') || ''

	await new Promise(resolve => setTimeout(resolve, 400))

	return { call, country }
})