import i18next from 'i18next'
import { ref, computed } from 'vue'
import { useRuntimeConfig, useCookie } from '#app'

// DATA
const nsMap = new WeakMap<object, string>()
let nsId = 0
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
		let ns = nsMap.get(resources)
		if (!ns) {
			ns = `c${nsId++}`
			nsMap.set(resources, ns)
			for (const l in resources) {
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
			set,
		}
	}

	return {
		t: i18next.t,
		lang: langReadonly,
		set,
	}
}