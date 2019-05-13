import api from './index'

/**
 * Get all events
 *
 * @param page
 * @param limit
 * @return {*}
 */
export const getAllEventsRequest = (page = 1, limit = 20) => {
  return api.request('events')
    .withParams({
      page: page,
      limit: limit
    })
    .get()
}

/**
 * Create event
 *
 * @param data
 * @return {*}
 */
export const createEventRequest = (data) => {
  return api.request('events')
    .withBody(data)
    .post()
}