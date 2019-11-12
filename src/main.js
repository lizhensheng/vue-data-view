import Vue from 'vue'
import App from './App.vue'
import ElmentUI from 'element-ui'
import 'common/css/index.css'
import echarts from 'echarts'
import JsonViewer from 'vue-json-viewer'
window.$echarts = echarts
Vue.use(ElmentUI)
Vue.use(JsonViewer)
import 'common/stylus/index.styl'
import store from './store'
import router from "./router"
import VueDraggableResizable from 'vue-draggable-resizable'
import {borderBox1} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox1)
import {borderBox2} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox2)
import {borderBox3} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox3)
import {borderBox4} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox4)
import {borderBox5} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox5)
import {borderBox6} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox6)
import {borderBox7} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox7)
import {borderBox8} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox8)
import {borderBox9} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox9)
import {borderBox10} from '@jiaminghi/data-view'
Vue.component('dv-border-box-1', borderBox10)
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import 'common/css/iconfont.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
