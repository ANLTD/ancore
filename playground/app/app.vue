<template>
  <div>
    Nuxt module playground!<br>
	  <input v-model="form.state.value.info" />
	  <div>{{  form.validator.errors.value?.info?.[0]?.message }}</div>

	  <div @click="show= true"> {{list.count.value}}</div>
	  <div> {{list.items}}</div>

	  <Test v-if="show" />

	  <div>{{t('GuideDashboard')}}</div>

	  <AnTab :show="true">
		  123
	  </AnTab>
	  <AnTab :show="false">
		  333
	  </AnTab>
  </div>
</template>

<script setup lang="ts">
	// TYPES
	interface TUser {
		id: string
		name: string
		info?: string
	}
	type TForm = Required<Pick<TUser, 'info'>>

	const resources = {
		en: {
			GuideDashboard: 'Guide Dashboard',
			TouristDashboard: 'Tourist Dashboard'
		}
	}
	const { t } = useAnI18n(resources, import.meta.url)

	// DATA
	const show = ref(false)
	const form = useAnForm<TForm>({
		rules: {
			info: {type: 'string', required: true, message: 'enter Info'},
		},
		empty: {
			info: ''
		}
	})
	const list = useAnList<TUser, {info: string}>({
		request: '/api/users',
		filter: {info: form.state.value.info}
	})


	watch(() => form.state.value.info, async () => {
		const valid = await form.validator.check()
		if (!valid.pass) return
		list.filter.value.info = form.state.value.info
	})


	// INIT
	await asyncInit(list.init)
</script>
