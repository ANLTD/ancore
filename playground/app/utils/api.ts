import type { TApi } from '#ancore/types'


export const api: TApi = (request, opts) => {
	return coreApi(request, opts) as never
}