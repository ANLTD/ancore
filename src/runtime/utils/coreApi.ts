import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'


export function coreApi<TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
): Promise<TData> {
	return $fetch<TData>(request, {...opts})
}