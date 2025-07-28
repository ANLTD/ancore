export default defineNuxtConfig({
	modules: ['../src/module'],
	ancore: {
		api: '~/utils/api',
		i18n: {
			lng: 'en',
			fallbackLng: 'en',
			supportedLngs: ['en'],
			resources: {
				en: {
					translation: '~~/locales/en.json'
				}
			}
		}
	},
	devtools: { enabled: true },
})
