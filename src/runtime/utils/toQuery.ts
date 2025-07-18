// TYPES
type TValue = string | number | boolean | undefined | null
export type TQueryObject = Record<string, TValue | TValue[]>


export const toQuery = (params: TQueryObject): string => {
	return Object.entries(params)
		.filter(([, value]) => value != null)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&')
}