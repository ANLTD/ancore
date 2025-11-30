<script setup lang="ts">
	const emit = defineEmits(['close'])


	defineExpose({
		config: {
			// fullscreen: true
		}
	})
</script>

<template>
	<div class="dialog-test">
		<div>1</div>
		<div>1</div>
		<div>1</div>

		<div>1</div>
		<div>1</div>
		<div>1</div>
	<div @click="emit('close')">x</div></div>
</template>

<style scoped>
	.dialog-test {
		background: white;
		padding: 0 24px 24px;
	}
</style>