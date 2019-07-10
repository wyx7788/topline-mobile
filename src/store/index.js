import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
// 加载auth 中的所有 方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser()
  },
  mutations: {
    // state : 上面的数据
    // data： 传过来的数据
    setUser (state, data) {
      // 登录成功后  调用mutation  更新容器中的 user 状态
      state.user = data
      // 设置user数据

      // 将数据存储 到本地存储
      auth.saveUser(state.user)
    }
  },
  actions: {

  }
})
