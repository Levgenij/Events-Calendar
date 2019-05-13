<template>
	<v-card>
		<v-progress-linear v-show="isLoading" :indeterminate="true" height="2" class="ma-0" :active="isLoading"></v-progress-linear>
		<v-toolbar color="success" dark>
			<v-toolbar-title>
				<v-icon>calendar_today</v-icon>
				Create New Event
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
				<v-btn color="success" :loading="isLoading" @click="onCreateEventClickListener">
					Create
				</v-btn>
			</form>
		</v-card-text>
	</v-card>
</template>

<script>
  import moment from 'moment'
  import {createEventRequest} from '../../api/event'
  import {log, fetchData, momentize} from '../../util/helpers'

  export default {
    name: 'CreateEventForm',
	data () {
      return {
        isLoading: false,
		event: {
          title: null,
          description: null,
          start_at: moment().format(),
          end_at: moment().add(1, 'hours').format()
		}
      }
    },
	methods: {
      /**
	   * Fires when user click on create button
	   *
       * @return {Promise<void>}
       */
      async onCreateEventClickListener () {
        const valid = await this.$validator.validate()

		if (!valid) return

        this.isLoading = true

		const response = await createEventRequest(this.event).catch(log)

        this.isLoading = false

        if (response && response.status === 200) {
          const event = momentize(fetchData(response), ['start_at', 'end_at'])

          this.$emit('create', event)

          Object.assign(this.event, {
            title: null,
            description: null,
            start_at: moment().format(),
            end_at: moment().add(1, 'hours').format()
          })

          setTimeout(() => {
            this.errors.clear()
          }, 100)
		}
      }
	}
  }
</script>

<style scoped>

</style>
