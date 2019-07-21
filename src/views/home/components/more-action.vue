<template>
  <div>
    <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    :beforeClose="beforeClose"
    :closeOnClickOverlay="true"
    >
      <van-cell-group v-if="!isReportShow">
        <van-cell icon="location-o" title="不感兴趣" @click="handelDisLikes" />
        <van-cell
        icon="location-o"
        is-link
        title="反馈垃圾内容"
        @click="isReportShow = true"/>
        <van-cell icon="location-o" title="拉黑作者" @click="handelBlackLists" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReportShow = false" />
        <van-cell
        v-for="item in reportTypes"
        :key="item.value"
        :title="item.label"
        @click="handelReportArcitle(item.value)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { disLikesArticle, reportArticle } from '@/api/article'
import { blackoutUsers } from '@/api/user'
export default {
  name: 'moreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object
    }
  },
  data () {
    return {
      isReportShow: false,
      reportTypes: [
        { label: '其他问题', value: 0 },
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 }
      ]
    }
  },
  methods: {
    async handelDisLikes () {
      try {
        await disLikesArticle(this.currentArticle.art_id)
        // console.log(this.currentArticle)
        // 发送请求后，文章列表移除当前文章
        // 发送自定义事件移除文章 @remove-article
        this.$emit('remove-article')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.$emit('input', false)
    },
    async handelReportArcitle (type) {
      try {
        await reportArticle({
          articleId: this.currentArticle.art_id,
          type,
          remark: ''
        })
        // 监听自定义举报成功事件，需要的时候监听
        this.$emit('report-success')
        // 关闭弹窗
        this.$emit('input', false)
        this.$toast.success('举报成功')
      } catch (err) {
        console.log(err)
        this.$emit('input', false)
        if (err.response && err.response.status === 409) {
          this.$toast.fail('该文章已被举报过')
        } else {
          this.$toast.fail('举报失败')
        }
      }
      this.isReportShow = false
    },
    beforeClose (action, done) {
      this.isReportShow = false
      done()
    },
    // 拉黑用户
    async handelBlackLists () {
      try {
        await blackoutUsers(this.currentArticle.aut_id)
        this.$toast.success('操作成功')
        // 自定义事件——拉黑成功 移除当前文章
        this.$emit('blackout-users')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.$emit('input', false)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
