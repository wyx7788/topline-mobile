<template>
<div>
  <!-- 搜索框 -->
  <van-search
  placeholder="请输入搜索关键词"
  show-action
  v-model="serchText" />
  <!-- /搜索框 -->

  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
  </van-cell-group>
  <!-- /联想建议 -->

  <!-- 历史记录 -->
  <!-- /历史记录 -->
</div>
</template>

<script>
export default {
  name: 'searchIndex',
  data () {
    return {}
  }
}
</script>

<style lang='less' scoped>
</style>
