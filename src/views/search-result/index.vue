<template>
  <div>
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- <p>sou搜索结果{{$route.params.q}}</p> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in searchResultlList"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>  
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  data () {
    return {
      searchResultlList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  // 计算属性
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      await this.$sleep(800)
      const data = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.q
      })
      
      // 没有数据
      if (!data.results.length) {
        // 停止加载loading
        this.loading = false
        // 结束加载
        this.finished = false
        return
      }

      // 如果有数据时，执行后面
      // 不能直接把列表数据赋值,数据需要不断加载，不是固定的
      // this.searchResultlList = data.results

      // 将数据push 到列表中,
      this.searchResultlList.push(...data.results)
      // console.log(data)
      // 加载第二页
      this.page += 1
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>
.van-list{
  margin-top: 92px;
}
</style>
