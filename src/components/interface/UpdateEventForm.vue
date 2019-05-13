<template>
	<v-card>
		<v-progress-linear v-show="isLoading" :indeterminate="true" height="2" class="ma-0" :active="isLoading"></v-progress-linear>
		<v-toolbar color="info" dark>
			<v-toolbar-title>
				<v-icon>calendar_today</v-icon>
				Update Event
			</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<form>
				<v-text-field
						v-model="event.title"
						:error-messages="errors.collect('title')"
						:counter="30"
						v-validate="'required|min:3|max:30'"
						label="Title"
						name="title"
				></v-text-field>
				<v-layout>
					<v-flex xs6>
						<div>
							<datetime type="datetime" v-model="event.start_at"></datetime>
						</div>
					</v-flex>
					<v-flex xs6	>
						<datetime type="datetime" v-model="event.end_at"></datetime>
					</v-flex>
				</v-layout>
				<v-textarea
						v-model="event.description"
						:error-messages="errors.collect('description')"
						:counter="1000"
						v-validate="'max:1000'"
						name="description"
						label="Description"></v-textarea>
				<v-btn color="success" :loading="isLoading" @click="oUpdateEventClickListener">
					Save
				</v-btn>
			</form>
		</v-card-text>
	</v-card>
</template>

<script>
  import {updateEventRequest} from '../../api/event'
  import {log, fetchData, momentize} from '../../util/helpers'

  export default {
    name: 'UpdateEventForm',
	props: {
      value: Object,
	},
    data () {
      return {
        isLoading: false,
        event: null
      }
    },
    methods: {
      /**
       * Fires when user click on create button
       *
       * @return {Promise<void>}
       */
      async oUpdateEventClickListener () {
        const valid = await this.$validator.validate()

        if (!valid) return

        const response = await updateEventRequest(this.event.id, this.event).catch(log)

        if (response && response.data) {
          const event = momentize(fetchData(response), ['start_at', 'end_at'])

          this.$emit('input', event)

          setTimeout(() => {
            this.errors.clear()
          }, 100)
        }
      }
    },
	watch: {
      value: {
        immediate: true,
		handler (value) {
          this.event = Object.assign({}, value)

          // Transform timestamps back to string since datepicker 'eats' strings
          this.event.start_at = this.event.start_at.format()
          this.event.end_at= this.event.end_at.format()
		}
      }
	}
  }
</script>

<style scoped>

</style>
