<script setup lang="ts">
	const queryResult = ref('')
	const queryInput = ref({ search: 'hello', page: 2, empty: null })

	const computeQuery = () => {
		queryResult.value = toQuery(queryInput.value)
	}
</script>

<template>
	<div class="page">
		<h1 class="page__title">Utilities</h1>
		<p class="page__desc">
			Helper functions auto-imported from the module.
		</p>

		<!-- toQuery -->
		<div class="section">
			<h3 class="section__title">toQuery</h3>
			<p class="section__subtitle">
				Converts an object to a URL query string. Filters out <code>null</code>/<code>undefined</code> values.
				Encodes keys and values with <code>encodeURIComponent</code>.
			</p>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Returns</th></tr></thead>
				<tbody>
					<tr><td><code>params</code></td><td><code>object</code></td><td><code>string</code> (e.g. <code>search=hello&page=2</code>)</td></tr>
				</tbody>
			</table>

			<div class="demo">
				<div style="font-size: 13px; margin-bottom: 8px">
					Input: <code>{{ JSON.stringify(queryInput) }}</code>
				</div>
				<button class="btn btn--primary" @click="computeQuery">Run toQuery()</button>
				<div v-if="queryResult" style="margin-top: 8px">
					Output: <code>{{ queryResult }}</code>
				</div>
			</div>
		</div>

		<!-- asyncInit -->
		<div class="section">
			<h3 class="section__title">asyncInit</h3>
			<p class="section__subtitle">
				SSR-aware initialization helper. During SSR (before mount), awaits the init function for hydration.
				After mount (CSR navigation), fires it without await to avoid blocking.
			</p>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>fInit</code></td><td><code>() => Promise&lt;void&gt;</code></td><td>Async init function (e.g. <code>Data.init</code>)</td></tr>
				</tbody>
			</table>
			<div class="demo">
				<pre style="background: #f4f5f7; padding: 12px; border-radius: 6px; font-size: 13px">// SSR: awaits init (data available on first render)
// CSR: fires init without await (shows loading state)
asyncInit(() => UserData.init())</pre>
			</div>
		</div>

		<!-- coreApi -->
		<div class="section">
			<h3 class="section__title">coreApi</h3>
			<p class="section__subtitle">
				Core API wrapper around Nuxt's <code>$fetch</code>. Generic typed responses and errors.
				Used internally by <code>useAnData</code>.
			</p>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>request</code></td><td><code>NitroFetchRequest</code></td><td>API endpoint</td></tr>
					<tr><td><code>opts</code></td><td><code>NitroFetchOptions</code></td><td>Fetch options</td></tr>
				</tbody>
			</table>
			<table class="api-table" style="margin-top: 8px">
				<thead><tr><th>Returns</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>Promise&lt;TData&gt;</code></td><td>Typed response data</td></tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
