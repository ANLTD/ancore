import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { ref, reactive, watch, computed, type UnwrapRef } from 'vue'
import type { TInfiniteScroll, TResponseList } from '#ancore/types'
import { useAnData } from './useAnData'
import { useInfiniteScroll } from '@vueuse/core'


// TYPES
interface TConfig<TFilter> {
	request: NitroFetchRequest
	apiConfig?: NitroFetchOptions<string>
	filter?: TFilter
	params?: Record<string, unknown>
	skipField?: string
	reverse?: boolean
}


export const useAnList = <TData, TFilter extends object = {}>(initConfig: TConfig<TFilter>) => {
	// DATA
	const config = ref<TConfig<TFilter>>(initConfig)
	const items: TData[] = reactive([])
	const count = ref<number | null>(null)
	let resetInfiniteScroll: undefined | (() => void)


	// METHODS
	const init = async () => {
		await data.init()
		refresh()
	}
	const refresh = () => {
		if (!data.data.value) return

		if (!config.value.apiConfig?.query?.[config.value.skipField || 'skip']) {
			setCount(null)
			items.length = 0
		}

		if (config.value.reverse) {
			items.unshift(...data.data.value.items)
		} else {
			items.push(...data.data.value.items)
		}

		setCount(data.data.value.count)

		resetInfiniteScroll?.()
	}
	const setCount = (value: number | null) => {
		count.value = value
	}
	const infiniteScroll = (scrollConfig?: TInfiniteScroll): void => {
		const onLoadMore = scrollConfig?.onLoadMore || (() => {
			if (!config.value.filter) config.value.filter = {} as UnwrapRef<TFilter>
			// @ts-ignore
			config.value.filter[config.value.skipField || 'skip'] = items.length
		})
		const canLoadMore = scrollConfig?.options?.canLoadMore || ((): boolean => {
			return (
				(scrollConfig?.canLoadMore?.() ?? true) &&
				inited.value &&
				items.length < (count.value || 0) &&
				// @ts-ignore
				!!config.value.filter.limit
			)
		})

		const { reset } = useInfiniteScroll(
			scrollConfig?.element || window,
			onLoadMore,
			{
				...scrollConfig?.options,
				canLoadMore,
			})

		resetInfiniteScroll = reset
	}


	// COMPUTED
	const inited = computed((): boolean => data.status.value !== 'idle')


	// INIT
	if (!config.value.apiConfig) {
		config.value.apiConfig = {}
	}
	config.value.apiConfig.query = config.value.filter as Record<string, any> | undefined
	const data = useAnData<TResponseList<TData>>({
		request: config.value.request,
		apiConfig: config.value.apiConfig,
		params: config.value.params
	})


	// WATCHES
	watch(data.data, refresh)


	return {
		init,
		infiniteScroll,

		filter: config.value.filter as TFilter,
		params: config.value.params,

		items,
		count,

		inited,
		status: data.status,
		loading: data.loading,
		error: data.error,
	}
}