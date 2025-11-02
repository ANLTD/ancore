import type { TArgument } from '#ancore/types'
import type { useInfiniteScroll } from '@vueuse/core'


export interface TInfiniteScroll {
	element?: TArgument<typeof useInfiniteScroll, 0>,
	onLoadMore?: TArgument<typeof useInfiniteScroll, 1>,
	options?: TArgument<typeof useInfiniteScroll, 2>,
	canLoadMore?: () => boolean
}