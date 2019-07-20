<template>
  <div>
    <van-nav-bar title="首页"/>
    <van-tabs v-model="activeChangeIndex">
      <div
      slot="nav-right"
      class="nav_right"
      @click="isChannelShow = true">
        <van-icon name="wap-nav"/>
      </div>
      <van-tab
      :title="channelItem.name"
      v-for="channelItem in channels"
      :key="channelItem.id"
      >
        <van-pull-refresh
        v-model="channelItem.downPullLoading"
        @refresh="onRefresh"
        :success-text="channelItem.downPullSuccessText"
        :success-duration="1000"
        >
          <van-list
            v-model="channelItem.upPullLoading"
            :finished="channelItem.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="activeItem in channelItem.articles"
              :key="activeItem.art_id.toString()"
              :title="activeItem.title"
            >            
              <!-- 插入详情  slot  -->
              <div slot="label">
                <!-- 图片 -->
                <template v-if="activeItem.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item
                    v-for="(img, index) in activeItem.cover.images"
                    :key="index">
                      <van-image
                      class="articles_img"
                      :src="img"
                      fit="fill"                   
                      lazy-load>
                        <template v-slot:loading>
                          <van-loading type="spinner" size="20" />
                        </template>
                        <template v-slot:error>加载失败</template>
                      </van-image>
                    </van-grid-item>
                  </van-grid>
                </template>             
                <!-- 图片 -->
                <p>
                  <span>{{activeItem.aut_name}}</span>
                  &nbsp;
                  <span>{{activeItem.comm_count}}评论</span>
                  &nbsp;
                  <span>{{activeItem.pubdate | relativeTime}}</span>
                  <van-icon
                  class="close"
                  name="close"
                  @click="handleMoreShow(activeItem)"
                  />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 
      :activeChangeIndex="activeChangeIndex"
      @update:activeChangeIndex="activeChangeIndex=$event"

      简写方式 ——  类似于 V-model
      :activeChangeIndex.sync="activeChangeIndex"
      添加 sync 修饰符 

      @update: 绑定的字段 = " 绑定的字段 = $event "
      其中 update:  是固定的语法

      所以你在子组件中 发布  自定义事件的时候 务必要发送一个名字叫  update: 绑定的字段  事件

      v-model="isChannelShow"
      相当于：
            v-bind="isChannelShow"
            @input="isChannelShow = $event"
      -->
      <homeChannel
      :channels="channels"
      :activeChangeIndex.sync="activeChangeIndex"
      v-model="isChannelShow"></homeChannel>
    </van-tabs>
    <moreAction
    v-model="isMoreActrionShow"
    :current-article="currentArticle"
    @remove-article="handleRemoveCurrentArticle"
    @blackout-users="handleRemoveCurrentArticle"
    ></moreAction>
    <!-- 自定义事件 绑定 remove-article-->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import { getArticles } from '@/api/article'
import homeChannel from './components/channel'
import moreAction from './components/more-action'
import { close } from 'fs';
export default {
  name: 'home',
  data () {
    return {
      channels: [], // 频道列表
      activeChangeIndex: 0,
      isChannelShow: false,
      isMoreActrionShow: false,
      currentArticle: null
    }
  },
  components: {
    homeChannel,
    moreAction
  },
  watch: {
    // 监视登录状态下 ，加载频道以及对应的数据
    // 记住，凡是 能this  点出来的成员都可以在这里直接监视
    '$store.state.user' () {
      // 重新加载用户频道列表
      this.loadChannels()
      // this.onLoad()
      this.activeChannel.upPullLoading = true
      // 频道数据改变，加载频道对应的数据
    },
    // isChannelShow () {
    //   if (!this.isChannelShow && !this.activeChannel.articles,length) {

    //   }
    // }
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
      // 请求延迟
      await this.$sleep(800)
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
    async onRefresh () {
      // 备份上一次最新的数据
      const timestamp = this.activeChannel.timestamp
      // 重置为当前 时间戳
      this.activeChannel.timestamp = Date.now()
      const data = await this.loadArticles()

      // 如果有最新数据
      if (data.results.length) {
        // 替换文章列表， 赋值下一页时间戳
        this.activeChannel.articles = data.results
        this.activeChannel.timestamp = data.pre_timestamp

        // 当下拉刷新的数据重置后无法 满足一屏，使用onLoad 加载下一页数据
        this.onLoad()
        this.activeChannel.downPullSuccessText = '文章更新成功'
      } else {
        // 如果没有最新数据，提示  已是最新数据
        this.activeChannel.downPullSuccessText = '已是最新数据'
      }
      // 下拉刷新后，取消loading状态
      this.activeChannel.downPullLoading = false

      // 如果没有最新数据，就把备份的时间戳  恢复过来
      this.activeChannel.timestamp = timestamp
    },
    // 加载频道列表
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      if (user) {
        // 已登录
        const data = await getUserChannels()
        // console.log(data)
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
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前激活频道的ID
        timestamp,
        withTop: 1
      })
      // 返回数据
      return data
    },
    handleMoreShow (activeItem) {
      this.currentArticle = activeItem
      this.isMoreActrionShow = true
    },
    // 去除不感兴趣的文章
    handleRemoveCurrentArticle () {
      const acitiveArticle = this.activeChannel.articles
      const delIndex = acitiveArticle.findIndex(item => item === this.currentArticle)
      // console.log(delIndex)
      acitiveArticle.splice(delIndex, 1)
      this.isMoreActrionShow = false
      // console.log(acitiveArticle)
      this.$toast.success('操作成功')
    }
  }
}
</script>

<style lang='less' scoped>
.nav_right{
  position: fixed;
  right: 0;
  background: #ffffff;
  width: 90px;
  height: 88px;
  i{
    margin: 20px 0 0 20px;
    color: #666
  }
}
.van-popup{
  border-top-left-radius:25px;
  border-top-right-radius:25px;
  .channel{
    margin-top: 30px;
  }
}
.articles_img{
  height: 160px;
}
.close{
  float: right;
  font-size: 30px;
}
</style>
