<script setup lang="ts">
	const dropdownRef = ref()
</script>

<template>
	<div class="page">
		<h1 class="page__title">AnDropdown</h1>
		<p class="page__desc">
			Dropdown component using CSS Anchor Positioning with teleport to body, click-outside close, Escape key, and ARIA.
		</p>

		<div class="section">
			<h3 class="section__title">Props</h3>
			<table class="api-table">
				<thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>area</code></td><td><code>string</code></td><td><code>bottom span-right</code></td><td>CSS position-area value</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Slots</h3>
			<table class="api-table">
				<thead><tr><th>Slot</th><th>Props</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>#button</code></td><td><code>{ toggle }</code></td><td>Trigger element. Call <code>toggle()</code> to open/close</td></tr>
					<tr><td><code>#menu</code></td><td><code>{ close }</code></td><td>Menu content. Call <code>close()</code> to dismiss</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Exposed</h3>
			<table class="api-table">
				<thead><tr><th>Method</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>toggle(value?)</code></td><td>Toggle or force open/close</td></tr>
					<tr><td><code>close()</code></td><td>Close the dropdown</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Basic dropdown</h3>
			<div class="demo">
				<AnDropdown style="display: inline-block">
					<template #button="{ toggle }">
						<button class="btn btn--primary" @click="toggle()">Open menu</button>
					</template>
					<template #menu="{ close }">
						<div class="dropdown-menu">
							<div class="dropdown-item" @click="close">Action 1</div>
							<div class="dropdown-item" @click="close">Action 2</div>
							<div class="dropdown-item" @click="close">Action 3</div>
						</div>
					</template>
				</AnDropdown>
			</div>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Custom position</h3>
			<p class="section__subtitle">Uses <code>area="top span-right"</code> to open above the trigger.</p>
			<div class="demo">
				<div style="margin-top: 80px">
					<AnDropdown area="top span-right" style="display: inline-block">
						<template #button="{ toggle }">
							<button class="btn btn--secondary" @click="toggle()">Open above</button>
						</template>
						<template #menu="{ close }">
							<div class="dropdown-menu">
								<div class="dropdown-item" @click="close">Item A</div>
								<div class="dropdown-item" @click="close">Item B</div>
							</div>
						</template>
					</AnDropdown>
				</div>
			</div>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Programmatic control via ref</h3>
			<div class="demo">
				<AnDropdown ref="dropdownRef" style="display: inline-block">
					<template #button>
						<span class="btn btn--secondary">Controlled dropdown</span>
					</template>
					<template #menu="{ close }">
						<div class="dropdown-menu">
							<div class="dropdown-item" @click="close">Menu item</div>
						</div>
					</template>
				</AnDropdown>

				<button class="btn btn--primary" @click="dropdownRef?.toggle()" style="margin-left: 12px">
					Toggle via ref
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.dropdown-menu {
		background: #fff;
		border: 1px solid #e8eaed;
		border-radius: 8px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		padding: 4px;
		min-width: 160px;
	}
	.dropdown-item {
		padding: 8px 12px;
		border-radius: 4px;
		font-size: 13px;
		cursor: pointer;
		transition: background 0.1s;
	}
	.dropdown-item:hover {
		background: #f4f5f7;
	}
</style>
