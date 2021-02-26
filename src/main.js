import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import './assets/fonts/iconfont.css'
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.prototype.$http = axios

// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'

new Vue({
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
