import i18next from 'i18next'


export default (resources?: Record<string, any>, ns?: string) => {
	if (!ns) return { t: i18next.t }

	for (const lang in resources) {
		if (!i18next.hasResourceBundle(lang, ns)) {
			i18next.addResourceBundle(lang, ns, resources[lang])
		}
	}

	const t = (key: string, options = {}) => i18next.t(key, { ns: [ns, 'translation'], ...options })

	return { t }
}