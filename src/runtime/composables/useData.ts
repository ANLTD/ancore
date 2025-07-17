import type { NitroFetchRequest } from 'nitropack'
import { computed, ref, type Ref, type ComputedRef  } from 'vue'
import { useAsyncData } from '#app'
import { userApi } from '../../utils'


// TYPES
interface TConfig {
	request: NitroFetchRequest
}
interface TUseData<TData, TError> {
	init: () => Promise<void>,
	loading: ComputedRef<boolean>,
	request: Ref<NitroFetchRequest>
	data: Ref<TData>
	error: Ref<TError>
	status: ReturnType<typeof useAsyncData>['status']
}


export const useData = <TData = unknown, TError = unknown>(
	config: TConfig
): TUseData<TData, TError> => {
	// DATA
	const request = ref<NitroFetchRequest>(config.request)


	// COMPUTED
	const loading = computed((): boolean => {
		return status.value === 'pending'
	})
	const key = computed((): string => {
		return request.value.toString()
	})


	// INIT
	const {
		data,
		error,
		execute,
		status
	} = useAsyncData<TData, TError>(
		key,
		() => userApi(request.value, { method: 'GET' }),
		{ immediate: false }
	)

	return {
		init: execute,

		loading,
		request,
		data: data as Ref<TData>,
		error: error as Ref<TError>,
		status
	}
}