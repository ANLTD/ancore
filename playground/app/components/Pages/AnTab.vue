<script setup lang="ts">
	const activeTab = ref(0)
	const tabRefs = ref<Record<number, any>>({})
	const logs = ref<string[]>([])

	const tabs = [
		{ title: 'Profile', content: 'User profile settings and preferences.' },
		{ title: 'Security', content: 'Password, 2FA, and session management.' },
		{ title: 'Notifications', content: 'Email, push, and in-app notification settings.' },
	]

	const log = (message: string) => {
		const time = new Date().toLocaleTimeString('en', { hour12: false })
		logs.value.push(`[${time}] ${message}`)
	}

	const resetTab = (i: number) => {
		tabRefs.value[i]?.reset()
		log(`reset("${tabs[i].title}")`)
	}

	const TabLogger = defineComponent({
		props: { name: { type: String, required: true } },
		setup(props) {
			onMounted(() => log(`init("${props.name}")`))
			return () => null
		}
	})
</script>

<template>
	<div class="page">
		<h1 class="page__title">AnTab</h1>
		<p class="page__desc">
			Headless tab component with lazy rendering. Content is only created when the tab is first shown, then kept alive with <code>display: none</code>.
		</p>

		<div class="section">
			<h3 class="section__title">Props</h3>
			<table class="api-table">
				<thead><tr><th>Prop</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>show</code></td><td><code>boolean</code></td><td>Yes</td><td>Whether this tab is active</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Exposed</h3>
			<table class="api-table">
				<thead><tr><th>Method</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>reset()</code></td><td>Destroy the tab content (will re-create on next show)</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Behavior</h3>
			<p class="section__subtitle">
				On first activation, tab content is rendered into the DOM. When switching away, content is hidden
				via <code>display: none</code> (not destroyed). This preserves internal state like scroll position,
				form inputs, and component state. Call <code>reset()</code> to destroy and re-create.
			</p>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Tab navigation</h3>
			<p class="section__subtitle">Switch tabs. Open DevTools to see that inactive tabs use <code>display: none</code>, not conditional rendering.</p>

			<div class="demo">
				<div class="tabs-header">
					<button
						v-for="(tab, i) in tabs"
						:key="i"
						class="tabs-btn"
						:class="{ 'tabs-btn--active': activeTab === i }"
						@click="activeTab = i"
					>
						{{ tab.title }}
					</button>
				</div>

				<AnTab
					v-for="(tab, i) in tabs"
					:key="i"
					:ref="(el: any) => tabRefs[i] = el"
					:show="activeTab === i"
				>
					<div class="tab-content">
						<TabLogger :name="tab.title" />
						<h4>{{ tab.title }}</h4>
						<p>{{ tab.content }}</p>
						<input class="input" :placeholder="`Type in ${tab.title} tab...`" style="margin-top: 12px; width: 300px" />
						<p style="font-size: 12px; color: #6c7293; margin-top: 8px">
							Input value persists when switching tabs (DOM is preserved).
						</p>
					</div>
				</AnTab>

				<div style="display: flex; gap: 8px; margin-top: 12px">
					<button v-for="(tab, i) in tabs" :key="i" class="btn btn--secondary" @click="resetTab(i)">
						Reset "{{ tab.title }}"
					</button>
				</div>

				<div class="log-panel">
					<div class="log-panel__header">
						<span>Log</span>
						<button class="btn btn--secondary" style="padding: 2px 8px; font-size: 11px" @click="logs = []">Clear</button>
					</div>
					<div class="log-panel__body">
						<div v-if="!logs.length" class="log-panel__empty">Switch tabs to see init logs...</div>
						<div v-for="(entry, i) in logs" :key="i" class="log-panel__entry">{{ entry }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.tabs-header {
		display: flex;
		gap: 2px;
		border-bottom: 2px solid #e8eaed;
		margin-bottom: 16px;
	}
	.tabs-btn {
		padding: 10px 18px;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 14px;
		color: #6c7293;
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;
		transition: all 0.15s;
	}
	.tabs-btn:hover {
		color: #1a1a2e;
	}
	.tabs-btn--active {
		color: #7c83ff;
		border-bottom-color: #7c83ff;
		font-weight: 600;
	}
	.tab-content {
		padding: 4px 0;
	}
	.tab-content h4 {
		font-size: 16px;
		margin-bottom: 6px;
	}
	.tab-content p {
		font-size: 14px;
		color: #344054;
	}
	.log-panel {
		margin-top: 16px;
		border: 1px solid #e8eaed;
		border-radius: 8px;
		overflow: hidden;
		font-family: monospace;
		font-size: 12px;
	}
	.log-panel__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 12px;
		background: #f5f6fa;
		border-bottom: 1px solid #e8eaed;
		font-weight: 600;
		font-size: 12px;
		color: #6c7293;
	}
	.log-panel__body {
		padding: 8px 12px;
		max-height: 150px;
		overflow-y: auto;
	}
	.log-panel__empty {
		color: #b0b4c8;
		font-style: italic;
	}
	.log-panel__entry {
		padding: 2px 0;
		color: #344054;
	}
</style>
