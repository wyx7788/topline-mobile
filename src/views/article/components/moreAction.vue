<template>
  <div class="more-action">
    <van-button
      :icon="isLike? 'like' :'like-o'"
      round
      :loading="isLikeLoading"
      @click="handelLike"
      type="danger"
    >{{isLike? '取消' : ''}}点赞</van-button>

    <van-button
      :icon="disLike? 'delete' : 'bag'"
      round
      :loading="isDisLikeLoading"
      @click="handelDisLike"
      type="danger"
    >{{disLike? '取消': ''}}不喜欢</van-button>
  </div>
</template>

<script>
import {
likeArticle, 
unLikeArticle,
unDisLikesArticle,
disLikesArticle
} from '@/api/article'
export default {
  name: 'MoreAction',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isLike () {
      return this.article.attitude === 1
    },
    disLike () {
      return this.article.attitude === 0
    }
  },
  data () {
    return {
      isLikeLoading: false,
      isDisLikeLoading: false
    }
  },
  methods: {
    
    async handelLike () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      try {
        this.isLikeLoading = true
        const articleId = this.article.art_id
        if (this.isLike) {
          // 取消点赞
          await unLikeArticle(articleId)
          this.article.attitude = -1
          this.$toast.success('已取消点赞')
          // -1 无状态
        } else {
          // 点赞
          await likeArticle(articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.isLikeLoading = false      
    },
    async handelDisLike () {
      if (!this.$checkLogin()) {
        return
      }
      try {
        const articleId = this.article.art_id
        this.isDisLikeLoading = true
        // 判断是否是不喜欢状态
        if (this.disLike) {
          // 取消不喜欢
          await unDisLikesArticle(articleId)
          this.article.attitude = -1
          this.$toast.success('已取消对文章不喜欢')
        } else {
          // 对文章不喜欢
          await disLikesArticle(articleId)
          this.article.attitude = 0
          this.$toast.success('对文章不喜欢')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.isDisLikeLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
