import type { Component } from 'vue'


export interface TDialog {
	id: string
	component: Component
	params: Record<string, unknown>
	fullscreen?: boolean
	animate?: boolean | {
		enable: boolean
		duration?: number
	}
	class?: string
	onClose?: () => void
	beforeClose?: () => boolean | void | Promise<boolean | void>
}