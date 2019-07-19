<template>
  <div>
    <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay>
      <van-cell-group v-if="isReportShow">
        <van-cell icon="location-o" title="不感兴趣" />
        <van-cell
        icon="location-o"
        is-link
        title="反馈垃圾内容"
        @click="isReportShow = false"/>
        <van-cell icon="location-o" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReportShow = true" />
        <van-cell title="标题夸张"/>
        <van-cell title="低俗色情" />
        <van-cell title="错别字多" />
        <van-cell title="旧闻重复" />
        <van-cell title="广告软文" />
        <van-cell title="内容不实" />
        <van-cell title="涉嫌违规范围" />
        <van-cell title="侵权" />
        <van-cell title="其他内容" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'moreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isReportShow: true
    }
  }
}
</script>

<style lang='less' scoped>
</style>
