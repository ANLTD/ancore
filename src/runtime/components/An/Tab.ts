import { defineComponent, h, Fragment, watch, ref, type Component, type VNodeArrayChildren } from 'vue'


// TYPES
export type TabExposed = {
	reset: () => void
}


const Tab = defineComponent({
	name: 'Tab',
	props: {
		show: {
			type: Boolean,
			required: true
		}
	},
	setup(props, { slots, expose }) {
		// DATA
		const created = ref<boolean>(false)


		// METHODS
		const reset = () => {
			created.value = false
		}


		// WATCHES
		watch(() => props.show, () => {
			if (props.show) created.value = true
		}, { immediate: true })


		expose<TabExposed>({ reset })


		return () => {
			if (!created.value) return null

			const content = slots.default?.() ?? []

			if (props.show) return h(Fragment, {}, content)

			return content.map(vnode =>
				h(
					vnode.type as string | Component,
					{
						...vnode.props,
						style: {
							...(vnode.props?.style || {}),
							display: 'none'
						}
					},
					(vnode.children ?? undefined) as string | VNodeArrayChildren | undefined
				)
			)
		}
	}
})


export default Tab as typeof Tab & { new(): TabExposed }