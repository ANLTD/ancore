import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { coreApi } from './index'
// @ts-ignore
import { api as customApi } from '#ancore/customApi'


export const userApi = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
) => {
	if (customApi) {
		return customApi<TData, TError>(request, opts)
	} else {
		return coreApi<TData, TError>(request, opts)
	}
}