import type { InitOptions } from 'i18next'
import type { ModuleOptions } from '../../module'


declare module 'nuxt/schema' {
	interface NuxtConfig {
		ancore?: ModuleOptions
	}

	interface RuntimeConfig {
	}

	interface PublicRuntimeConfig {
		i18n?: InitOptions<unknown> & {
			cookie?: string
			resources?: Record<string, { translation: Record<string, unknown> }>
		}
	}
}