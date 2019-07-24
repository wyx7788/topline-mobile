<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
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
      try {
        // 是否已登录？
        if (!this.$checkLogin()) {
          return
        }
        // 如果未登录，提示“该操作需要登录，确认登录吗？”
        // 如果已登录，则执行
        //    如果已关注，则取消关注
        //    如果未关注，则关注
        this.focusUserLoading = true
        if (this.article.is_followed) {
          // 取消关注
          await unFocusOnUsers(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 关注
          await focusOnUsers(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        console.log(err)
      }
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
