<template>
<div>
  <!-- 未登录状态 -->
  <un-login v-if="!$store.state.user"></un-login>
  <!-- /未登录状态 -->

  <!-- 登录状态 -->
  <user-info v-else :user="user"></user-info>
  <!-- /登录状态 -->

  <footer-layout></footer-layout>

</div>
</template>

<script>
import unLogin from './components/un-login'
import userInfo from './components/user-info'
import footerLayout from '@/views/footer-layout'
import { getCurrentUserInfo } from '@/api/user'

export default {
  name: 'my',
  data () {
    return {
      user: {}
    }
  },
  components: {
    unLogin,
    userInfo,
    footerLayout
  },
  created () {
    if (this.$store.state.user) {
      this.handelGetUser()
    }
  },
  // 清除缓存
  deactivated () {
    this.$destroy()
  },
  methods: {
    async handelGetUser () {
      try {
        const data = await getCurrentUserInfo()
        console.log(data)
        this.user = data
      } catch (err) {
        this.$toast.fail('加载失败！')
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>
