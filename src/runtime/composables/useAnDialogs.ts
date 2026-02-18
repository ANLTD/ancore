import { v4 } from 'uuid'
import { useState } from '#app'
import { markRaw, type Component } from 'vue'
import type { TDialog } from '#ancore/types'


export const useAnDialogs = () => {
	// STATE
	const StateDialogs = useState<TDialog[]>('an-dialogs', () => [])


	// METHODS
	const open = (component: Component, params: Record<string, unknown> = {}, config: Partial<TDialog> = {}): TDialog => {
		const data: TDialog = {
			...config,
			id: v4(),
			component: markRaw(component),
			params
		}

		StateDialogs.value.push(data)

		return data
	}
	const close = (dialog: TDialog) => {
		const index = StateDialogs.value.indexOf(dialog)
		if (index === -1) return
		StateDialogs.value.splice(index, 1)
		dialog.onClose?.()
	}
	const closeAll = () => {
		while (StateDialogs.value.length) {
			StateDialogs.value[0] && close(StateDialogs.value[0])
		}
	}


	return {
		open,
		close,
		closeAll,

		items: StateDialogs.value
	}
}