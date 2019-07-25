<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in comment"
        :key="item.aut_id.toString()"
      >
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button :icon="item.is_liking ? 'like' : 'like-o'" size="mini" plain>赞({{item.like_count}})</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | relativeTime}}</span>
            ·
            <span @click="handelReply">回复({{item.reply_count}})</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getCommentArticle } from '@/api/comment'
import globalBus from '@/utils/global-bus'
export default {
  name: 'CommentList',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      comment: [],
      loading: false,
      finished: false,
      offset: null
    }
  },
  created () {
    // this.articleId
    // console.log(this.articleId)  
  },
  computed: {
    articleId () {
      return this.$route.params.articleId
    }
  },
  methods: {
    // 使用 globalBus 发布自定义事件
    handelReply () {
      globalBus.$emit('reply-list')
    },
    async onLoad () {
      console.log('onload')
      try {
        const data = await getCommentArticle({
          articleId: this.articleId,
          offset: this.offset,
          limit: 10
        })
        // 如果没有评论数据，就  评论加载完毕
        if (!data.results.length) {
          this.finished = true
          this.loading = false
          return
        }
        // 如果 有评论数据， 就将数据添加（push）到评论列表当中
        this.comment.push(...data.results)
        console.log(data)
        this.loading = false
        this.offset = data.last_id
      } catch (err) {

      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
