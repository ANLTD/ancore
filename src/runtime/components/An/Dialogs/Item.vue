<script setup lang="ts">
	import { computed, ref, onMounted, type ComponentPublicInstance } from 'vue'
	import {
		onClickOutside,
		useSwipe,
		useElementSize,
		useScroll,
		type UseSwipeReturn,
		type UseScrollReturn,
		type UseElementSizeReturn
	} from '@vueuse/core'
	import { useAnDialogs, useTemplateRef } from '#imports'
	import type { TDialog } from '#ancore/types'


	// TYPES
	type TDialogComponentConfig = ComponentPublicInstance<{config?: Partial<TDialog>}>


	const props = defineProps<{
		dialog: TDialog
	}>()


	// USE
	const Dialogs = useAnDialogs()
	const refDialog = useTemplateRef<TDialogComponentConfig>('refDialog')
	let Scroll: UseScrollReturn
	let Swipe: UseSwipeReturn
	let ElementSize: UseElementSizeReturn


	// DATA
	const top = ref<number>(0)
	const active = ref<boolean>(false)
	const target = ref<HTMLElement | null>(null)
	let raf: number = 0


	// METHODS
	const onSwipeStart = () => {
		active.value = canSwipe.value
	}
	const onSwipe = () => {
		if (!active.value) return

		setTop(Math.max(0, -Swipe.lengthY.value))
	}
	const onSwipeEnd = () => {
		if (Math.abs(top.value) > ElementSize.height.value / 2) {
			Dialogs.close(props.dialog)
			return
		}

		active.value = false
		setTop(0)
	}
	const setTop = (value: number) => {
		cancelAnimationFrame(raf)
		raf = requestAnimationFrame(() => {
			top.value = value
		})
	}


	// COMPUTED
	const config = computed((): TDialog => {
		return {
			...props.dialog,
			...(refDialog.value?.config ? refDialog.value.config : {})
		}
	})
	const canSwipe = computed(() => Scroll.arrivedState.top && !config.value.fullscreen)


	// EVENTS
	onMounted(() => {
		target.value = refDialog.value?.$el || null

		if (!config.value.fullscreen) {
			onClickOutside(refDialog, () => Dialogs.close(props.dialog))
		}

		Swipe = useSwipe(target, {
			onSwipeStart,
			onSwipe,
			onSwipeEnd,
			threshold: 0
		})
		Scroll = useScroll(target)
		ElementSize = useElementSize(target)
	})
</script>

<template>
	<div
		class="dialog -flex -flex__column"
		:class="[{'-fullscreen': config.fullscreen}, config.class]"
	>
		<component
			ref="refDialog"
			:is="props.dialog.component"
			:params="props.dialog.params"
			class="dialog__component"
			:style="{transform: `translateY(${top}px)`}"
			@close="Dialogs.close(props.dialog)"
		/>
	</div>
</template>

<style scoped>
	.dialog {
		--an-dialogs-background: inherit;
		--an-dialogs-close: inherit;
		--an-dialogs-backdrop-filter: inherit;

		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 200;
		box-sizing: border-box;

		&:not(.-fullscreen) {
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--an-dialogs-background, rgba(0, 0, 0, 0.3));
			backdrop-filter: var(--an-dialogs-backdrop-filter, blur(6px));
			-webkit-backdrop-filter: var(--an-dialogs-backdrop-filter, blur(6px));

			& .dialog__component {
				@media (width < 768px) {
					max-height: calc(100vh - 48px);
					width: 100%;
					margin-top: auto;
					position: relative;

					&::before {
						content: '';
						display: block;
						height: 4px;
						background: var(--an-dialogs-close, rgba(0, 0, 0, 0.5));
						width: 50px;
						margin: 10px auto;
						border-radius: 100px;
					}
				}

				@media (width >= 768px) {
					margin: auto;
				}
			}
		}

		&.-fullscreen {
			& .dialog__component {
				width: 100%;
				height: 100%;
			}
		}
	}

	.dialog__component {
		box-sizing: border-box;
		position: relative;
		overflow-y: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>