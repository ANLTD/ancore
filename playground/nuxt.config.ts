export default defineNuxtConfig({
	compatibilityDate: '2025-09-05',
	modules: ['../src/module'],
	ancore: {
		api: '~/utils/api',
		i18n: {
			lng: 'en',
			fallbackLng: 'en',
			cookie: 'test-lang',
			supportedLngs: ['en', 'ru'],
			resources: {
				en: {
					translation: '~~/locales/en.json'
				},
				ru: {
					translation: '~~/locales/ru.json'
				}
			}
		}
	},
	devtools: { enabled: true },
})
