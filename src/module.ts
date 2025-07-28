import { addImportsDir, createResolver, defineNuxtModule, addPlugin, addComponentsDir } from '@nuxt/kit'
import type { InitOptions } from 'i18next'
import { pathToFileURL } from 'node:url'


// TYPES
export interface ModuleOptions {
	api?: string
	i18n?: InitOptions<unknown>
}


export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	defaults: {},
	async setup(_options, _nuxt) {
		const { resolve, resolvePath } = createResolver(import.meta.url)

		// CONFIG
		_nuxt.options.runtimeConfig.public = {
			i18n: _options.i18n
		}

		// ALIASES
		_nuxt.options.alias['#ancore/types'] = resolve('./runtime/types')
		if (_options.api) {
			_nuxt.options.alias['#ancore/customApi'] = await resolvePath(_options.api)
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
		if (_options.i18n) {
			for (const lng in _options.i18n.resources) {
				if (!_options.i18n.resources[lng]) continue
				const path = await resolvePath(_options.i18n.resources[lng].translation as string)
				const fileUrl = pathToFileURL(path).href
				_options.i18n.resources[lng].translation = structuredClone((await import(fileUrl, { assert: { type: 'json' } })).default)
			}

			addPlugin(resolve('./runtime/plugins/i18n'))
		}
	}
})
