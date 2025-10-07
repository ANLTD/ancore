import type { InitOptions } from 'i18next'
import type { ModuleOptions } from '../../module'
import type { TApi } from '#ancore/types'


declare module 'nuxt/schema' {
	interface NuxtConfig {
		ancore?: ModuleOptions
	}

	interface RuntimeConfig {
	}

	interface PublicRuntimeConfig {
		i18n?: InitOptions<unknown> & {
			cookie?: string
		}
	}
}

declare module '#ancore/customApi' {
	export const api: TApi
}