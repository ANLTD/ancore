import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'


export const api = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
) => {
	return coreApi<TData, TError>(request, opts)
}