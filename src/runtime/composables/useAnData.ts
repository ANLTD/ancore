import type { NitroFetchOptions, NitroFetchRequest, TypedInternalResponse } from 'nitropack'
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { type AsyncDataRequestStatus, useAsyncData } from '#app'
import { toQuery, userApi } from '#imports'


// TYPES
interface TConfig<Route extends NitroFetchRequest = NitroFetchRequest> {
	request: Route
	apiConfig?: NitroFetchOptions<string>
	params: Record<string, unknown>
}
interface TUseAnData<TData, TError> {
	init: () => Promise<void>,
	set: (data: TData) => void
	refresh: () => void
	config: TConfig
	params: TConfig['params']
	readonly data: TData | undefined
	readonly status: AsyncDataRequestStatus
	readonly loading: boolean
	readonly error: TError | undefined
}


export const useAnData = <
	TData = void,
	TError = unknown,
	Route extends NitroFetchRequest = NitroFetchRequest,
	_TData = TData extends void ? TypedInternalResponse<Route, unknown, 'get'> : TData
>(
	initConfig: Omit<TConfig<Route>, 'params'> & Partial<Pick<TConfig<Route>, 'params'>>
): TUseAnData<_TData, TError> => {
	// DATA
	const config = ref<TConfig>({params: {}, ...initConfig})
	const data = ref<TData | undefined>(undefined)
	const error = ref<TError | undefined>(undefined)
	const status = ref<AsyncDataRequestStatus>('idle')
	const isMounted = ref(false)
	const time = ref<number>(0)


	// METHODS
	const fetchData = () => userApi<TData, TError>(
		path.value.url,
		{ method: 'GET', ...(config.value.apiConfig || {}) },
	)
	const init = async () => {
		if (isMounted.value) {
			const execute = () => {
				status.value = 'pending'
				fetchData()
					.then((response: TData) => {
						data.value = response
						nextTick().then(() => {
							status.value = 'success'
						})
					}).catch((e: TError) => {
						status.value = 'error'
						error.value = e
					})
			}
			watch(() => key.value, execute, { immediate: true })
		} else {
			const Data = useAsyncData<TData, TError, TData>(
				key,
				() => fetchData(),
				{immediate: false}
			)

			await Data.execute()

			watch(Data.data, () => data.value = Data.data.value, {immediate: true})
			watch(Data.error, () => error.value = Data.error.value, {immediate: true})
			watch(Data.status, () => status.value = Data.status.value, {immediate: true})
		}
	}
	const set = (value: _TData) => {
		data.value = value as TData | undefined
	}


	// COMPUTED
	const path = computed((): {url: string, key: string} => {
		let url = config.value.request.toString()
		for (const key in config.value.params) {
			url = url.replace(`:${key}`, encodeURIComponent(String(config.value.params[key])))
		}

		let query = ''
		if (config.value.apiConfig?.query) {
			query = '?' + toQuery(config.value.apiConfig.query)
		}

		return {
			url: url + query,
			key: url + query + (query ? '&' : '?') + 'time=' + time.value
		}
	})
	const key = computed(() => path.value.key)
	const loading = computed((): boolean => status.value === 'pending')


	// EVENTS
	onMounted(() => {
		isMounted.value = true
	})


	return {
		init,
		set,
		refresh: () => { time.value = Date.now() },

		get data() { return data.value as _TData | undefined },

		get config() { return config.value },
		set config(val: TConfig) { config.value = val },
		params: config.value.params,
		get status() { return status.value },
		get loading() { return loading.value || status.value === 'idle' },
		get error() { return error.value as TError | undefined },
	}
}