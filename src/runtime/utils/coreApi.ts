import type { TApi } from '#ancore/types'


export const coreApi: TApi = (request, opts) => {
	return $fetch(request, {...opts} as never) as never
}