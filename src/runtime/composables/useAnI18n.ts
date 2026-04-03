import i18next from 'i18next'
import { ref, computed } from 'vue'
import { useRuntimeConfig, useCookie } from '#app'
import { fnv1a } from '#imports'


// DATA
const lang = ref(i18next.language)


export const useAnI18n = (resources?: Record<string, Record<string, string>>) => {
	// METHODS
	const set = (value: string) => {
		try {
			i18next.changeLanguage(value)
			lang.value = value

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
			if (!i18next.hasResourceBundle(l, ns)) {
				try {
					i18next.addResourceBundle(l, ns, resources[l])
				} catch (e) {
					console.error(`[AnI18n] Failed to add resource bundle for ${l}:`, e)
				}
			}
		}

		const nsRef = ns
		return {
			t: (key: string, options = {}) => i18next.t(key, { ns: [nsRef, 'translation'], ...options }),
			lang: langReadonly,
			set
		}
	}

	return {
		t: i18next.t,
		lang: langReadonly,
		set
	}
}