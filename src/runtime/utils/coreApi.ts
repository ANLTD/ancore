import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'


export const coreApi = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
): Promise<TData> => {
	return $fetch<TData>(request, {...opts})
}

export type TApi = <TData, TError>(request: NitroFetchRequest, opts: NitroFetchOptions<string>) => Promise<TData>