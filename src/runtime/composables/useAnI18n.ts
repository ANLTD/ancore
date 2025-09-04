import i18next from 'i18next'
import { getJSONHash } from '../utils'


export default async (resources?: Record<string, any>) => {
	if (!resources) return { t: i18next.t }

	const ns = await getJSONHash(resources)

	for (const lang in resources) {
		if (!i18next.hasResourceBundle(lang, ns)) {
			i18next.addResourceBundle(lang, ns, resources[lang])
		}
	}

	const t = (key: string, options = {}) => i18next.t(key, { ns: [ns, 'translation'], ...options })

	return { t }
}