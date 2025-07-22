import type { ModuleOptions } from '../../module'
import type { TApi } from '#ancore/types'


declare module 'nuxt/schema' {
	interface NuxtConfig {
		ancore?: ModuleOptions
	}

	interface RuntimeConfig {
	}

	interface PublicRuntimeConfig {
	}
}

declare module '#ancore/customApi' {
	export const api: TApi
}