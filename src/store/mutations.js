import * as types from './mutation-types'

export default {
  [types.SET_ADDRESS_INFO](state, addressInfo) {
    state.addressInfo = addressInfo
  }
}
