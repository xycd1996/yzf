import * as types from './mutation-types'

export default {
  setAddressInfo: ({ commit }, data) => {
    commit(types.SET_ADDRESS_INFO, data)
  }
}
