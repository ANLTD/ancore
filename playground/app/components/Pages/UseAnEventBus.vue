<script setup lang="ts">
	// Predefined channel (typed in ancore.config.ts) — event is 'light' | 'dark'
	const theme = useAnEventBus('theme:toggle')
	// Predefined channel with payload
	const notify = useAnEventBus('notify')
	// Local channel — types passed explicitly
	const counter = useAnEventBus<number>('local:counter')

	const log = ref<string[]>([])
	const count = ref(0)

	onMounted(() => {
		theme.on(value => log.value.unshift(`theme:toggle → ${value}`))
		notify.on((message, payload) => log.value.unshift(`notify → "${message}" (${payload?.type})`))
		counter.on(value => log.value.unshift(`local:counter → ${value}`))
	})

	const emitTheme = () => theme.emit(Math.random() > 0.5 ? 'dark' : 'light')
	const emitNotify = () => notify.emit('Saved successfully', { type: 'info' })
	const emitCounter = () => counter.emit(++count.value)
</script>

<template>
	<div class="page">
		<h1 class="page__title">useAnEventBus</h1>
		<p class="page__desc">
			SSR-safe wrapper around VueUse <code>useEventBus</code>. Listeners are only registered on the
			client (the bus registry is a server-side singleton, so subscribing during SSR leaks listeners
			across requests). Channels can be predefined with types in <code>ancore.config.ts</code> or
			typed locally.
		</p>

		<div class="section">
			<h3 class="section__title">Signature</h3>
			<table class="api-table">
				<thead><tr><th>Usage</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>useAnEventBus('channel')</code></td><td>Channel predefined in <code>AnEventBusChannels</code> — types inferred</td></tr>
					<tr><td><code>useAnEventBus&lt;T, P&gt;('channel')</code></td><td>Local channel — event/payload types passed explicitly</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Predefine channels (ancore.config.ts)</h3>
			<pre class="code">declare module '#ancore/types' {
  interface AnEventBusChannels {
    'theme:toggle': 'light' | 'dark'
    'notify': { event: string, payload: { type: 'info' | 'error' } }
  }
}</pre>
		</div>

		<div class="section">
			<h3 class="section__title">Demo</h3>
			<div class="demo">
				<button class="btn btn--primary" @click="emitTheme">emit theme:toggle</button>
				<button class="btn btn--secondary" @click="emitNotify">emit notify</button>
				<button class="btn btn--secondary" @click="emitCounter">emit local:counter</button>

				<div style="margin-top: 16px">
					<div v-if="!log.length" class="status-bar">No events yet — emit something above.</div>
					<div v-for="(line, i) in log" :key="i" class="status-bar" style="margin-bottom: 4px">
						<span class="tag tag--info">event</span> {{ line }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.code {
		background: #1a1a2e;
		color: #d4d6e0;
		padding: 16px;
		border-radius: 8px;
		font-size: 12px;
		line-height: 1.5;
		overflow-x: auto;
	}
</style>