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
      <van-cell
      title="头像"
      @click="isUploadImages = true"
      is-link>
        <template slot="default">
          <img class="user_photo" :src="userProfile.photo" alt="">
        </template>
      </van-cell>
      <van-cell @click="isNameShow = true" title="昵称" is-link :value="userProfile.name" />
      <van-cell title="手机" is-link :value="userProfile.mobile" />
    </van-cell-group>
    <van-cell-group>
      <van-cell @click="genderShow = true" title="性别" is-link :value="userProfile.gender === 0 ? '男' : '女'" />
      <van-cell @click="isBirthdayShow = true" title="生日" is-link :value="userProfile.birthday" />
    </van-cell-group>
  </div>
  <!-- 选中性别 -->
  <gender-component v-model="genderShow" @getGender="handelGetGender"></gender-component>
  <!-- /选中性别 -->
  <!-- 输入昵称 -->
  <name-title v-model="isNameShow" :nameText="userProfile"></name-title>
  <!-- /输入昵称 -->
  <!-- 生日 -->
  <birth-day v-model="isBirthdayShow" :userProfile="userProfile"/>
  <!-- /生日 -->
  <upload-images v-model="isUploadImages"></upload-images>
</div>
</template>

<script>
import { getCurrentUserProfile, serveUserProfile } from '@/api/user'
import genderComponent from './components/gender-component'
import nameTitle from './components/name-title'
import birthDay from './components/birth-day'
import uploadImages from './components/upload-images'
export default {
  name: 'userProfile',
  data () {
    return {
      userProfile: {},
      genderShow: false,
      isNameShow: false,
      isBirthdayShow: false,
      isUploadImages: false
    }
  },
  components: {
    genderComponent,
    nameTitle,
    birthDay,
    uploadImages
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    handelGetGender (value) {
      // console.log(value)
      this.userProfile.gender = value
    },
    async handleSave () {
      console.log('handleSave')
      try {
        await serveUserProfile(this.userProfile)
        this.$toast.success('保存成功！')
      } catch (err) {
        console.log(err)
        this.$toast.fail('保存失败！')
      }
    },
    async loadUserProfile () {
      try {
        const data = await getCurrentUserProfile()
        // console.log(data)
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
