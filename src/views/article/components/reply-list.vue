<template>
<div>
  <van-popup
    :style="{ height: '80%' }"
    v-model="isShow"
    position="bottom"
  >
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="comment.aut_photo" alt="">
      </div>
      <div slot="title">
        <span style="margin-right:10px">{{comment.aut_name}}</span>
        <van-tag plain type="primary">楼主</van-tag>
      </div>
      
      <div class="reply_box" slot="label">
        <p>{{comment.content}}</p>
        <p>
          <span>{{comment.pubdate | relativeTime}}</span>
          ·
          <span>回复({{comment.reply_count}})</span>
          <van-button :icon="comment.is_liking ? 'like' : 'like-o'" size="mini" plain>赞({{comment.like_count}})</van-button>
        </p>
      </div>
    </van-cell>
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
      isShow: false,
      comment: {}
    }
  },
  created () {
    // 使用 globalBus 监听自定义事件
    globalBus.$on('reply-list', (item) => {
      this.isShow = true
      this.comment = item
    })
  }
}
</script>

<style lang='less' scoped>
.reply_box .van-button--mini{
  float: right
}
</style>
