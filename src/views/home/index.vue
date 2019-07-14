<template>
  <div>
    <van-nav-bar title="首页"/>
    <van-tabs v-model="activeChangeIndex">
      <van-tab
      :title="item.name"
      v-for="item in channels"
      :key="item.id"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'

export default {
  name: 'home',
  data () {
    return {
      channels: [], // 频道列表
      activeChangeIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 向下滚动刷新
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下拉加载
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    // 加载频道列表
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      if (user) {
        // 已登录
        const data = await getUserChannels()
        console.log(data)
        channels = data.channels
      } else {
        // 未登录
        const locadChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (locadChannels) {
          // 如果有本地缓存
          channels = locadChannels
        } else {
          // 如果没有本地缓存
          const data = await getUserChannels()
          channels = data.channels
        }
      }

      // 修改channels  数据，循环遍历添加我们需要的数据， 将所属文章列表加载到各个频道下
      channels.forEach(item => {
        // 用来遍历当前频道的数据和状态
        item.articles = [] // 存储频道的文章列表
        item.downPullLoading = false // 下拉刷新状态
        item.upPullLoading = false // 上拉加载状态
        item.upPullFinished = false // 是否加载完毕
      })

      this.channels = channels
    }
  }
}
</script>

<style lang='less' scoped>
</style>
