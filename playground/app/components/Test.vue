<script setup lang="ts">
	interface TUser {
		id: string
		name: string
		info?: string
	}
	const user = useAnData<TUser>({ request: '/api/users/:id', params: {id: 1} })
	const { t } = useAnI18n()
	await asyncInit(user.init)


	// METHODS
	const change = () => {
		user.params.id = 2
	}
</script>

<template>
	<div>
		<div @click="change">user: {{ user.data }}</div>

		<div>{{t('user', {count: 3})}}</div>

	</div>

</template>
<style scoped>

</style>