import { defineNuxtModule, addPlugin, createResolver, addImports, resolveAlias } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'AnCore',
		configKey: 'ancore',
	},
	// Default configuration options of the Nuxt module
	defaults: {},
	setup(_options, _nuxt) {
		const resolver = createResolver(import.meta.url)

		addImports({
			name: 'api',
			from: resolver.resolve('runtime/utils/api')
		})
	}
})
