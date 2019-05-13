<template>
	<v-card>
		<v-progress-linear v-show="isLoading" :indeterminate="true" height="2" class="ma-0" :active="isLoading"></v-progress-linear>
		<v-toolbar color="primary" dark>
			<v-toolbar-title>
				<v-icon>calendar_today</v-icon>
				My Events
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon title="Create new event" @create="onCreateClickListener">
				<v-icon>add</v-icon>
			</v-btn>
		</v-toolbar>
		<v-list two-line>
			<template v-for="(event, index) in events">
				<v-list-tile
						:key="event.id"
						@click="onSelectClickListener(event)"
						ripple
				>
					<v-list-tile-content>
						<v-list-tile-title>{{event.title}}</v-list-tile-title>
						<v-list-tile-sub-title v-if="event.description">{{event.description}}</v-list-tile-sub-title>
						<v-list-tile-sub-title class="text--grey" v-else>Event will take place from {{event.start_at.format('HH:mm')}} to {{event.end_at.format('HH:mm')}}</v-list-tile-sub-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-list-tile-action-text :title="event.start_at.format('llll')">{{event.start_at.format('MMM DD HH:mm')}}</v-list-tile-action-text>
					</v-list-tile-action>
				</v-list-tile>
				<v-divider :key="`divider-${index}`"></v-divider>
			</template>
		</v-list>
	</v-card>
</template>

<script>
  import {getAllEventsRequest} from '../../api/event'
  import {toMoment, fetchData, arrayRemove} from '../../util/helpers'

  export default {
    name: 'EventsDataList',
	data () {
      return  {
        isLoading: false,
		events: []
      }
	},
	async created () {
      this.isLoading = true

      this.events = await getAllEventsRequest(1, 500)
		.then(fetchData)
		.then(toMoment(['start_at', 'end_at']))

      this.isLoading = false
	},
	methods: {
      /**
	   * Fires when user click on select
	   *
       * @param event
       */
      onSelectClickListener (event) {
        this.$emit('select', event)
      },

      /**
	   * Fires when user click on create button
       */
      onCreateClickListener () {
        this.$emit('create')
      },

      /**
	   * Update event by id
	   *
       * @param id
       * @param data
       */
      update (id, data) {
        const event = this.findById(id)

        if (event) {
          Object.assign(event, data)
        }
      },

      /**
	   * Insert new event to list
	   *
       * @param event
       */
      insert (event) {
        this.events.push(event)

		// Resort list
		this.sort()
      },

      /**
	   * Remove event by id from list
       * @param id
       */
      removeById (id) {
        const event = this.findById(id)

        if (event) {
          arrayRemove(this.events, event)
        }
      },

      /**
	   * Find event by id
	   *
       * @param id
       * @return {*}
       */
      findById (id) {
        return this.events.find(x => x.id === id)
      },

      /**
	   * Sort event ascending by start time
       */
      sort () {
        this.events.sort((x, y) => x.start_at.unix() - y.start_at.unix())
      }
	}
  }
</script>

<style scoped>

</style>
