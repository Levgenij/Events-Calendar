const state = {
  user: {},
}

export const types = {
  SET_USER: 'SET_USER'
}

const getters = {
  user: state => state.user,
  isGuest: state => !state.user.id
}

const actions = {
}

const mutations = {
  [types.SET_USER] (state, response) {
    state.user = response
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
