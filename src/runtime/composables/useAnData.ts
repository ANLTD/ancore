import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { computed, ref, type Ref, type ComputedRef  } from 'vue'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'
import { useAsyncData } from '#app'
import { userApi } from '../utils'


// TYPES
interface TConfig {
	request: NitroFetchRequest
	apiConfig?: NitroFetchOptions<string>
}
interface TUseAnData<TData, TError> {
	init: () => Promise<void>,
	set: (data: TData) => void,
	loading: ComputedRef<boolean>,
	request: Ref<NitroFetchRequest>
	data: ComputedRef
	error: ComputedRef<TError>
	status: ReturnType<typeof useAsyncData>['status']
}


export const useAnData = <TData = unknown, TError = unknown>(
	config: TConfig
): TUseAnData<TData, TError> => {
	// DATA
	const request = ref<NitroFetchRequest>(config.request)


	// METHODS
	const set = (value: TData) => {
		data.value = value as PickFrom<TData, KeysOf<TData>> | undefined
	}


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
	} = useAsyncData<TData, TError, TData>(
		key,
		() => userApi(request.value, { method: 'GET', ...(config.apiConfig || {}) }),
		{ immediate: false }
	)


	return {
		init: execute,
		set,

		loading,
		request,
		data: data as ComputedRef<TData>,
		error: error as ComputedRef<TError>,
		status,
	}
}