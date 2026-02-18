import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { computed, ref, type Ref, type ComputedRef, watch, onMounted, nextTick } from 'vue'
import { type AsyncDataRequestStatus, useAsyncData } from '#app'
import { toQuery, userApi } from '#imports'


// TYPES
interface TConfig {
	request: NitroFetchRequest
	apiConfig?: NitroFetchOptions<string>
	params: Record<string, unknown>
}
interface TUseAnData<TData, TError> {
	init: () => Promise<void>,
	set: (data: TData) => void
	refresh: () => void
	config: Ref<TConfig>
	params: TConfig['params']
	data: Readonly<Ref<TData | undefined>>
	status: Readonly<Ref<AsyncDataRequestStatus>>
	loading: ComputedRef<boolean>,
	error: Readonly<Ref<TError | undefined>>
}


export const useAnData = <TData = unknown, TError = unknown>(
	initConfig: Omit<TConfig, 'params'> & Partial<Pick<TConfig, 'params'>>
): TUseAnData<TData, TError> => {
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
	const set = (value: TData) => {
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
		refresh: () => time.value = Date.now(),

		data: data as Readonly<Ref<TData | undefined>>,

		config,
		params: config.value.params,
		status: status as Readonly<Ref<AsyncDataRequestStatus>>,
		loading,
		error: error as Readonly<Ref<TError | undefined>>
	}
}