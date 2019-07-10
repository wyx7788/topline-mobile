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
        @input="changeInput"
        v-validate="'required|numeric'"
        name="mobile"
        left-icon="contact"
        placeholder="请输入手机号码"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-model="user.code"
        @input="changeInput"
        v-validate="'required|min:6'"
        name="code"
        left-icon="goods-collect-o"
        placeholder="请输入密码"
        type="password"
        :error-message="errors.first('code')"
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
  created () {
    this.configCustomMessages()
  },
  methods: {
    changeInput () {
      console.log('change')
      // var changeput = document.querySelector('.van-field__error-message')
      // changeput.style.display = 'none'
    },
    configCustomMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '请输入手机号码',
            numeric: '必须为数字'
          },
          code: {
            required: '请输入密码',
            min: '最小长度为6'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
    },
    async handelLogin () {
      // this.login(this.user)
      try {
        this.$validator.validate().then(async valid => {
          if (!valid) {
            // do stuff if not valid.
            return
          }
          const data = await login(this.user)
          console.log(data)

          // 调用vueX 容器 中的 mutations 中的 setUser  更新 本地存储的user 数据
          this.$store.commit('setUser', data)
        })
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
