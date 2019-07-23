<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" src="https://img.yzcdn.cn/vant/logo.png" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | relativeTime}}</p>
      </div>
    </div>
    <div>
      <van-button
        :type="article.is_followed ? 'default' : 'danger'"
        :loading="focusUserLoading"
        @click="focusUser"
      >{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </div>
  </div>
</template>

<script>
import { focusOnUsers, unFocusOnUsers } from '@/api/user'
export default {
  name: 'AuthInfo',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      focusUserLoading: false
    }
  },
  methods: {
    async focusUser () {
      // 判断是否是登录状态
      this.focusUserLoading = true

      // 判断是否关注
      if (this.article.is_followed) {
        // 取消关注
        await unFocusOnUsers(this.article.aut_id)
        this.article.is_followed = false
        this.$toast.success('已取消关注')
      } else {
        // 关注用户
        await focusOnUsers(this.article.aut_id)
        this.article.is_followed = true
        this.$toast.success('关注成功')

      }


      // try {
      //   await focusOnUsers(this.article.aut_id)
      //   this.$toast.success('关注成功')
      // } catch (error) {
      //   this.$toast.fail('关注失败')
      // }
      this.focusUserLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
