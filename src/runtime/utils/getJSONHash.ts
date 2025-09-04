import { SHA256 } from 'crypto-js'


export const getJSONHash = (obj: object): string => {
	return SHA256(JSON.stringify(obj)).toString()
}