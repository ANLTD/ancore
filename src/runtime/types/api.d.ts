import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'


export type TApi = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
) => Promise<TData>