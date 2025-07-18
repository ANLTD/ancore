import type { TApi } from '#ancore/utils'

declare module '#app' {
	interface NuxtApp {
		$api: TApi
	}
}