<script setup lang="ts">
	import { useScrollLock } from '@vueuse/core'
	import { useAnDialogs } from '#imports'
	import { AnDialogsItem } from '#components'


	// USE
	const Dialogs = useAnDialogs()
	const isLocked = useScrollLock(window)


	// METHODS
	const onAnimation = () => {
		isLocked.value = !!Dialogs.items.length
	}
</script>

<template>
	<transition-group
		name="an-dialogs"
		tag="div"
		@before-enter="onAnimation"
		@after-leave="onAnimation"
	>
		<AnDialogsItem
			v-for="dialog of Dialogs.items"
			:key="dialog.id"
			:dialog="dialog"
		/>
	</transition-group>
</template>