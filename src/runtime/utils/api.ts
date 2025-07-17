import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { FetchError } from 'ofetch'


export default async <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
) => {
	try {
		return await $fetch<TData>(
			request,
			{...opts}
		)
	} catch (error) {
		throw error as FetchError<TError>
	}
}