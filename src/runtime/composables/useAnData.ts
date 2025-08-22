import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { computed, ref, type Ref, type ComputedRef  } from 'vue'
import { useAsyncData } from '#app'
import { userApi } from '../utils'
import type { UseEventBusReturn } from '@vueuse/core'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'


// TYPES
interface TConfig<TData> {
	request: NitroFetchRequest
	apiConfig?: NitroFetchOptions<string>
	events?: {
		bus: UseEventBusReturn<any, any>
		callback: (target: TData | undefined, updated: Partial<TData>) => TData | undefined | null
	}[]
}
interface TUseAnData<TData, TError> {
	init: () => Promise<void>,
	set: (data: TData) => void,
	loading: ComputedRef<boolean>,
	request: Ref<NitroFetchRequest>
	data: ComputedRef<TData>
	error: ComputedRef<TError>
	status: ReturnType<typeof useAsyncData>['status']
}


export const useAnData = <TData = unknown, TError = unknown>(
	config: TConfig<TData>
): TUseAnData<TData, TError> => {
	// DATA
	const request = ref<NitroFetchRequest>(config.request)


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
	if (config.events) {
		for (const event of config.events) {
			event.bus.on((updated: TData) => {
				const result = event.callback(data.value as TData, updated)
				if (result !== undefined) data.value = { ...result } as PickFrom<TData, KeysOf<TData>> | undefined
			})
		}
	}


	return {
		init: execute,
		set: (newDate: TData) => {
			data.value = newDate as PickFrom<TData, KeysOf<TData>> | undefined
		},

		loading,
		request,
		data: data as ComputedRef<TData>,
		error: error as ComputedRef<TError>,
		status,
	}
}