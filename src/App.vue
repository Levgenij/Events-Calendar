<template>
	<v-app>
		<router-view name="header"/>
		<router-view name="sidebar"/>
		<router-view/>
	</v-app>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  import {types as userTypes} from './store/user'
  import {setAccessToken} from './util/axios'
  import {log} from './util/helpers'

  export default {
    name: 'App',
    created () {
      try {
        this.init()
      } catch (e) {
        log(e)
        return this.$router.push({name: 'login'})
      }
    },
    methods: {
      ...mapMutations({
        setUser: userTypes.SET_USER,
      }),

      ...mapActions(['initializeSettings']),

      /**
       * Initialize app
       */
      init () {
        // set user from local storage
        const cachedUser = this.$ls.get('user')

        if (!cachedUser) {
          throw new Error('No user to parse')
        }

        this.setUser(cachedUser)

        const cachedToken = this.$ls.get('access_token')

        if (!cachedToken) {
          throw new Error('Unauthorized')
        }

        setAccessToken('Bearer', cachedToken)
      }
    }
  }
</script>
