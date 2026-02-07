<script setup lang="ts">

</script>

<template>
  <div>
	  <div v-for="i in 40" :key="i">{{ i }}</div>
	  <AnDropdown class="button">
		  <template #button="{toggle}">
			  <div @click="toggle()">Button</div>
		  </template>

		  <template #menu="{ close }">
			  <div @click="close">menu</div>
		  </template>
	  </AnDropdown>

	  <div v-for="i in 100" :key="'k' + i">{{ i }}</div>
  </div>
</template>

<style>
	.button {
		display: inline-block;
		width: fit-content;
	}
</style>