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
    <van-cell
    v-for="item in suggestion"
    :key="item"
    :title="item"
    icon="search" />
  </van-cell-group>
  <!-- /联想建议 -->

  <!-- 历史记录 -->
  <!-- /历史记录 -->
</div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchIndex',
  data () {
    return {
      serchText: '',
      suggestion: []
    }
  },
  watch: {
    // 监视输入框数据改变，数据发生改变，发送请求联想建议

    // 函数防抖处理
    serchText: debounce(async function (newValue) {
      // 去除首尾空格
      const text = newValue.trim()
      // 数据为空时，不做任何操作
      if (!text.length) {
        return
      }
      try {
        const data = await getSuggestion(text)
        console.log(data)
        this.suggestion = data.options
      } catch (err) {
        console.log(err)
      }
    }, 500)
  }
}
</script>

<style lang='less' scoped>
</style>
