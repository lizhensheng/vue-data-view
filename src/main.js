import Vue from 'vue'
import App from './App.vue'
import ElmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElmentUI)
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'
import store from './store'
import router from "./router/router"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
