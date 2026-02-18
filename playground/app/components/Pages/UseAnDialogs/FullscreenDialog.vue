<script setup lang="ts">
	const props = defineProps<{
		params: { color: string }
	}>()

	const emit = defineEmits<{
		close: []
	}>()
</script>

<template>
	<div class="fullscreen-dialog" :style="{ background: params.color }">
		<h2>Fullscreen Dialog</h2>
		<p>This dialog takes the entire screen.</p>
		<button class="btn btn--secondary" @click="emit('close')" style="margin-top: 16px">Close</button>
	</div>
</template>

<style scoped>
	.fullscreen-dialog {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		text-align: center;
		padding: 24px;
	}
	.fullscreen-dialog h2 {
		font-size: 28px;
		margin-bottom: 8px;
	}
	.fullscreen-dialog p {
		font-size: 16px;
		opacity: 0.8;
	}
</style>
