<script setup lang="ts">
	interface TUser {
		id: string
		name: string
		info?: string
	}
	const user = useData<TUser>({ request: '/api/users/2' })
	const { t } = useI18n()
	await asyncInit(user.init)
</script>

<template>
	<div>
		<div>user: {{ user.data }}</div>

		<div>{{t('user', {count: 3})}}</div>

	</div>

</template>
<style scoped>

</style>