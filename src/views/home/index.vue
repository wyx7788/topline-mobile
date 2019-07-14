<template>
  <div>
    <van-nav-bar title="首页"/>
    <van-tabs v-model="activeChangeIndex">
      <van-tab
      :title="channelItem.name"
      v-for="channelItem in channels"
      :key="channelItem.id"
      >
        <van-pull-refresh
        @refresh="onRefresh">
          <van-list
            v-model="channelItem.upPullLoading"
            :finished="channelItem.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="activeItem in channelItem.articles"
              :key="activeItem.art_id"
              :title="activeItem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import { getArticles } from '@/api/article'

export default {
  name: 'home',
  data () {
    return {
      channels: [], // 频道列表
      activeChangeIndex: 0,
    }
  },
  created () {
    this.loadChannels()
  },
  // 计算属性
  computed: {
    // 当前激活的频道
    // const { id: channelId } = this.channels[this.activeChangeIndex]
    // 当前激活的频道————多个地方使用，封装到计算属性当中
    activeChannel () {
      return this.channels[this.activeChangeIndex]
    }
  },
  methods: {
    // 上拉加载更多， push数据
    async onLoad () {
      // 异步更新数据
      let data = []
      data = await this.loadArticles()
      // 如果没有 时间戳了，并且文章列表为空， 表示没有数据了
      if (!data.pre_timestamp && !data.results.length) {
        // 取消加载loading
        this.activeChannel.upPullLoading = false
        // 设置频道已经加载完毕，并且不再onload
        this.activeChannel.upPullFinished = true
        return
      }
      // console.log(data)
      // 如果是初次加载频道文章列表，没有数据（没有数据就加载上一次的数据）
      if (data.pre_timestamp && !data.results.length) {
        // 当前激活频道的时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticles()
      }

      // 数据加载好之后，把时间戳 更新到当前频道的最新 时间戳 来加载下页数据
      this.activeChannel.timestamp = data.pre_timestamp

      // this.activeChannel.articles = data.results
      // 不能直接把数据复制，这样就覆盖了原来的数据了
      
      // 要使用push 追加 把数组的所有元素push 到文章列表
      this.activeChannel.articles.push(...data.results)
      
      // 数据加载完毕后  取消上了loading
      this.activeChannel.upPullLoading = false
      console.log(data)
    },
    // 下拉刷新数据
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
        item.timestamp = Date.now()
        item.downPullLoading = false // 下拉刷新状态
        item.upPullLoading = false // 上拉加载状态
        item.upPullFinished = false // 是否加载完毕
      })

      this.channels = channels
    },
    async loadArticles () {
      const { id:channelId ,timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前激活频道的ID
        timestamp,
        withTop: 1
      })
      // 返回数据
      return data
    }
  }
}
</script>

<style lang='less' scoped>
</style>
