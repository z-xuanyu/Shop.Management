import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // 样式重置

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 全局css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // 权限控制
import './utils/error-log' // error log

import * as filters from './filters' // 全局过滤器

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
