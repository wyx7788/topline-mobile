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
            <span @click="handelReply(item)">回复({{item.reply_count}})</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import globalBus from '@/utils/global-bus'
export default {
  name: 'commentList',
  props: {
    // article: {
    //   type: Object,
    //   default: () => {}
    // },

    // 布尔值， 判断你是要加载文章评论，还是要加载评论回复
    isArticle: {
      type: Boolean,
      default: true
    },

    // source 是文章id  或者是 评论的id
    // 文章id 用于获取文章评论，  评论id 用于获取评论的回复
    source: {
      type: [Number, String],
      required: true
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
  created () {},
  // computed: {
  //   articleId () {
  //     return this.$route.params.articleId
  //   }
  // },
  methods: {
    // 使用 globalBus 发布自定义事件
    handelReply (item) {
      globalBus.$emit('reply-list', item)
    },
    async onLoad () {
      // console.log('onload')
      try {
        const data = await getComments({
          isArticle: this.isArticle,
          source: this.source,
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
        // console.log(data)
        this.loading = false
        this.offset = data.last_id
      } catch (err) {

      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
