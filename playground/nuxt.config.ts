export default defineNuxtConfig({
	modules: ['../src/module'],
	ancore: {
		api: '~/utils/api'
	},
	devtools: { enabled: true },
})
