<script setup lang="ts">
	const emit = defineEmits<{
		close: []
	}>()

	const selected = ref('')

	const items = [
		{ label: 'JavaScript', value: 'js' },
		{ label: 'TypeScript', value: 'ts' },
		{ label: 'Python', value: 'py' },
		{ label: 'Rust', value: 'rust' },
		{ label: 'Go', value: 'go' },
	]

	const select = (item: typeof items[number], close: () => void) => {
		selected.value = item.label
		close()
	}
</script>

<template>
	<div class="dropdown-dialog">
		<h3>Select a language</h3>
		<p v-if="selected">Selected: <strong>{{ selected }}</strong></p>

		<AnDropdown>
			<template #button="{ toggle }">
				<button class="btn btn--primary" @click="toggle()">
					{{ selected || 'Choose…' }}
				</button>
			</template>
			<template #menu="{ close }">
				<div class="menu">
					<div
						v-for="item in items"
						:key="item.value"
						class="menu__item"
						@click="select(item, close)"
					>
						{{ item.label }}
					</div>
				</div>
			</template>
		</AnDropdown>

		<button class="btn" @click="emit('close')" style="margin-top: 16px">Close</button>
	</div>
</template>

<style scoped>
	.dropdown-dialog {
		background: #fff;
		border-radius: 12px;
		padding: 24px;
		min-width: 320px;
		max-width: 420px;
	}
	.dropdown-dialog h3 {
		font-size: 18px;
		margin-bottom: 8px;
	}
	.dropdown-dialog p {
		font-size: 14px;
		color: #6c7293;
		margin-bottom: 12px;
	}
	.menu {
		background: #fff;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 8px 0 4px;
		min-width: 180px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}
	.menu__item {
		padding: 8px 16px;
		cursor: pointer;
		font-size: 14px;
	}
	.menu__item:hover {
		background: #f0f0f0;
	}
</style>
