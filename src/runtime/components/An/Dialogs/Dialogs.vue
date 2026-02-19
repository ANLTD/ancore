<script setup lang="ts">
	import { watch } from 'vue'
	import { useAnDialogs } from '#imports'
	import { AnDialogsItem } from '#components'


	// USE
	const Dialogs = useAnDialogs()


	// DATA
	let scrollY = 0


	// METHODS
	const lockScroll = () => {
		scrollY = window.scrollY
		document.documentElement.style.overflowY = 'scroll'
		document.body.style.position = 'fixed'
		document.body.style.top = `-${scrollY}px`
		document.body.style.left = '0'
		document.body.style.width = '100%'
	}
	const unlockScroll = () => {
		document.body.style.position = ''
		document.body.style.top = ''
		document.body.style.left = ''
		document.body.style.width = ''
		document.documentElement.style.overflowY = ''
		window.scrollTo(0, scrollY)
	}


	// WATCHES
	if (import.meta.client) {
		watch(
			() => Dialogs.items.length,
			(count, prev) => {
				if (count > 0 && (!prev || prev === 0)) lockScroll()
				else if (count === 0 && prev && prev > 0) unlockScroll()
			}
		)
	}
</script>

<template>
	<transition-group
		v-bind="$attrs"
		name="an-dialogs"
		tag="div"
		aria-live="polite"
	>
		<AnDialogsItem
			v-for="dialog of Dialogs.items"
			:key="dialog.id"
			:dialog="dialog"
		/>
	</transition-group>
</template>