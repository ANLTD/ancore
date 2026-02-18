export default defineNuxtConfig({
	compatibilityDate: '2025-09-05',
	modules: ['../src/module'],
	ancore: {
		api: '~/utils/api',
		i18n: {
			lng: 'en',
			fallbackLng: 'en',
			cookie: 'test-lang',
			supportedLngs: ['en', 'ja'],
			resources: {
				en: {
					translation: '~~/locales/en.json'
				},
				ja: {
					translation: '~~/locales/ja.json'
				}
			}
		}
	},
	devtools: { enabled: true },
})
