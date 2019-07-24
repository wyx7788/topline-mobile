
// 插件

import store from '@/store'
import router from '@/router'
import { Dialog } from 'vant'

function checkLogin () {
  // 已登录
  const { user } = store.state

  // 如果用户已登录
  if (user) {
    return true
  }

  // 没有登录状态下
  Dialog.confirm({
    title: '登录提示',
    message: '该操作需要登录，是否登录？'
  }).then(() => {
    router.push({
      name: 'login'
    })
  }).catch(() => {
    // on cancel
  })
}

// export default {
//   install (Vue, options) {
//     Vue.prototype.$checkLogin = checkLogin
//   }
// }
export default {
  // 当你 Vue.use(这个插件对象) 的时候，install 方法会被自动调用
  install (Vue, options) {
    console.log('install 方法被调用了')
    Vue.prototype.$checkLogin = checkLogin
  }
}
