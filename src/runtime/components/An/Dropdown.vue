<script setup lang="ts">
	import { computed, ref, useTemplateRef, useId } from 'vue'
	import { onClickOutside, useEventListener, useMounted } from '@vueuse/core'


	const props = defineProps<{
		area?: string
		matchWidth?: boolean
	}>()


	// DATA
	const id = useId()
	const state = ref<boolean>(false)
	const refTarget = useTemplateRef('refTarget')
	const refMenu = useTemplateRef('refMenu')
	const isMounted = useMounted()


	// METHODS
	const toggle = (value?: boolean) => {
		state.value = value !== undefined ? value : !state.value
	}
	const close = () => {
		toggle(false)
	}
	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && state.value) close()
	}


	// COMPUTED
	const area = computed((): string => {
		return props.area || 'bottom span-right'
	})
	const name = computed((): string => {
		return `--an-dropdown-${id}`
	})
	const menuId = computed(() => `an-dropdown-menu-${id}`)
	const supportsAnchor = computed(() => !isMounted.value || CSS.supports('anchor-name', 'none'))


	// EVENTS
	onClickOutside(refTarget, close, { ignore: [refMenu] })
	useEventListener(document, 'keydown', onKeydown)


	defineExpose({ toggle, close })
</script>

<template>
	<div ref="refTarget" class="an-dropdown__button" v-bind="$attrs">
		<div
			:aria-expanded="state"
			:aria-controls="menuId"
			aria-haspopup="true"
		>
			<slot name="button" :toggle="toggle" />
		</div>

		<teleport to="body" :disabled="!isMounted || !supportsAnchor">
			<div
				v-show="state"
				ref="refMenu"
				:id="menuId"
				role="menu"
				class="an-dropdown__menu"
				:class="{ 'an-dropdown__menu--match-width': matchWidth }"
			>
				<slot name="menu" :close="close" />
			</div>
		</teleport>
	</div>
</template>

<style scoped>
	.an-dropdown__button {
		anchor-name: v-bind(name);
	}

	.an-dropdown__menu {
		position-anchor: v-bind(name);
		position: fixed;
		z-index: 1000;
		position-area: v-bind(area);
		position-try-fallbacks:
			top span-right,
			bottom span-left,
			top span-left;
	}

	/* Match the menu width to the trigger (anchor) width */
	.an-dropdown__menu--match-width {
		width: anchor-size(width);
	}

	@supports not (anchor-name: none) {
		.an-dropdown__button {
			position: relative;
		}
		.an-dropdown__menu {
			position: absolute;
			top: 100%;
			left: 0;
			z-index: 1000;
		}
		.an-dropdown__menu--match-width {
			width: 100%;
		}
	}
</style>