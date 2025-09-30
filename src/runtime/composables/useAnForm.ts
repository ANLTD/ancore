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
interface TFormParams<TForm> {
	structure: Record<keyof TForm, TStructureItem<TForm[keyof TForm]>>
	data?: Partial<TForm> | null
}


export const useAnForm = <TForm extends object>(params: TFormParams<TForm>) => {
	// DATA
	const state = ref<TForm>(
		Object.fromEntries(
			Object.entries(params.structure).map(([k, v]) => {
				const key = k as keyof TForm
				return [key, params.data?.[key] ?? (v as TStructureItem<TForm[typeof key]>).default]
			})
		) as TForm
	)
	const keys = Object.keys(state.value) as (keyof TForm)[]
	let validatorExecute: () => Promise<UseAsyncValidatorExecuteReturn>
	const History = useRefHistory(state, {deep: true})
	const errors = ref<Partial<Record<keyof TForm, string>>>({})


	// METHODS
	const init = () => {
		if (params.data) merge(params.data)
		initValidate()
		void nextTick(History.clear)
	}
	const merge = (data: Partial<TForm>) => {
		for (const key of keys) {
			state.value[key] = data[key]
		}
	}
	const initValidate = () => {
		const rules: Rules = {}
		for (const key of keys) {
			if (!params.structure[key].rules) continue
			rules[key as string] = params.structure[key].rules
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


	// WATCHES
	watch(state, () => {
		errors.value = {}
	}, {deep: true})


	// INIT
	init()


	return {
		state,

		merge: (data: TForm) => {
			merge(data)
		},

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