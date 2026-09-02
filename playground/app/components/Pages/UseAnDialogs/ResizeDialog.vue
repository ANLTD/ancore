<script setup lang="ts">
	import type { TDialog } from '#ancore/types'

	const props = defineProps<{
		params: { animate: TDialog['animate'] }
	}>()

	const emit = defineEmits<{
		close: []
	}>()

	const period = ref('never')
	const periods = ['never', 'daily', 'weekly', 'monthly']
	const needsTime = computed(() => period.value !== 'never')
	const needsDay = computed(() => period.value === 'weekly' || period.value === 'monthly')
</script>

<template>
	<div class="resize-dialog">
		<h3>Notifications</h3>
		<p class="resize-dialog__hint">
			animate: {{ JSON.stringify(params.animate) }} — switch the period and watch the dialog height.
		</p>

		<label class="resize-dialog__field">
			<span>Period</span>
			<select v-model="period">
				<option v-for="item in periods" :key="item" :value="item">{{ item }}</option>
			</select>
		</label>

		<label v-if="needsTime" class="resize-dialog__field">
			<span>Time</span>
			<input type="time" value="09:00">
		</label>

		<label v-if="needsDay" class="resize-dialog__field">
			<span>Day</span>
			<select>
				<option>Monday</option>
				<option>Friday</option>
			</select>
		</label>

		<button class="btn btn--primary" @click="emit('close')" style="margin-top: 16px">Close</button>
	</div>
</template>

<style scoped>
	.resize-dialog {
		background: #fff;
		border-radius: 12px;
		padding: 24px;
		min-width: 320px;
		max-width: 420px;
	}
	.resize-dialog h3 {
		font-size: 18px;
		margin-bottom: 8px;
	}
	.resize-dialog__hint {
		font-size: 13px;
		color: #6c7293;
		line-height: 1.5;
		margin-bottom: 16px;
	}
	.resize-dialog__field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 0;
		font-size: 14px;
	}
	.resize-dialog__field select,
	.resize-dialog__field input {
		padding: 6px 10px;
		border: 1px solid #e8eaed;
		border-radius: 6px;
		font-size: 14px;
	}
</style>
