import type { NitroFetchRequest } from 'nitropack'
import { useEventBus, type UseEventBusReturn } from '@vueuse/core'
import { computed, ref, reactive, watch } from 'vue'
import { useAsyncData } from '#app'
import type { TResponseList, TWS as TWSDefault } from '#ancore/types'
import { userApi, toQuery } from '#ancore/utils'


// TYPES
interface TConfig<TData, TFilter, TWS extends TWSDefault> {
	request: NitroFetchRequest
	filter?: TFilter
	reverse?: boolean
	events?: {
		bus: UseEventBusReturn<any, any>
		callback: (list: TData[], count: number, data: any) => number | void
	}[]
	ws?: {
		type: TWS['type']
		callback: (list: TData[], count: number, data: any) => number | void
	}[]
}


export default <TData, TFilter = unknown, TWS extends TWSDefault = TWSDefault>(config: TConfig<TData, TFilter, TWS>) => {
	// USE
	const busWS = useEventBus<TWS>('ws')


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
				event.bus.on((data) => {
					const newCount = event.callback(items, count.value || 0, data)
					if (newCount || newCount === 0) {
						count.value = newCount
					}
				})
			}
		}
		if (config.ws) {
			busWS.on((data) => {
				const event = config.ws?.find(item => item.type === data.type)
				if (event) {
					const newCount = event.callback(items, count.value || 0, data.data)
					if (newCount || newCount === 0) {
						count.value = newCount
					}
				}
			})
		}

		inited.value = true
	}
	const refresh = () => {
		if (!data.value) return

		if (!filter.value.skip) {
			count.value = null
			items.length = 0
		}

		if (config.reverse) {
			items.unshift(...data.value.items)
		} else {
			items.push(...data.value.items)

		}

		count.value = data.value.count
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
		() => userApi<TResponseList<TData>>(config.request, { method: 'GET', query: filter.value }),
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