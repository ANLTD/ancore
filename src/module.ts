import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'


// TYPES
export interface ModuleOptions {}


export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	defaults: {},
	async setup(_options, _nuxt) {
		const { resolve } = createResolver(import.meta.url)

		_nuxt.options.runtimeConfig.public.ancore = {}
		_nuxt.options.alias['#ancore/utils'] = resolve('./runtime/utils')
		_nuxt.options.alias['#ancore/types'] = resolve('./runtime/types')

		addImportsDir(resolve('./runtime/composables'))
	}
})
