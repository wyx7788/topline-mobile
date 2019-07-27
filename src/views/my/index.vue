<template>
<div>
  <!-- 未登录状态 -->
  <un-login v-if="!$store.state.user"></un-login>
  <!-- /未登录状态 -->

  <!-- 登录状态 -->
  <user-info v-else></user-info>
  <!-- /登录状态 -->
</div>
</template>

<script>
import unLogin from './components/un-login'
import userInfo from './components/user-info'
export default {
  data () {
    return {}
  },
  components: {
    unLogin,
    userInfo
  }
}
</script>

<style lang='less' scoped>
</style>
