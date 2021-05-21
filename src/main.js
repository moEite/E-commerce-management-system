import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'

import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.prototype.$http = axios
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + '').padEnd(2, '0')
  const hh = (dt.getHours() + '').padEnd(2, '0')
  const mm = (dt.getMinutes() + '').padEnd(2, '0')
  const ss = (dt.getSeconds() + '').padEnd(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

new Vue({
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
