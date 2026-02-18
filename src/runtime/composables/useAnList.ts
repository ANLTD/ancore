import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { ref, reactive, watch, computed, type UnwrapRef, type Ref, type ComputedRef } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import type { TInfiniteScroll, TResponseList } from '#ancore/types'
import { type AsyncDataRequestStatus } from '#app'
import { useAnData } from '#imports'


// TYPES
interface TConfig<TFilter> {
	request: NitroFetchRequest
	apiConfig?: NitroFetchOptions<string>
	filter?: TFilter
	params?: Record<string, string>
	skipField?: string
	reverse?: boolean
}
interface TUseAnList<TData, TFilter> {
	init: () => Promise<void>
	infiniteScroll: (scrollConfig?: TInfiniteScroll) => () => void
	filter: TFilter
	params: Record<string, string> | undefined
	items: TData[]
	count: Ref<number | null>
	inited: ComputedRef<boolean>
	status: Readonly<Ref<AsyncDataRequestStatus>>
	loading: ComputedRef<boolean>
	error: Readonly<Ref<unknown | undefined>>
}


export const useAnList = <TData, TFilter extends object = {}>(initConfig: TConfig<TFilter>): TUseAnList<TData, TFilter> => {
	// DATA
	const config = ref<TConfig<TFilter>>(initConfig)
	const items: TData[] = reactive([])
	const count = ref<number | null>(null)


	// METHODS
	const init = async () => {
		await data.init()
		await refresh()
	}
	const refresh = () => {
		if (!data.data.value) return

		if (!config.value.apiConfig?.query?.[config.value.skipField || 'skip']) {
			count.value = null
			items.length = 0
		}

		if (config.value.reverse) {
			items.unshift(...data.data.value.items)
		} else {
			items.push(...data.data.value.items)
		}

		count.value = data.data.value.count
	}
	const infiniteScroll = (scrollConfig?: TInfiniteScroll): () => void => {
		const onLoadMore = scrollConfig?.onLoadMore || (() => {
			if (!config.value.filter) config.value.filter = {} as UnwrapRef<TFilter>
			;(config.value.filter as Record<string, unknown>)[config.value.skipField || 'skip'] = items.length
		})
		const canLoadMore = scrollConfig?.options?.canLoadMore || ((): boolean => {
			return (
				(scrollConfig?.canLoadMore?.() ?? true) &&
				inited.value &&
				data.status.value !== 'pending' &&
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