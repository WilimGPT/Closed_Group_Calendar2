import Vue from 'vue'
import App from './App.vue'

import './assets/global.css'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'

import '@fortawesome/fontawesome-free/css/all.css'

locale.use(lang)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
