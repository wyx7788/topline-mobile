<template>
<div>
  <van-nav-bar
    title="个人信息"
    left-text="返回"
    right-text="保存"
    left-arrow
    @click-left="$router.back()"
    @click-right="handleSave"
  />
  <div class="userlist">
    <van-cell-group>
      <van-cell title="头像" is-link>
        <template slot="default">
          <img class="user_photo" :src="userProfile.photo" alt="">
        </template>
      </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" />
      <van-cell title="手机" is-link :value="userProfile.mobile" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="userProfile.gender === 0 ? '男' : '女'" />
      <van-cell title="生日" is-link :value="userProfile.birthday" />
    </van-cell-group>
  </div>
  
</div>
</template>

<script>
import { getCurrentUserProfile } from '@/api/user'
export default {
  name: 'userProfile',
  data () {
    return {
      userProfile: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const data = await getCurrentUserProfile()
        console.log(data)
        this.userProfile = data
      } catch (err) {
        this.$toast.fail('加载失败！')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.userlist{
  margin-top: 92px;
}
.van-cell-group{
  margin-bottom: 20px;
}
.user_photo{
  width: 60px;
  height: 60px;
  border-radius: 50%
}
</style>
