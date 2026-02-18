<script setup lang="ts">
	const { t: tGlobal, lang, set } = useAnI18n()

	const { t: tLocal } = useAnI18n({
		en: { greeting: 'Hello, World!', description: 'This is a local translation' },
		ja: { greeting: 'こんにちは、世界！', description: 'これはローカル翻訳です' },
	})

	const currentLang = ref(lang)

	const switchLang = (lng: string) => {
		set(lng)
		currentLang.value = lng
	}
</script>

<template>
	<div class="page">
		<h1 class="page__title">useAnI18n</h1>
		<p class="page__desc">
			i18next integration with per-component namespaced translations, language switching via cookie, and SSR support.
		</p>

		<div class="section">
			<h3 class="section__title">Input</h3>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>resources</code></td><td><code>Record&lt;string, Record&lt;string, string&gt;&gt;</code></td><td>Optional per-component translations by language</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Output</h3>
			<table class="api-table">
				<thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>t</code></td><td><code>(key, options?) => string</code></td><td>Translation function (scoped or global)</td></tr>
					<tr><td><code>lang</code></td><td><code>string</code></td><td>Current language</td></tr>
					<tr><td><code>set</code></td><td><code>(lang: string) => void</code></td><td>Switch language (saves to cookie)</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Global translations</h3>
			<p class="section__subtitle">Global translations from <code>locales/en.json</code> and <code>locales/ja.json</code>. Uses i18next pluralization.</p>

			<div class="demo">
				<div class="status-bar">
					<span>Current language: <strong>{{ currentLang }}</strong></span>
					<button class="btn btn--secondary" @click="switchLang('en')">EN</button>
					<button class="btn btn--secondary" @click="switchLang('ja')">JA</button>
				</div>

				<div style="font-size: 14px; display: flex; flex-direction: column; gap: 6px">
					<div>1 user: <strong>{{ tGlobal('user', { count: 1 }) }}</strong></div>
					<div>5 users: <strong>{{ tGlobal('user', { count: 5 }) }}</strong></div>
					<div>42 users: <strong>{{ tGlobal('user', { count: 42 }) }}</strong></div>
				</div>
			</div>
		</div>

		<div class="section">
			<h3 class="section__title">Example: Per-component translations</h3>
			<p class="section__subtitle">
				Local translations registered inline. Each component gets its own namespace (no key collisions).
			</p>

			<div class="demo">
				<div style="font-size: 14px; display: flex; flex-direction: column; gap: 6px">
					<div>greeting: <strong>{{ tLocal('greeting') }}</strong></div>
					<div>description: <strong>{{ tLocal('description') }}</strong></div>
				</div>
			</div>
		</div>
	</div>
</template>
