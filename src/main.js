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

// 引入avue
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import http from '@/utils/request'
window.axios = http
// 注意：如果使用字典需要先赋值axios为全局，再Vue.use(Avue)
Vue.use(Avue)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置element ui 默认大小
})

// 注册全局过滤器
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
