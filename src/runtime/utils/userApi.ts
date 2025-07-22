import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { useRuntimeConfig } from '#app'
import { coreApi } from './index'
import type { ModuleOptions } from '~/src/module'


export const userApi = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
) => {
	const runtimeConfig = useRuntimeConfig().public.ancore as ModuleOptions

	if (runtimeConfig.api) {
		return runtimeConfig.api<TData, TError>(request, opts)
	} else {
		return coreApi<TData, TError>(request, opts)
	}
}