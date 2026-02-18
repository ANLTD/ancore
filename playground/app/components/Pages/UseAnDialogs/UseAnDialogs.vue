<script setup lang="ts">
	import ExampleDialog from './ExampleDialog.vue'
	import FullscreenDialog from './FullscreenDialog.vue'

	const Dialogs = useAnDialogs()

	const openBasic = () => {
		Dialogs.open(ExampleDialog, {
			title: 'Hello!',
			message: 'This is a basic dialog opened via useAnDialogs.open()',
		})
	}

	const openWithCallback = () => {
		Dialogs.open(ExampleDialog, {
			title: 'With onClose',
			message: 'Close this dialog to see the callback fire.',
		}, {
			onClose: () => alert('onClose callback fired!'),
		})
	}

	const openFullscreen = () => {
		Dialogs.open(FullscreenDialog, {
			color: '#1a1a2e',
		}, {
			fullscreen: true,
		})
	}

	const openMultiple = () => {
		Dialogs.open(ExampleDialog, { title: 'Dialog 1', message: 'First dialog' })
		Dialogs.open(ExampleDialog, { title: 'Dialog 2', message: 'Second dialog (stacked)' })
	}
</script>

<template>
	<div class="page">
		<h1 class="page__title">useAnDialogs</h1>
		<p class="page__desc">
			Dynamic dialog management. Open any component as a dialog with params, config, and lifecycle callbacks.
		</p>

		<!-- AnDialogs component -->
		<div class="section">
			<h3 class="section__title">AnDialogs component</h3>
			<p class="section__subtitle">
				Add <code>&lt;AnDialogs /&gt;</code> to your <code>app.vue</code> template once.
				Handles scroll lock, transitions, swipe-to-dismiss, and click-outside.
			</p>
			<table class="api-table">
				<thead><tr><th>Feature</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td>Scroll lock</td><td>Body scroll is locked when any dialog is open</td></tr>
					<tr><td>Transition</td><td>Animated enter/leave via <code>transition-group</code></td></tr>
					<tr><td>Stacking</td><td>Multiple dialogs can be open simultaneously</td></tr>
					<tr><td>Click outside</td><td>Non-fullscreen dialogs close on backdrop click</td></tr>
					<tr><td>Swipe down</td><td>Mobile swipe-to-dismiss gesture on non-fullscreen dialogs</td></tr>
					<tr><td>ARIA</td><td><code>role="dialog"</code>, <code>aria-modal="true"</code>, <code>aria-live="polite"</code></td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">CSS Variables</h3>
			<table class="api-table">
				<thead><tr><th>Variable</th><th>Default</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>--an-dialogs-background</code></td><td><code>rgba(0,0,0,0.3)</code></td><td>Backdrop background</td></tr>
					<tr><td><code>--an-dialogs-close</code></td><td><code>rgba(0,0,0,0.5)</code></td><td>Swipe indicator color</td></tr>
					<tr><td><code>--an-dialogs-backdrop-filter</code></td><td><code>blur(6px)</code></td><td>Backdrop blur</td></tr>
				</tbody>
			</table>
		</div>

		<!-- Composable API -->
		<div class="section">
			<h3 class="section__title">API</h3>
			<table class="api-table">
				<thead><tr><th>Method</th><th>Signature</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>open</code></td><td><code>(component, params?, config?) => TDialog</code></td><td>Open a dialog, returns dialog instance</td></tr>
					<tr><td><code>close</code></td><td><code>(dialog: TDialog) => void</code></td><td>Close specific dialog</td></tr>
					<tr><td><code>closeAll</code></td><td><code>() => void</code></td><td>Close all open dialogs</td></tr>
					<tr><td><code>items</code></td><td><code>TDialog[]</code></td><td>Current open dialogs array</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">TDialog config</h3>
			<table class="api-table">
				<thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>fullscreen</code></td><td><code>boolean</code></td><td>Take entire screen</td></tr>
					<tr><td><code>class</code></td><td><code>string</code></td><td>Custom CSS class</td></tr>
					<tr><td><code>onClose</code></td><td><code>() => void</code></td><td>Callback when dialog closes</td></tr>
				</tbody>
			</table>
		</div>

		<!-- Dialog component contract -->
		<div class="section">
			<h3 class="section__title">Dialog component contract</h3>
			<p class="section__subtitle">Each dialog component receives:</p>
			<table class="api-table">
				<thead><tr><th>Prop</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>params</code></td><td>The params passed to <code>Dialogs.open(component, params)</code></td></tr>
				</tbody>
			</table>
			<p class="section__subtitle" style="margin-top: 8px">
				Emit <code>@close</code> from your dialog component to close it.
				Optionally expose <code>config</code> to override TDialog props from inside the dialog.
			</p>
		</div>

		<!-- Examples -->
		<div class="section">
			<h3 class="section__title">Examples</h3>
			<div class="demo">
				<div class="status-bar">
					<span>Open dialogs: <strong>{{ Dialogs.items.length }}</strong></span>
				</div>

				<div style="display: flex; flex-wrap: wrap; gap: 8px">
					<button class="btn btn--primary" @click="openBasic">Open basic dialog</button>
					<button class="btn btn--primary" @click="openWithCallback">With onClose callback</button>
					<button class="btn btn--primary" @click="openFullscreen">Fullscreen dialog</button>
					<button class="btn btn--primary" @click="openMultiple">Open 2 stacked</button>
					<button class="btn btn--danger" @click="Dialogs.closeAll()" :disabled="!Dialogs.items.length">Close all</button>
				</div>

			</div>
		</div>
	</div>
</template>
