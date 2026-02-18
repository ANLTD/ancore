<script setup lang="ts">
</script>

<template>
	<div class="app">
		<AnDialogs />

		<aside class="sidebar">
			<h2 class="sidebar__title">AnCore</h2>
			<nav class="sidebar__nav">
				<NuxtLink to="/" class="sidebar__link">Home</NuxtLink>

				<span class="sidebar__group">Composables</span>
				<NuxtLink to="/use-an-data" class="sidebar__link">useAnData</NuxtLink>
				<NuxtLink to="/use-an-list" class="sidebar__link">useAnList</NuxtLink>
				<NuxtLink to="/use-an-form" class="sidebar__link">useAnForm</NuxtLink>
				<NuxtLink to="/use-an-dialogs" class="sidebar__link">useAnDialogs</NuxtLink>
				<NuxtLink to="/use-an-i18n" class="sidebar__link">useAnI18n</NuxtLink>

				<span class="sidebar__group">Components</span>
				<NuxtLink to="/an-dropdown" class="sidebar__link">AnDropdown</NuxtLink>
				<NuxtLink to="/an-tab" class="sidebar__link">AnTab</NuxtLink>

				<span class="sidebar__group">Utilities</span>
				<NuxtLink to="/utilities" class="sidebar__link">Utils</NuxtLink>
			</nav>
		</aside>

		<main class="main">
			<NuxtPage />
		</main>
	</div>
</template>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #1a1a2e;
		background: #f8f9fa;
	}
	.app {
		display: flex;
		min-height: 100vh;
	}
	.sidebar {
		width: 220px;
		background: #1a1a2e;
		color: #fff;
		padding: 24px 16px;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		overflow-y: auto;
	}
	.sidebar__title {
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 24px;
		color: #7c83ff;
	}
	.sidebar__nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.sidebar__group {
		font-size: 11px;
		text-transform: uppercase;
		color: #6c7293;
		margin-top: 16px;
		margin-bottom: 4px;
		letter-spacing: 0.5px;
		font-weight: 600;
	}
	.sidebar__link {
		color: #b4b6c4;
		text-decoration: none;
		padding: 6px 10px;
		border-radius: 6px;
		font-size: 14px;
		transition: all 0.15s;
	}
	.sidebar__link:hover {
		background: rgba(124, 131, 255, 0.15);
		color: #fff;
	}
	.sidebar__link.router-link-exact-active {
		background: rgba(124, 131, 255, 0.25);
		color: #7c83ff;
		font-weight: 600;
	}
	.main {
		flex: 1;
		margin-left: 220px;
		padding: 32px 40px;
	}
	.page {
		max-width: 860px;
	}
	.page__title {
		font-size: 28px;
		font-weight: 700;
		margin-bottom: 4px;
	}
	.page__desc {
		color: #6c7293;
		font-size: 15px;
		margin-bottom: 24px;
		line-height: 1.5;
	}
	.section {
		background: #fff;
		border: 1px solid #e8eaed;
		border-radius: 10px;
		padding: 20px 24px;
		margin-bottom: 16px;
	}
	.section__title {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 12px;
	}
	.section__subtitle {
		font-size: 13px;
		color: #6c7293;
		margin-bottom: 12px;
	}
	.api-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
		margin-bottom: 8px;
	}
	.api-table th {
		text-align: left;
		padding: 8px 12px;
		background: #f4f5f7;
		border-bottom: 1px solid #e8eaed;
		font-weight: 600;
		color: #6c7293;
		font-size: 11px;
		text-transform: uppercase;
	}
	.api-table td {
		padding: 8px 12px;
		border-bottom: 1px solid #f0f1f3;
		vertical-align: top;
	}
	.api-table code {
		background: #f0f1f3;
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 12px;
		color: #7c83ff;
	}
	.demo {
		background: #fafbfc;
		border: 1px dashed #d0d5dd;
		border-radius: 8px;
		padding: 16px;
		margin-top: 12px;
	}
	.btn {
		padding: 8px 16px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		transition: all 0.15s;
	}
	.btn--primary { background: #7c83ff; color: #fff; }
	.btn--primary:hover { background: #6269e0; }
	.btn--secondary { background: #e8eaed; color: #1a1a2e; }
	.btn--secondary:hover { background: #d0d5dd; }
	.btn--danger { background: #ff6b6b; color: #fff; }
	.btn--danger:hover { background: #e05555; }
	.btn + .btn { margin-left: 8px; }
	.tag {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 600;
	}
	.tag--success { background: #d4edda; color: #155724; }
	.tag--warning { background: #fff3cd; color: #856404; }
	.tag--error { background: #f8d7da; color: #721c24; }
	.tag--info { background: #d1ecf1; color: #0c5460; }
	.input {
		padding: 8px 12px;
		border: 1px solid #d0d5dd;
		border-radius: 6px;
		font-size: 14px;
		width: 100%;
		outline: none;
	}
	.input:focus { border-color: #7c83ff; }
	.input--error { border-color: #ff6b6b; }
	.error-text { color: #ff6b6b; font-size: 12px; margin-top: 4px; }
	.field { margin-bottom: 12px; }
	.field__label {
		display: block;
		font-size: 13px;
		font-weight: 500;
		margin-bottom: 4px;
		color: #344054;
	}
	.status-bar {
		display: flex;
		gap: 8px;
		align-items: center;
		font-size: 13px;
		color: #6c7293;
		margin-bottom: 12px;
	}
</style>
