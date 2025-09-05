import { sha256 } from 'js-sha256'

export const getJSONHash = (obj: object): string => {
	return sha256(JSON.stringify(obj))
}