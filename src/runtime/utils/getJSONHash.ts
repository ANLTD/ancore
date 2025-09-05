import { sha256 } from '@noble/hashes/sha2'
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils'


export const getJSONHash = (obj: object): string => {
	const s = JSON.stringify(obj)
	const bytes = utf8ToBytes(s)
	const digest = sha256(bytes)
	return bytesToHex(digest)
}