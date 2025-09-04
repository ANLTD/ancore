import SHA256 from 'crypto-js/sha256'


export const getJSONHash = (obj: object): string => {
	return SHA256(JSON.stringify(obj)).toString()
}