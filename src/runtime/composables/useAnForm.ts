import { computed, ref, nextTick, watch } from 'vue'
import { useRefHistory } from '@vueuse/core'
import type { RuleItem, Rules } from 'async-validator'
import {
	useAsyncValidator,
	type UseAsyncValidatorExecuteReturn
} from '@vueuse/integrations/useAsyncValidator'


// TYPES
interface TStructureItem<TData> {
	default: TData
	rules?: RuleItem[]
}


export const useAnForm = <
	TForm extends object,
	TData extends Partial<TForm> | null | (Record<string, unknown> & Partial<TForm>) = Partial<TForm> | null
>(
	params: Record<keyof TForm, TStructureItem<TForm[keyof TForm]>>,
	data?: TData
) => {
	// DATA
	const state = ref<TForm>(
		Object.fromEntries(
			Object.entries(params).map(([k, v]) => {
				const key = k as keyof TForm
				return [key, data?.[key] !== undefined ? data?.[key] : (v as TStructureItem<TForm[typeof key]>).default]
			})
		) as TForm
	)
	const keys = Object.keys(state.value) as (keyof TForm)[]
	let validatorExecute: () => Promise<UseAsyncValidatorExecuteReturn>
	const History = useRefHistory(state, {deep: true})
	const errors = ref<Partial<Record<keyof TForm, string>>>({})


	// METHODS
	const init = () => {
		const rules: Rules = {}
		for (const key of keys) {
			if (!params[key].rules) continue
			rules[key as string] = params[key].rules
		}

		const validator = useAsyncValidator(
			state,
			rules,
			{manual: true}
		)

		validatorExecute = validator.execute
		watch(validator.errorFields, () => {
			errors.value = {}

			for (const key in validator.errorFields.value) {
				const fieldErrors = validator.errorFields.value[key]
				if (fieldErrors?.[0]) {
					errors.value[key] = fieldErrors[0].message
				}
			}
		})
	}
	const merge = (data: Partial<TForm>, commit?: true) => {
		for (const key of keys) {
			state.value[key] = data[key]
		}

		if (commit) {
			void nextTick(History.clear)
		}
	}


	// COMPUTED
	const first = computed(() => {
		return History.history.value.at(-1)?.snapshot as TForm
	})
	const isChanged = computed((): boolean => {
		if (History.history.value.length === 1) return false

		const firstOne = JSON.stringify(first.value)
		const last = JSON.stringify(History.last.value.snapshot)

		return firstOne !== last
	})
	const diff = computed<Partial<TForm>>(() => {
		const changed: Partial<TForm> = {}

		for (const key of keys) {
			if (JSON.stringify(state.value[key]) !== JSON.stringify(first.value[key])) {
				changed[key] = state.value[key]
			}
		}

		return changed
	})


	// WATCHES
	Object.keys(state.value).forEach(key => {
		watch(() => state.value[key], () => {
				errors.value[key] = undefined
		})
	})


	// INIT
	init()


	return {
		state,
		diff,

		merge,

		validator: {
			check: () => {
				return validatorExecute()
			},
			errors
		},

		history: {
			isChanged,
			reset: () => {
				state.value = first.value
				void nextTick(History.clear)
			},
			commit: History.clear
		}
	}
}