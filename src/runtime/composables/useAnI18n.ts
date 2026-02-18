import i18next from 'i18next'
import { useRuntimeConfig, useCookie } from '#app'


export const useAnI18n = (resources?: Record<string, Record<string, string>>) => {
	const returnObj = {
		lang: i18next.language,
		set: (lang: string) => {
			try {
				i18next.changeLanguage(lang)
				returnObj.lang = lang

				const config = useRuntimeConfig().public.i18n
				if (config?.cookie) {
					const cookie = useCookie(config?.cookie, {
						maxAge: 60 * 60 * 24 * 365,
						path: '/',
						sameSite: 'lax',
						secure: true
					})
					cookie.value = lang
				}
			} catch (e) {
				console.error('[AnI18n] Failed to set language:', e)
			}
		}
	}
	if (!resources) return { t: i18next.t, ...returnObj}

	const ns = JSON.stringify(resources)

	for (const lang in resources) {
		try {
			if (!i18next.hasResourceBundle(lang, ns)) {
				i18next.addResourceBundle(lang, ns, resources[lang])
			}
		} catch (e) {
			console.error(`[AnI18n] Failed to add resource bundle for ${lang}:`, e)
		}
	}

	const t = (key: string, options = {}) => i18next.t(key, { ns: [ns, 'translation'], ...options })

	return { t, ...returnObj }
}