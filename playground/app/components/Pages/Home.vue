<template>
	<div class="page">
		<h1 class="page__title">AnCore Playground</h1>
		<p class="page__desc">
			Interactive documentation and examples for all AnCore module features.
		</p>

		<div class="section">
			<h3 class="section__title">Composables</h3>
			<div class="home-grid">
				<NuxtLink to="/use-an-data" class="home-card">
					<strong>useAnData</strong>
					<span>Data fetching with SSR support, URL params, query, auto-refresh</span>
				</NuxtLink>
				<NuxtLink to="/use-an-list" class="home-card">
					<strong>useAnList</strong>
					<span>Paginated lists with infinite scroll, filters, reverse mode</span>
				</NuxtLink>
				<NuxtLink to="/use-an-form" class="home-card">
					<strong>useAnForm</strong>
					<span>Form state, validation (async-validator), history, diff tracking</span>
				</NuxtLink>
				<NuxtLink to="/use-an-dialogs" class="home-card">
					<strong>useAnDialogs</strong>
					<span>Dynamic dialogs: open, close, closeAll, swipe-to-dismiss</span>
				</NuxtLink>
				<NuxtLink to="/use-an-i18n" class="home-card">
					<strong>useAnI18n</strong>
					<span>i18next integration with per-component namespaces, lang switching</span>
				</NuxtLink>
			</div>
		</div>

		<div class="section">
			<h3 class="section__title">Components</h3>
			<div class="home-grid">
				<NuxtLink to="/an-dropdown" class="home-card">
					<strong>AnDropdown</strong>
					<span>Dropdown with CSS Anchor Positioning, teleport, ARIA</span>
				</NuxtLink>
				<NuxtLink to="/an-tab" class="home-card">
					<strong>AnTab</strong>
					<span>Headless tab component with lazy rendering and reset</span>
				</NuxtLink>
			</div>
		</div>

		<div class="section">
			<h3 class="section__title">Utilities</h3>
			<div class="home-grid">
				<NuxtLink to="/utilities" class="home-card">
					<strong>Utils</strong>
					<span>toQuery, asyncInit, coreApi</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.home-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 12px;
	}
	.home-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px 16px;
		border: 1px solid #e8eaed;
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: all 0.15s;
	}
	.home-card:hover {
		border-color: #7c83ff;
		background: #f8f8ff;
	}
	.home-card strong {
		font-size: 15px;
		color: #7c83ff;
	}
	.home-card span {
		font-size: 12px;
		color: #6c7293;
		line-height: 1.4;
	}
</style>
