<script setup lang="ts">
	const props = defineProps<{
		params: { title: string; message: string }
	}>()

	const emit = defineEmits<{
		close: []
	}>()
</script>

<template>
	<div class="example-dialog">
		<h3>{{ params.title }}</h3>
		<p>{{ params.message }}</p>
		<button class="btn btn--primary" @click="emit('close')" style="margin-top: 12px">Close</button>
	</div>
</template>

<style scoped>
	.example-dialog {
		background: #fff;
		border-radius: 12px;
		padding: 24px;
		min-width: 320px;
		max-width: 420px;
	}
	.example-dialog h3 {
		font-size: 18px;
		margin-bottom: 8px;
	}
	.example-dialog p {
		font-size: 14px;
		color: #6c7293;
		line-height: 1.5;
	}
</style>
