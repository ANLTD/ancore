<script setup lang="ts">
	// TRANSLATE
	const translate = {
		en: {
			GuideDashboard: 'Guide Dashboard',
			TouristDashboard: 'Tourist Dashboard'
		},
		ru: {
			GuideDashboard: 'Гид: Главная',
			TouristDashboard: 'Турист: Главная'
		}
	}


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
	interface TFilter {
		info?: string
		limit?: number
		skip?: number
	}


	// USE
	const { t, lang, set } = useAnI18n(translate)


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
	const list = useAnList<TUser, TFilter>({
		request: '/api/users',
		filter: {info: form.state.value.info, limit: 5}
	})


	// METHODS
	const setLang = (lng: string) => {
		if (set) {
			set(lng)
			location.reload()
		}
	}


	// WATCHES
	watch(() => form.state.value.info, async () => {
		const valid = await form.validator.check()
		if (!valid.pass) return
		list.filter.info = form.state.value.info
		list.filter.skip = 0
	})


	// INIT
	list.filter.info = 'sdf'
	// onMounted(() => {
	// 	list.init()
	// })
	await asyncInit(list.init)
	list.infiniteScroll({
		options: {distance: 100}
	})
</script>

<template>
  <div>
    Nuxt module playground!<br>
	  <div>

	  <input v-model="form.state.value.info" />
		  <button @click="form.history.commit">Commit</button>
		  <button @click="form.history.reset">Reset</button>
		  <button @click="form.merge({info: 'tets'})">Merge</button>
	  </div>
	  <div>isChanged: {{form.history.isChanged}}</div>
	  <div>diff: {{form.diff.value}}</div>
	  <div>valid: {{  form.validator.errors.value.info }}</div>

	  <div @click="show= true"> {{list.count.value}}</div>
	  <div>
	  	<div v-for="item of list.items" :key="item.id">{{item}}</div>
	  </div>

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