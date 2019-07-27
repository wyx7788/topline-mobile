<template>
<div>
  <router-view></router-view>
  <van-tabbar>
    <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="smile-comment-o" to="/p">问答</van-tabbar-item>
    <van-tabbar-item icon="tv-o">视频</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/my">{{$store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'footerLayout',
  data () {
    return {}
  }
}
</script>

<style lang='less' scoped>
</style>
