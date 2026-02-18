<script setup lang="ts">
	interface TCity {
		id: number
		name: string
		country: string
	}
	interface TFilter {
		skip: number
		limit: number
		country: string
	}

	const scrollEl = ref<HTMLElement | null>(null)
	const countries = ['all', 'Japan', 'USA', 'France', 'England']

	const List = useAnList<TCity, TFilter>({
		request: '/api/cities',
		filter: { skip: 0, limit: 4, country: 'all' },
	})

	const setCountry = (country: string) => {
		List.filter.country = country
		List.filter.skip = 0
	}

	asyncInit(async () => {
		await List.init()
		List.infiniteScroll({
			element: scrollEl,
			options: { distance: 10 },
		})
	})
</script>

<template>
	<div class="page">
		<h1 class="page__title">useAnList</h1>
		<p class="page__desc">
			Paginated list composable with infinite scroll, filters, and reverse mode. Built on top of useAnData.
		</p>

		<div class="section">
			<h3 class="section__title">Input (Config)</h3>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>request</code></td><td><code>NitroFetchRequest</code></td><td>API endpoint</td></tr>
					<tr><td><code>filter</code></td><td><code>TFilter</code></td><td>Filter object sent as query params</td></tr>
					<tr><td><code>params</code></td><td><code>Record&lt;string, string&gt;</code></td><td>URL params for <code>:param</code></td></tr>
					<tr><td><code>skipField</code></td><td><code>string</code></td><td>Field name for offset (default: <code>skip</code>)</td></tr>
					<tr><td><code>reverse</code></td><td><code>boolean</code></td><td>Prepend items instead of append</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Output (Return)</h3>
			<table class="api-table">
				<thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>items</code></td><td><code>TData[]</code></td><td>Reactive array of loaded items</td></tr>
					<tr><td><code>count</code></td><td><code>Ref&lt;number | null&gt;</code></td><td>Total items count from server</td></tr>
					<tr><td><code>filter</code></td><td><code>TFilter</code></td><td>Current filter values</td></tr>
					<tr><td><code>inited</code></td><td><code>ComputedRef&lt;boolean&gt;</code></td><td>true after first fetch</td></tr>
					<tr><td><code>status</code></td><td><code>ComputedRef</code></td><td>idle | pending | success | error</td></tr>
					<tr><td><code>loading</code></td><td><code>ComputedRef&lt;boolean&gt;</code></td><td>true when fetching</td></tr>
					<tr><td><code>init()</code></td><td><code>() => Promise&lt;void&gt;</code></td><td>Initialize the list</td></tr>
					<tr><td><code>infiniteScroll()</code></td><td><code>(config?) => () => void</code></td><td>Attach infinite scroll, returns reset function</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Cities by country with infinite scroll</h3>
			<p class="section__subtitle">Filter by country, then scroll to load more. 40 cities across 4 countries.</p>

			<div class="demo">
				<div class="status-bar">
					<span class="tag" :class="{
						'tag--success': List.status.value === 'success',
						'tag--warning': List.status.value === 'pending',
					}">{{ List.status.value }}</span>
					<span>{{ List.items.length }} / {{ List.count ?? '?' }} cities</span>
				</div>

				<div style="display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap">
					<button
						v-for="c in countries"
						:key="c"
						class="btn"
						:class="List.filter.country === c ? 'btn--primary' : 'btn--secondary'"
						@click="setCountry(c)"
					>
						{{ c === 'all' ? 'All' : c }}
					</button>
				</div>

				<div ref="scrollEl" style="max-height: 300px; overflow-y: auto; border: 1px solid #e8eaed; border-radius: 6px">
					<div
						v-for="city in List.items"
						:key="city.id"
						style="padding: 10px 14px; border-bottom: 1px solid #f0f1f3; font-size: 13px; display: flex; justify-content: space-between"
					>
						<span>#{{ city.id }} {{ city.name }}</span>
						<span style="color: #6c7293">{{ city.country }}</span>
					</div>
					<div v-if="List.loading.value" style="padding: 12px; text-align: center; color: #6c7293; font-size: 13px">
						Loading more...
					</div>
					<div v-if="!List.loading.value && List.items.length === 0" style="padding: 12px; text-align: center; color: #6c7293; font-size: 13px">
						No cities found
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
