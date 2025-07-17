import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { useNuxtApp } from '#app'
import { api as coreApi } from '../runtime/utils'


export const userApi = <TData = unknown, TError = unknown>(
	request: NitroFetchRequest,
	opts: NitroFetchOptions<string>
) => {
	const { $api } = useNuxtApp()

	if ($api) {
		return $api<TData, TError>(request, opts)
	} else {
		return coreApi<TData, TError>(request, opts)
	}
}