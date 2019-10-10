import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import ElmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElmentUI)
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
