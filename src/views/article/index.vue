<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="今日头条"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /头部 -->
    <div class="box">
      <!-- 文章标题 -->
      <h2 class="authorTitle">{{article.title}}</h2>
      <!-- /文章标题 -->

      <!-- 文章作者信息 -->
      <authorInfo :article="article"></authorInfo>
      <!-- /文章作者信息 -->

      <!-- 文章内容 -->
      <div class="authorContent" v-html="article.content"></div>
      <!-- /文章内容 -->

      <!-- 点赞和不喜欢 -->
      <moreAction :article="article"></moreAction>
      <!-- /点赞和不喜欢 -->

      <!-- 评论列表 -->
      <commentList :article='article'></commentList>
      <!-- /评论列表 -->

      <!-- 发布评论 -->
      <!-- /发布评论 -->

      <!-- 回复评论列表 -->
      <reply-list></reply-list>
      <!-- /回复评论列表 -->
    </div>
  </div>
</template>

<script>
import authorInfo from './components/authorInfo'
import moreAction from './components/moreAction'
import commentList from './components/commentList'
import replyList from './components/reply-list'
import { getArticleContent } from '@/api/article'
export default {
  name: 'articleIndex',
  components: {
    authorInfo,
    moreAction,
    commentList,
    replyList
  },
  data () {
    return {
      article: {}
    }
  },
  created () {
    // console.log(this.$route)
    this.loadArticleDetails()
  },
  methods: {
    async loadArticleDetails () {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      })
      try {
        const data = await getArticleContent(this.$route.params.articleId)
        // console.log(data)
        this.article = data
      } catch (error) {
        console.log(error)
        this.$toast.fail('加载失败')
      }
      toast.clear()
    }
  }
}
</script>

<style lang='less' scoped>
body{
  background: #ffffff
}
.box{
  padding: 100px 20px;
}
.authorTitle{
  font-size: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap:break-word;
  overflow: hidden;
}
.authorContent{
  font-size: 36px;
  margin: 50px 0;
}
</style>
