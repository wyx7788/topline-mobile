<template>
<div>
  <van-popup
    :style="{ height: '80%' }"
    v-model="isShow"
    position="bottom"
  >
  </van-popup>
</div>
</template>

<script>
import globalBus from '@/utils/global-bus'
export default {
  name: 'replyList',
  props: {
    // value: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
    // 使用 globalBus 监听自定义事件
    globalBus.$on('reply-list', () => {
      this.isShow = true
    })
  }
}
</script>

<style lang='less' scoped>
</style>
