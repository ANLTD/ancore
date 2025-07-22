import { api } from './app/utils/api'


export default defineNuxtConfig({
	modules: ['../src/module'],
	ancore: {
		api: api
	},
	devtools: { enabled: true },
})
