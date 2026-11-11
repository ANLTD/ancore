import i18next, { type i18n as I18n } from 'i18next'
import { computed } from 'vue'
import { useNuxtApp, useRuntimeConfig, useCookie, useState } from '#app'
import { fnv1a } from '#imports'


export const useAnI18n = (resources?: Record<string, Record<string, string>>) => {
	// DATA
	const i18n = (useNuxtApp().$anI18n as I18n | undefined) ?? i18next
	const lang = useState<string>('an-i18n-lang', () => i18n.language)


	// METHODS
	const set = (value: string) => {
		try {
			i18n.changeLanguage(value)

			const config = useRuntimeConfig().public.i18n
			if (config?.cookie) {
				const cookie = useCookie(config?.cookie, {
					maxAge: 60 * 60 * 24 * 365,
					path: '/',
					sameSite: 'lax',
					secure: true
				})
				cookie.value = value
			}
		} catch (e) {
			console.error('[AnI18n] Failed to set language:', e)
		}
	}


	// COMPUTED
	const langReadonly = computed(() => lang.value)


	// INIT
	if (resources) {
		const ns = `c${fnv1a(JSON.stringify(resources))}`
		for (const l in resources) {
			if (!i18n.hasResourceBundle(l, ns)) {
				try {
					i18n.addResourceBundle(l, ns, resources[l])
				} catch (e) {
					console.error(`[AnI18n] Failed to add resource bundle for ${l}:`, e)
				}
			}
		}

		return {
			t: (key: string, options = {}) => i18n.t(key, { ns: [ns, 'translation'], ...options }),
			lang: langReadonly,
			set
		}
	}

	return {
		t: i18n.t,
		lang: langReadonly,
		set
	}
}