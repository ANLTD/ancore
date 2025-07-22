import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'


// TYPES
export interface ModuleOptions {
	api?: string
}


export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	defaults: {},
	async setup(_options, _nuxt) {
		const { resolve, resolvePath } = createResolver(import.meta.url)

		_nuxt.options.runtimeConfig.public = {}

		_nuxt.options.alias['#ancore/types'] = resolve('./runtime/types')
		if (_options.api) {
			_nuxt.options.alias['#ancore/customApi'] = await resolvePath(_options.api)
		}

		addImportsDir(resolve('./runtime/composables'))
		addImportsDir(resolve('./runtime/utils'))
	}
})
