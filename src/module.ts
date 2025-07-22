import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { TApi } from './runtime/types'


// TYPES
export interface ModuleOptions {
	api?: TApi
}


export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	defaults: {},
	async setup(_options, _nuxt) {
		const { resolve } = createResolver(import.meta.url)

		_nuxt.options.runtimeConfig.public.ancore = {
			api: _options.api
		}
		_nuxt.options.alias['#ancore/types'] = resolve('./runtime/types')

		addImportsDir(resolve('./runtime/composables'))
		addImportsDir(resolve('./runtime/utils'))
	}
})
