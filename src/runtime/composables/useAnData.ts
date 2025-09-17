import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { computed, ref, type Ref, type ComputedRef, watch } from 'vue'
import { type AsyncDataRequestStatus, useAsyncData } from '#app'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'
import { toQuery, userApi } from '../utils'


// TYPES
interface TConfig {
	request: NitroFetchRequest
	apiConfig?: NitroFetchOptions<string>
	params?: Record<string, unknown>
}
interface TUseAnData<TData, TError> {
	init: () => Promise<void>,
	set: (data: TData) => void,
	config: Ref<TConfig>,
	data: ComputedRef<TData | undefined>
	status: ComputedRef<AsyncDataRequestStatus>
	loading: ComputedRef<boolean>,
	error: ComputedRef<TError | undefined>
}


export const useAnData = <TData = unknown, TError = unknown>(
	initConfig: TConfig
): TUseAnData<TData, TError> => {
	// DATA
	const config = ref<TConfig>({...initConfig})
	const data = ref<TData | undefined>(undefined)
	const error = ref<TError | undefined>(undefined)
	const status = ref<AsyncDataRequestStatus>('idle')


	// METHODS
	const init = async () => {
		const Data = useAsyncData<TData, TError, TData>(
			key,
			() => userApi(
				key.value,
				{ method: 'GET', ...(config.value.apiConfig || {}) },
			), {immediate: false}
		)

		await Data.execute()

		watch(Data.data, () => data.value = Data.data.value, {immediate: true})
		watch(Data.error, () => error.value = Data.error.value, {immediate: true})
		watch(Data.status, () => error.value = Data.status.value, {immediate: true})
	}
	const set = (value: TData) => {
		data.value = value as PickFrom<TData, KeysOf<TData>> | undefined
	}


	// COMPUTED
	const key = computed((): string => {
		let url = config.value.request.toString()
		for (const key in config.value.params) {
			url = url.replace(`:${key}`, encodeURIComponent(String(config.value.params[key])))
		}

		let query = ''
		if (config.value.apiConfig?.query) {
			query = '?' + toQuery(config.value.apiConfig.query)
		}

		return url + query
	})
	const loading = computed((): boolean => status.value === 'pending')


	return {
		init,
		set,

		data: data as ComputedRef<TData>,

		config,
		status: status as ComputedRef<AsyncDataRequestStatus>,
		loading,
		error: error as ComputedRef<TError>
	}
}