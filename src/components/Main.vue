<template>
	<v-content>
		<v-container grid-list-md>
			<v-layout>
				<v-flex xs6>
					<events-data-list ref="eventsList" @select="onEventSelectListener"></events-data-list>
				</v-flex>
				<v-flex xs6>
					<create-event-form v-if="!selectedEvent" @create="onCreateEventListener"></create-event-form>
					<update-event-form
							v-else=""
							v-model="selectedEvent"
							@delete="onDeleteEventListener"
							@input="onSaveEventListener"></update-event-form>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
  import EventsDataList from './interface/EventsDataList'
  import CreateEventForm from './interface/CreateEventForm'
  import UpdateEventForm from './interface/UpdateEventForm'
  export default {
    name: 'Main',
    components: {UpdateEventForm, CreateEventForm, EventsDataList},
	data () {
      return {
        selectedEvent: null
      }
	},
	methods: {
      /**
	   * Fires when user create event
	   */
      onCreateEventListener (event) {
        this.$refs.eventsList.insert(event)
      },

      /**
	   * Listen @select event
       * @param event
       */
      onEventSelectListener (event) {
        this.selectedEvent = event
      },

      /**
	   * Fires when user updates event
       * @param event
       */
      onSaveEventListener (event) {
        this.$refs.eventsList.update(event.id, event)

		this.selectedEvent = null
      },

      onDeleteEventListener (event) {
        this.selectedEvent = null

		this.$refs.eventsList.removeById(event.id)
      }
	}
  }
</script>

<style scoped>

</style>
