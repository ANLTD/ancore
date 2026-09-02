export default defineNuxtConfig({
	compatibilityDate: '2025-09-05',
	modules: ['../src/module'],
	// Ancore options live in `ancore.config.ts`.
	// Anything set here under `ancore` would override that file.
	devtools: { enabled: true },
})
