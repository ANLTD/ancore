import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { type UseEventBusReturn } from '@vueuse/core'
import { computed, ref, reactive, watch } from 'vue'
import { useAsyncData } from '#app'
import type { TResponseList } from '#ancore/types'
import { userApi, toQuery } from '../utils'


// TYPES
interface TConfig<TData, TFilter> {
	request: NitroFetchRequest
	filter?: TFilter
	reverse?: boolean
	events?: {
		bus: UseEventBusReturn<any, any>
		callback: (list: TData[], count: number, event: any, payload: any, setCount: (value: number) => void) => void
	}[]
	apiConfig?: NitroFetchOptions<string>
}


export default <TData, TFilter = unknown>(config: TConfig<TData, TFilter>) => {
	// DATA
	const inited = ref<boolean>(false)
	const filter = ref<Partial<TFilter>>(config.filter || {})
	const items: TData[] = reactive([])
	const count = ref<number | null>(null)


	// METHODS
	const init = async (newFilter?: TFilter) => {
		if (newFilter) {
			filter.value = { ...newFilter }
		} else if (config.filter) {
			filter.value = { ...config.filter }
		}

		await execute()

		refresh()

		if (config.events) {
			for (const event of config.events) {
				event.bus.on((event_type, payload) => {
					event.callback(items, count.value || 0, event_type, payload, setCount)
				})
			}
		}

		inited.value = true
	}
	const refresh = () => {
		if (!data.value) return

		if (!filter.value.skip) {
			setCount(null)
			items.length = 0
		}

		if (config.reverse) {
			items.unshift(...data.value.items)
		} else {
			items.push(...data.value.items)

		}

		setCount(data.value.count)
	}
	const setCount = (value: number | null) => {
		count.value = value
	}


	// COMPUTED
	const key = computed((): string => {
		return config.request + '?' + toQuery(filter.value)
	})
	const loading = computed((): boolean => {
		return status.value === 'pending'
	})


	// INIT
	const {
		data,
		error,
		execute,
		status
	} = useAsyncData<TResponseList<TData>>(
		key,
		() => userApi<TResponseList<TData>>(
			config.request,
			{ method: 'GET', query: filter.value, ...(config.apiConfig || {}) }
		),
		{ immediate: false }
	)


	// WATCHES
	watch(data, refresh)


	return {
		init,

		inited,
		filter,
		loading,
		items,
		count,
		error,
		status
	}
}