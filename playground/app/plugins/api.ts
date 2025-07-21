import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { coreApi } from '#ancore/utils'


export default defineNuxtPlugin( ()  => {
	const api = <TData = unknown, TError = unknown>(
		request: NitroFetchRequest,
		opts: NitroFetchOptions<string>
	) => {
		return coreApi<TData, TError>(request, opts)
	}


	return {
		provide: {
			api
		}
	}
})