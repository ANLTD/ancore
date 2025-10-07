import i18next from 'i18next'
import { defineNuxtPlugin, useRuntimeConfig, useCookie } from '#app'


export default defineNuxtPlugin(async () => {
	const config = { ...useRuntimeConfig().public.i18n }
	if (!config) return

	if (config.cookie) {
		config.lng = useCookie(config.cookie).value || config.lng
		delete config.cookie
	}

	await i18next.init(config)
})