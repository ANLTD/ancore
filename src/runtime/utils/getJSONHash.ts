export const getJSONHash = async (obj: object): Promise<string> => {
	const str = JSON.stringify(obj)
	const bytes = new TextEncoder().encode(str)
	const digest = await crypto.subtle.digest('SHA-256', bytes)
	return Array.from(new Uint8Array(digest))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}