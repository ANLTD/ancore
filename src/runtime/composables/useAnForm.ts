import type { Rules } from 'async-validator'
import {
	type AsyncValidatorError,
	useAsyncValidator,
	type UseAsyncValidatorExecuteReturn
} from '@vueuse/integrations/useAsyncValidator'
import { useRefHistory } from '@vueuse/core'
import { computed, ref, nextTick, watchEffect, watch } from 'vue'



// TYPES
interface TFormParams<T> {
	rules?: Rules
	empty: Record<keyof T, unknown>
	data?: Partial<T> | null
}


export default <T = unknown>(params: TFormParams<T>) => {
	// DATA
	const state = ref<T>((params.empty ? {...params.empty} : {}) as T)
	const keys = Object.keys(params.empty) as (keyof T)[]
	let validatorExecute: () => Promise<UseAsyncValidatorExecuteReturn>
	const validatorErrors = ref<AsyncValidatorError['fields'] | undefined>()
	const History = useRefHistory(state, {deep: true})


	// METHODS
	const init = () => {
		if (params.data) merge(params.data)
		if (params.rules) initValidate()
		void nextTick(History.clear)
	}
	const merge = (data: Partial<T>) => {
		for (const key of keys) {
			state.value[key] = data[key]
		}
	}
	const initValidate = () => {
		if (!params.rules) return

		const validator = useAsyncValidator(
			state,
			params.rules,
			{manual: true}
		)

		validatorExecute = validator.execute
		watchEffect(() => {
			validatorErrors.value = validator.errorFields.value
		})
	}


	// COMPUTED
	const first = computed(() => {
		return History.history.value.at(-1)?.snapshot as T
	})
	const isChanged = computed((): boolean => {
		if (History.history.value.length === 1) return false

		const firstOne = JSON.stringify(first.value)
		const last = JSON.stringify(History.last.value.snapshot)

		return firstOne !== last
	})


	// WATCHES
	watch(state, () => {
		if (validatorErrors.value) {
			validatorErrors.value = undefined
		}
	}, {deep: true})


	// INIT
	init()


	return {
		state,

		merge: (data: T) => {
			merge(data)
		},

		validator: {
			check: () => {
				return validatorExecute()
			},
			errors: validatorErrors
		},

		history: {
			isChanged,
			reset: () => {
				state.value = first.value
				void nextTick(History.clear)
			}
		}
	}
}