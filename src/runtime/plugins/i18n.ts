import i18next, { type i18n } from 'i18next'
import { defineNuxtPlugin, useRuntimeConfig, useCookie, useState } from '#app'


let base: Promise<i18n> | undefined

const createBase = async (options: object) => {
	const instance = i18next.createInstance()
	await instance.init(JSON.parse(JSON.stringify(options)))
	return instance
}


export default defineNuxtPlugin<{ anI18n: i18n }>(async () => {
	const { cookie, ...options } = { ...useRuntimeConfig().public.i18n }
	const lng = (cookie && useCookie(cookie).value) || options.lng

	base ??= createBase(options)
	const instance = (await base).cloneInstance({ lng })
	await instance.changeLanguage(lng)

	const lang = useState<string>('an-i18n-lang')
	lang.value = instance.language
	instance.on('languageChanged', (value) => {
		lang.value = value
	})

	return {
		provide: {
			anI18n: instance
		}
	}
})