import type { TApi } from '@anweb/nuxt-ancore'

declare module '#app' {
	interface NuxtApp {
		$api: TApi
	}
}