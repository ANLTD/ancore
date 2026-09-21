import type { TApi } from '#ancore/types'
import { coreApi } from './index'
import { api as customApi } from '#ancore/customApi'


export const userApi: TApi = (request, opts) => {
	if (customApi) {
		return customApi(request, opts) as never
	} else {
		return coreApi(request, opts) as never
	}
}