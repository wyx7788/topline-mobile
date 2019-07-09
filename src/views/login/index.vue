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
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    handelLogin () {
      axios({
        method: 'POST',
        url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
        data: this.user
      })
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
  padding: 0 10px;
  margin-top: 30px;
  .van-button--info{
    width: 100%;
    border-radius: 5px;
    background:#3296fa;
    border-color: #3296fa;
  }
}
</style>
