<script setup lang="ts">
	import { v4 } from 'uuid'
	import { computed, onMounted, ref, useTemplateRef } from 'vue'
	import { onClickOutside, useEventListener } from '@vueuse/core'


	const props = defineProps<{
		area?: string
	}>()


	// DATA
	const id = ref<string>()
	const state = ref<boolean>(false)
	const refTarget = useTemplateRef('refTarget')


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
		return id.value ? `--an-dropdown-${id.value}` : ''
	})
	const menuId = computed(() => id.value ? `an-dropdown-menu-${id.value}` : undefined)


	// EVENTS
	onMounted(() => {
		id.value = v4()
	})
	onClickOutside(refTarget, close)
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

		<teleport to="body">
			<div
				v-show="state"
				:id="menuId"
				role="menu"
				class="an-dropdown__menu"
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
</style>
