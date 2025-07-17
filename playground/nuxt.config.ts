import { fileURLToPath } from 'node:url'


export default defineNuxtConfig({
	modules: ['../src/module'],
	alias: {
		'@anweb/nuxt-ancore': fileURLToPath(new URL('../src/index.ts', import.meta.url))
	},
	ancore: {
		apiPath: './utils/ee'
	},
	devtools: { enabled: true },
})
