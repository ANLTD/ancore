import i18next from 'i18next'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'


export default defineNuxtPlugin(async () => {
	const config = useRuntimeConfig().public.i18n
	if (!config) return

	await i18next.init(config)
})