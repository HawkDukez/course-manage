const state = {
  role: ''
}

const getters = {}

const actions = {

}

const mutations = {
  userType (state, type) {
    state.role = type
    localStorage.setItem('role', type)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
