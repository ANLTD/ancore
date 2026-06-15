import { defineAnCoreConfig } from '../src/module'


// Predefine the globally-known event bus channels and their types.
// Channels declared here are fully typed in `useAnEventBus('...')` everywhere.
declare module '#ancore/types' {
	interface AnEventBusChannels {
		// bare form — only the event type
		'theme:toggle': 'light' | 'dark'
		// descriptor form — event + payload
		'notify': { event: string, payload: { type: 'info' | 'error' } }
	}
}


export default defineAnCoreConfig({
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
})