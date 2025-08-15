export const toQuery = <T extends object>(params: T): string => {
	return Object.entries(params)
		.filter(([, value]) => value != null)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&')
}