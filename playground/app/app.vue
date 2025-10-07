<script setup lang="ts">
	// TYPES
	interface TUser {
		id: string
		name: string
		info?: string
	}
	interface TForm {
		info: string
		text?: string
	}

	const resources = {
		en: {
			GuideDashboard: 'Guide Dashboard',
			TouristDashboard: 'Tourist Dashboard'
		},
		ru: {
			GuideDashboard: 'Гид: Главная',
			TouristDashboard: 'Турист: Главная'
		}
	}
	const { t, lang, set } = useAnI18n(resources)


	// DATA
	const show = ref(false)
	const form = useAnForm<TForm>({
		info: {
			default: '',
			rules: [
				{type: 'string', required: true, message: 'enter Info'}
			]
		},
		text: {
			default: ''
		}
	})
	const list = useAnList<TUser, {info: string}>({
		request: '/api/users',
		filter: {info: form.state.value.info},
		apiConfig: {
			onResponse: (ctx) => {
				const arr = ctx.response._data as object[]
				if (Array.isArray(arr)) {
					ctx.response._data = {
						items: arr,
						count: arr.length
					}
				}
			}
		}
	})

	const setLang = (lng: string) => {
		if (set) {
			set(lng)
			location.reload()
		}
	}


	watch(() => form.state.value.info, async () => {
		const valid = await form.validator.check()
		if (!valid.pass) return
		list.filter.info = form.state.value.info
	})

	list.filter.info = 'sdf'

	// INIT
	// onMounted(() => {
	// 	list.init()
	// })
	await asyncInit(list.init)
</script>


<template>
  <div>
    Nuxt module playground!<br>
	  <input v-model="form.state.value.info" /><button @click="form.history.commit">Commit</button><button @click="form.history.reset">Reset</button>
	  <div>isChanged: {{form.history.isChanged}}</div>
	  <div>valid: {{  form.validator.errors.value.info }}</div>

	  <div @click="show= true"> {{list.count.value}}</div>
	  <div> {{list.items}}</div>

	  <Test v-if="show" />

	  <div>{{t('GuideDashboard')}}</div>
	  <div>
		  language: {{ lang }} <a @click="setLang('en')">EN</a><a @click="setLang('ru')">RU</a>
	  </div>

	  <AnTab :show="true">
		  123
	  </AnTab>
	  <AnTab :show="false">
		  333
	  </AnTab>
  </div>
</template>