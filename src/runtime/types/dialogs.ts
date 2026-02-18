import type { Component } from 'vue'


export interface TDialog {
	id: string
	component: Component
	params: Record<string, unknown>
	fullscreen?: boolean
	class?: string
	onClose?: () => void
}