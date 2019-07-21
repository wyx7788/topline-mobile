<template>
<div>
  <!-- 搜索框 -->
  <form action="/">
    <van-search
    placeholder="请输入搜索关键词"
    show-action
    v-model="serchText"
    @search="handelSearch(serchText)"
    @cancel="$router.push({name:'home'})" />
  </form>
  <!-- /搜索框 -->

  <!-- 联想建议 -->
  <van-cell-group v-if="suggestion.length && serchText.length">
    <van-cell
    v-for="item in suggestion"
    :key="item"
    icon="search"
    @click="handelSearch(item)">
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
  <van-cell-group v-else>
    <van-cell title="历史记录">
      <van-icon
        slot="right-icon"
        name="delete"
        style="line-height: inherit;"
        v-show="!isDeleteShow"
        @click="isDeleteShow = true"
      />
      <!-- !isDeleteShow  非删除状态
            isDeleteShow  删除状态
      -->
      <div slot="default" v-show="isDeleteShow">
        <span style="margin-right:10px">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
    </van-cell>
    <van-grid :column-num="2">
      <van-grid-item class="pd_0">
        <van-cell title="lishds">
          <van-icon
            slot="right-icon"
            name="close"
            style="line-height: inherit;"
            v-show="isDeleteShow"
          />
        </van-cell>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
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
      suggestion: [],
      isDeleteShow: false
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
      return text.toLowerCase().split(keyword).join(
        `<span style="color: red">${keyword}</span>`
      )
    },
    // 搜索事件：搜索框输入法搜索按钮——点击联想建议搜索——跳转搜索结果页面
    handelSearch (queryText) {
      if (!queryText && !queryText.length) {
        return
      }
      // 跳转到搜索结果页面
      this.$router.push({
        path: `/search/${queryText}`
      })
      // this.$router.push({
      //   name: 'search-result',
      //   params: {
      //     q: queryText
      //   }
      // })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
