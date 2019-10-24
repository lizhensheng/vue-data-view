import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import * as getters from './getters'
import createLogger from "vuex/dist/logger"
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict:debug,
    plugins:debug?[createLogger()]:[]
});