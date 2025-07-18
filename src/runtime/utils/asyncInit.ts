import { useNuxtApp } from '#app'


export const asyncInit = async (fInit: () => Promise<void>) => {
	const nuxtApp = useNuxtApp()

	if (!!nuxtApp.vueApp._instance?.isMounted) {
		void fInit()
	} else {
		await fInit()
	}
}