// {/* <link rel="stylesheet" href="https://at.alicdn.com/t/font_1285938_sl9rmkq0hho.css"></link> */}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate, {
  events: ''
})

Validator.localize('zh_CN', zhCN)
Vue.use(Vant)
Vue.use(Lazyload);

Vue.config.productionTip = false

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
