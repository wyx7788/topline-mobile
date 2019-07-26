<template>
<div class="add_comment_footer">
  <van-cell-group>
    <van-field
      v-model="content"
      clearable
      left-icon="edit"
      placeholder="请输入"
    >
      <div class="collected" slot="right-icon">
        <van-icon
        v-if="!articleId"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="handelCollected"
        ></van-icon>
      </div>
      <van-button
      :disabled="!content.length"
      slot="button"
      size="small"
      @click="handelAddComment"
      type="info">发布</van-button>
  </van-field>
  </van-cell-group>
</div>
</template>

<script>
import { addComments } from '@/api/comment'
import { articleCollected, unArticleCollected } from '@/api/article'
export default {
  name: 'addComment',
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [Number, String],
      default: null
    },
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async handelAddComment () {
      if (!this.$checkLogin()) {
        return
      }
      try {
        await addComments({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.content, // 评论内容
          articleId: this.articleId, // 对文章进行评论，不要传此参数。
        })
        this.content = ''
        this.$toast.success('评论发布成功！')
      } catch (err) {
        this.$toast.fail('评论失败！')
      }
    },
    async handelCollected () {
      try {
        const articleId = this.article.art_id
        if (this.article.is_collected) {
          // 取消收藏
          await unArticleCollected(articleId)
          this.$toast.success('取消收藏成功')
          this.article.is_collected = false
        } else {
          // 收藏
          await articleCollected(articleId)
          this.$toast.success('收藏成功')
          this.article.is_collected = true
        }
      } catch (err) {
        this.$toast.fail('操作失败！')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.add_comment_footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
}
.collected{
  margin: 0 20px;
  i{
    font-size: 40px
  }
}
</style>
