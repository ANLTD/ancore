<script setup lang="ts">
	interface TUser {
		id: string
		name: string
		info?: string
	}
	const user = useData<TUser>({ request: '/api/users/2' })
	await asyncInit(user.init)
</script>

<template>
	<div>
		user: {{ user.data }}

	</div>
</template>

<style scoped>

</style>