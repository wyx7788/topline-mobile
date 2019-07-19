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
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime' // dayjs 相对时间插件

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// 想对时间的使用方式
// dayjs().from(dayjs('1990')) // 2 年以前
// dayjs().from(dayjs(), true) // 2 年

// 全局定义过滤器处理日期格式， 主要处理文本格式，全局过滤器——每个组件都可使用
// 好处： 可以复用
// relativeTime 过滤器
// value 函数参数
// 函数返回格式
Vue.filter('relativeTime', (value) => {
  return dayjs().from(dayjs(value))
})
// 组件模板中使用 {{ 数据 | 过滤器 }}

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
