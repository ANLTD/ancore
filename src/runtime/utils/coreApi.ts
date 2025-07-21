import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { FetchError } from 'ofetch'


export const coreApi = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
): Promise<TData> => {
	try {
		return $fetch<TData>(
			request,
			{...opts}
		)
	} catch (error) {
		throw error as FetchError<TError>
	}
}

export type TApi = <TData, TError>(request: NitroFetchRequest, opts: NitroFetchOptions<string>) => Promise<TData>