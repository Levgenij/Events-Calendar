<template>
	<v-content>
		<v-container fluid fill-height text-xs-center class="background">
			<v-layout align-center>
				<v-flex offset-md1 xs12 sm6 md6>
					<p class="display-3 font-weight-thin">Welcome to event management app</p>
					<p class="headline font-weight-thin">We will help <strong>quickly</strong> and <strong>efficiently</strong> manage your calendar events.</p>
					<p class="font-weight-light text-lg-justify text-sm-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cupiditate dolorem dolores earum eligendi error eveniet illum maxime mollitia necessitatibus nobis numquam, quas quo ratione repellat reprehenderit totam unde ut vel, voluptas? Aperiam assumenda doloremque error facere nam officia quas quasi quod repudiandae vero. Beatae dolores eos minus necessitatibus nemo quidem similique sint voluptates. Adipisci architecto asperiores beatae commodi consectetur consequuntur debitis enim in itaque laudantium maiores modi nam nulla numquam odit perspiciatis possimus quae quasi repellat repellendus sapiente, sequi tempora tempore veniam veritatis vitae voluptates! Asperiores doloremque ducimus eligendi enim fugit ipsam minima, mollitia necessitatibus, quaerat rem sapiente sunt.</p>
				</v-flex>
				<v-flex xs12 sm8 md4>
					<v-btn large color="primary" :loading="isLoading" @click="onLoginClickListener">
						sign in with google account
						<v-icon right>account_circle</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
  import {signInRequest} from '../../api/auth'
  import {setAccessToken} from '../../util/axios'
  import {mapMutations} from 'vuex'
  import {types} from '../../store/user'

  export default {
    name: 'Login',
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      ...mapMutations({
        setUser: types.SET_USER
      }),

      /**
       * Login user
       */
      async onLoginClickListener() {
        const code = await this.$gAuth.getAuthCode()

        this.isLoading = true

        const response = await signInRequest(code, window.location.origin)

        this.isLoading = false

        if (response && response.status === 200) {
          this.handleResponse(response)
        }
      },

      /**
       * Handle login response
       * @param response
       */
      handleResponse(response) {
        const accessToken = response.data.meta.token
        const user = response.data.data

        setAccessToken('Bearer', accessToken)

        this.setUser(user)

        this.$ls.set('user', user)
        this.$ls.set('access_token', accessToken)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
	.background {

	}
</style>
