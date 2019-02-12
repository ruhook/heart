import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/admin'
import mould from './modules/mould'
import event from './modules/event'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mould,
    event
  },
  getters
})

export default store