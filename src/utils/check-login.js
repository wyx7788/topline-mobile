
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
      name: 'login',
      query: {
        // 将当前路由的完整路径通过 url 传递给登录页面
        // 非组件模块中获取当前路由使用  router.currentRoute
        // 他和你在组件中的 this.$route  是一样的 一个东西
        redirect: router.currentRoute.fullPath
      }
    })
    // 也可以这样写（等价于上面的写法）
    // router.push('/login?redirect=' + router.currentRoute.fullPath)
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
