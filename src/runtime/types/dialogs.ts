import type { Component } from '@nuxt/schema'


export interface TDialog {
	id: string
	component: Component | Function
	params: Record<string, unknown>
	fullscreen?: boolean
	class?: string
	onClose?: () => void
}