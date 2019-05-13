<template>
	<v-toolbar app class="app-toolbar" dark>
		<v-toolbar-title>
			<v-avatar color="grey" :size="30">
				<img :src="user.avatar" alt="avatar">
			</v-avatar>
			{{user.name}}
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn flat></v-btn>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Header',
	computed: mapGetters(['user'])
  }
</script>

<style scoped>

</style>
