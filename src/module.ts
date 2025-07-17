import { addImports, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions } from './types'


export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	defaults: {},
	async setup(_options, _nuxt) {
		const { resolve } = createResolver(import.meta.url)

		_nuxt.options.runtimeConfig.public.ancore = {}

		addImportsDir(resolve('./runtime/composables'))
	}
})
