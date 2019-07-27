<template>
  <div class="not-login" @click="$router.push({
    name: 'login',
    query: {
      redirect: '/my'
    }
  })">
  <!-- 跳转登录页面 并传递参数， 使登录完成后返回当前页面 -->
    <div class="circle">
      <span>登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unLogin',
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.not-login {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 100px;
    height: 100px;
    padding: 40px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
}
</style>