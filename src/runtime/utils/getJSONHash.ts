import { sha256 } from 'js-sha256'


export const getJSONHash = (obj: object): string => {
	const json = JSON.stringify(obj)
	return sha256(json)
}