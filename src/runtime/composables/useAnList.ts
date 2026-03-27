import type { NitroFetchOptions, NitroFetchRequest, TypedInternalResponse } from 'nitropack'
import { ref, reactive, watch, type UnwrapRef } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import type { TInfiniteScroll, TResponseList } from '#ancore/types'
import { type AsyncDataRequestStatus } from '#app'
import { useAnData } from '#imports'


// TYPES
type ExtractListItem<T> = T extends TResponseList<infer U> ? U : unknown

interface TConfig<TFilter, Route extends NitroFetchRequest = NitroFetchRequest> {
	request: Route
	apiConfig?: NitroFetchOptions<string>
	filter?: TFilter
	params?: Record<string, string>
	skipField?: string
	reverse?: boolean
}
interface TUseAnList<TData, TFilter> {
	init: () => Promise<void>
	refresh: () => void
	infiniteScroll: (scrollConfig?: TInfiniteScroll) => () => void
	filter: TFilter
	params: Record<string, string> | undefined
	items: TData[]
	count: number | null
	readonly status: AsyncDataRequestStatus
	readonly loading: boolean
	readonly error: unknown | undefined
}


export const useAnList = <
	TData = void,
	TFilter extends object = {},
	Route extends NitroFetchRequest = NitroFetchRequest,
	_TData = TData extends void ? ExtractListItem<TypedInternalResponse<Route, unknown, 'get'>> : TData
>(initConfig: TConfig<TFilter, Route>): TUseAnList<_TData, TFilter> => {
	// DATA
	const config = ref<TConfig<TFilter>>(initConfig as any)
	const items: _TData[] = reactive([])
	const count = ref<number | null>(null)


	// METHODS
	const init = async () => {
		await data.init()
		await refresh()
	}
	const refresh = () => {
		if (!data.data) return

		if (!config.value.apiConfig?.query?.[config.value.skipField || 'skip']) {
			count.value = null
			items.length = 0
		}

		if (config.value.reverse) {
			items.unshift(...data.data.items)
		} else {
			items.push(...data.data.items)
		}

		count.value = data.data.count
	}
	const infiniteScroll = (scrollConfig?: TInfiniteScroll): () => void => {
		const onLoadMore = scrollConfig?.onLoadMore || (() => {
			if (!config.value.filter) config.value.filter = {} as UnwrapRef<TFilter>
			;(config.value.filter as Record<string, unknown>)[config.value.skipField || 'skip'] = items.length
		})
		const canLoadMore = scrollConfig?.options?.canLoadMore || ((): boolean => {
			return (
				(scrollConfig?.canLoadMore?.() ?? true) &&
				data.status !== 'idle' &&
				data.status !== 'pending' &&
				items.length < (count.value || 0) &&
				!!(config.value.filter as Record<string, unknown> | undefined)?.limit
			)
		})

		const { reset } = useInfiniteScroll(
			scrollConfig?.element || window,
			onLoadMore,
			{
				...scrollConfig?.options,
				canLoadMore,
			})

		return reset
	}


	// INIT
	if (!config.value.apiConfig) {
		config.value.apiConfig = {}
	}
	config.value.apiConfig.query = config.value.filter as Record<string, any> | undefined
	const data = useAnData<TResponseList<_TData>>({
		request: config.value.request,
		apiConfig: config.value.apiConfig,
		params: config.value.params
	})


	// WATCHES
	watch(() => data.data, refresh)


	return {
		init,
		refresh: data.refresh,
		infiniteScroll,

		get filter() { return config.value.filter as TFilter },
		set filter(val: TFilter) {
			config.value.filter = val as UnwrapRef<TFilter>
			if (config.value.apiConfig) {
				config.value.apiConfig.query = val as Record<string, any>
			}
		},
		params: config.value.params,

		items,

		get count() { return count.value },
		set count(val: number | null) { count.value = val },
		get status() { return data.status },
		get loading() { return data.loading },
		get error() { return data.error },
	}
}