import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 线下调试

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
