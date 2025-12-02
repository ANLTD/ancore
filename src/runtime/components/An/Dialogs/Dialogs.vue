<script setup lang="ts">
	import { useScrollLock } from '@vueuse/core'
	import { watch } from 'vue'
	import { useAnDialogs } from '#imports'
	import { AnDialogsItem } from '#components'


	// USE
	const Dialogs = useAnDialogs()
	const isLocked = useScrollLock(window)


	// WATCHES
	watch(() => Dialogs.items.length, value => {
		isLocked.value = !!value
	})
</script>

<template>
	<transition-group name="an-dialogs" tag="div">
		<AnDialogsItem
			v-for="dialog of Dialogs.items"
			:key="dialog.id"
			:dialog="dialog"
		/>
	</transition-group>
</template>