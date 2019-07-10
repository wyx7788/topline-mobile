<template>
<div>
  <van-nav-bar
    title="Login"
  />
  <div class="logo"><img src="./logo.png"></div>
  <form>
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="contact"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="user.code"
        left-icon="goods-collect-o"
        placeholder="请输入密码"
        type="password"
      />
    </van-cell-group>
    <div class="logo_btn">
      <van-button
      @click.prevent="handelLogin"
      type="info">登录</van-button>
    </div>
  </form>
</div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '17635158848',
        code: '123456'
      }
    }
  },
  methods: {
    async handelLogin () {
      // this.login(this.user)
      try {
        const data = await login(this.user)
        console.log(data)
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar{
  background:#3296fa;
  .van-nav-bar__title{
    color: #fff;
  }
}
.logo{
  text-align: center;
  margin: 50px auto;
  img{
    width: 40%;
  }
}
.logo_btn{
  padding: 0 20px;
  margin-top: 30px;
  .van-button--info{
    width: 100%;
    border-radius: 5px;
    background:#3296fa;
    border-color: #3296fa;
  }
}
</style>
