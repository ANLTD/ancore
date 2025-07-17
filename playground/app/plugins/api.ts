import { api as coreApi } from '@anweb/nuxt-ancore'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'


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