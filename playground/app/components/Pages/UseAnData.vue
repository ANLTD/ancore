<script setup lang="ts">
	interface TUser {
		id: number
		name: string
	}

	const User = useAnData<TUser>({
		request: '/api/users/:id',
		params: { id: 1 }
	})

	asyncInit(() => User.init())
</script>

<template>
	<div class="page">
		<h1 class="page__title">useAnData</h1>
		<p class="page__desc">
			Reactive data fetching composable with SSR/CSR support, dynamic URL params, query strings, and auto-refresh.
		</p>

		<!-- API Reference -->
		<div class="section">
			<h3 class="section__title">Input (Config)</h3>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>request</code></td><td><code>NitroFetchRequest</code></td><td>API endpoint. Supports <code>:param</code> placeholders</td></tr>
					<tr><td><code>apiConfig</code></td><td><code>NitroFetchOptions</code></td><td>Fetch options: method, query, headers, etc.</td></tr>
					<tr><td><code>params</code></td><td><code>Record&lt;string, unknown&gt;</code></td><td>URL parameters for <code>:param</code> replacement</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Output (Return)</h3>
			<table class="api-table">
				<thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>data</code></td><td><code>ComputedRef&lt;TData&gt;</code></td><td>Response data (read-only)</td></tr>
					<tr><td><code>status</code></td><td><code>ComputedRef&lt;AsyncDataRequestStatus&gt;</code></td><td>idle | pending | success | error</td></tr>
					<tr><td><code>loading</code></td><td><code>ComputedRef&lt;boolean&gt;</code></td><td>true when status is pending</td></tr>
					<tr><td><code>error</code></td><td><code>ComputedRef&lt;TError&gt;</code></td><td>Error object if request failed</td></tr>
					<tr><td><code>init()</code></td><td><code>() => Promise&lt;void&gt;</code></td><td>Start data fetching (SSR-aware)</td></tr>
					<tr><td><code>set(data)</code></td><td><code>(data: TData) => void</code></td><td>Manually set data value</td></tr>
					<tr><td><code>refresh()</code></td><td><code>() => void</code></td><td>Re-fetch data (updates cache key)</td></tr>
					<tr><td><code>config</code></td><td><code>Ref&lt;TConfig&gt;</code></td><td>Reactive config (editable)</td></tr>
					<tr><td><code>params</code></td><td><code>Record&lt;string, unknown&gt;</code></td><td>URL params reference</td></tr>
				</tbody>
			</table>
		</div>

		<!-- Example: Basic fetch with dynamic param -->
		<div class="section">
			<h3 class="section__title">Example: Fetch user by ID</h3>
			<p class="section__subtitle">Dynamic URL param <code>:id</code> is replaced reactively. Change the ID to re-fetch.</p>

			<div class="demo">
				<div class="status-bar">
					<span class="tag" :class="{
						'tag--info': User.status.value === 'idle',
						'tag--warning': User.status.value === 'pending',
						'tag--success': User.status.value === 'success',
						'tag--error': User.status.value === 'error',
					}">{{ User.status.value }}</span>
					<span v-if="User.loading.value">Loading...</span>
				</div>

				<div class="field">
					<label class="field__label">User ID</label>
					<input v-model.number="User.params.id" type="number" min="1" max="60" class="input" style="width: 120px" />
				</div>

				<div v-if="User.data.value" style="margin-top: 12px">
					<strong>Response:</strong>
					<pre style="background: #f4f5f7; padding: 12px; border-radius: 6px; font-size: 13px; margin-top: 4px">{{ JSON.stringify(User.data.value, null, 2) }}</pre>
				</div>

				<div style="margin-top: 12px">
					<button class="btn btn--primary" @click="User.refresh()">Refresh</button>
					<button class="btn btn--secondary" @click="User.set({ id: 999, name: 'Manual' })">Set manually</button>
				</div>
			</div>
		</div>
	</div>
</template>