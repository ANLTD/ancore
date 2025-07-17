<template>
  <div>
    Nuxt module playground!<br>
	  user: {{ user.data }}
  </div>
</template>

<script setup lang="ts">
	// TYPES

	interface TUser {
		id: string
		name: string
	}

	// DATA
	const user = useData<TUser>({ request: '/api/users/2' })


	// INIT
	await user.init()

	const a = user.data
</script>
