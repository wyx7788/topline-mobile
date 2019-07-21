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
    icon="search">
      <div slot="title" v-html="highlight(item, serchText)"></div>
      <!--
        过滤器，只能用在 {{}} 和 v-bind 中
        item ： 循环体文本
        serchText： 输入框内容（关键字）
      -->
    </van-cell>
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
  },
  methods: {
    highlight (text, keyword) {
      // toLowerCase: 全部转成小写字母
      // 截取关键字
      return text.toLowerCase().split(keyword)
      .join(
        `<span style="color: red">${keyword}</span>`
      )
    }
  }
}
</script>

<style lang='less' scoped>
</style>
