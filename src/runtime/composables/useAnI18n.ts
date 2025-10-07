import i18next from 'i18next'
import { useRuntimeConfig, useCookie } from '#app'


export const useAnI18n = (resources?: Record<string, any>) => {
	const returnObj = {
		lang: i18next.language,
		set: (lang: string) => {
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
		}
	}
	if (!resources) return { t: i18next.t, ...returnObj}

	const ns = JSON.stringify(resources)

	for (const lang in resources) {
		if (!i18next.hasResourceBundle(lang, ns)) {
			i18next.addResourceBundle(lang, ns, resources[lang])
		}
	}

	const t = (key: string, options = {}) => i18next.t(key, { ns: [ns, 'translation'], ...options })

	return { t, ...returnObj }
}