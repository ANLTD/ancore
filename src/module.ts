import { addImportsDir, createResolver, defineNuxtModule, addPlugin, addComponentsDir } from '@nuxt/kit'
import { pathToFileURL } from 'node:url'
import { loadConfig } from 'c12'
import type { InitOptions } from 'i18next'
import type { PublicRuntimeConfig } from 'nuxt/schema'


// TYPES
export interface ModuleOptions {
	api?: string
	i18n?: InitOptions<unknown> & {
		cookie?: string
		resources?: Record<string, { translation: string | Record<string, unknown> }>
	}
}


// CONFIG HELPER
// Lets the config live in a standalone `ancore.config.ts` with full typings:
//   export default defineAnCoreConfig({ ... })
export const defineAnCoreConfig = (config: ModuleOptions): ModuleOptions => config


export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	defaults: {},
	async setup(_options, _nuxt) {
		const { resolve, resolvePath } = createResolver(import.meta.url)

		// CONFIG
		// Load an optional standalone `ancore.config.{ts,js,mjs,...}` from the project
		// root and merge it with the inline `ancore` key from nuxt.config.
		// Inline nuxt.config options win over the standalone file.
		const { config: fileConfig, configFile } = await loadConfig<ModuleOptions>({
			name: 'ancore',
			cwd: _nuxt.options.rootDir,
			overrides: _options,
		})
		const options: ModuleOptions = fileConfig ?? {}

		// Make the standalone config part of the app's TS program so any
		// `declare module '#ancore/types'` augmentations in it (e.g. event bus
		// channels) are picked up project-wide.
		if (configFile) {
			_nuxt.hook('prepare:types', ({ tsConfig }) => {
				tsConfig.include ||= []
				tsConfig.include.push(configFile)
			})
		}

		_nuxt.options.runtimeConfig.public = {
			..._nuxt.options.runtimeConfig.public,
			i18n: options.i18n as PublicRuntimeConfig['i18n']
		}

		// ALIASES
		_nuxt.options.alias['#ancore/types'] = resolve('./runtime/types')
		if (options.api) {
			_nuxt.options.alias['#ancore/customApi'] = await resolvePath(options.api)
		}

		// COMPONENTS
		addComponentsDir({
			path: resolve('./runtime/components')
		})

		// COMPOSABLES
		addImportsDir(resolve('./runtime/composables'))

		// UTILS
		addImportsDir(resolve('./runtime/utils'))

		// I18N
		if (options.i18n) {
			for (const lng in options.i18n.resources) {
				if (!options.i18n.resources[lng]) continue
				const path = await resolvePath(options.i18n.resources[lng].translation as string)
				const fileUrl = pathToFileURL(path).href
				options.i18n.resources[lng].translation = structuredClone((await import(fileUrl, { assert: { type: 'json' } })).default) as Record<string, unknown>
			}

			addPlugin(resolve('./runtime/plugins/i18n'))
		}
	}
})