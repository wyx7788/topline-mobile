<template>
  <van-popup
    :style="{ height: '95%' }"
    :value="value"
    round
    @input="$emit('input', $event)"
    position="bottom"
    @closed="closedPopup"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            @click="isEdit = !isEdit"
          >{{isEdit ? '编辑' : '完成'}}</van-button>
        </div>
      </div>
      <van-grid
      class="channel-content"
      :border="false"
      :column-num="4" clickable>
        <van-grid-item
        v-for="(channelsItem,index) in channels"
        :key="channelsItem.id"
        >
          <div class="info">
            <span
            slot="text"
            class="text"
            :class="{active: index === activeChangeIndex && isEdit}"
            @click="handelUserChannel(channelsItem, index)"
            >
            {{channelsItem.name}}
            <van-icon
            class="close-icon"
            v-show="!isEdit && !aliveChannels.includes(channelsItem.name)"
            name="close" />
            </span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :border="false" :gutter="10" clickable>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          @click="handelAddChannel(item)"
          >
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import {
  getAllChannels,
  deletedUserChannel,
  resetUserChannels
} from '@/api/channels'
import { mapState } from 'vuex'

export default {
  name: 'homeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeChangeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道数据
      isEdit: true,
      aliveChannels: ['推荐']
    }
  },
  // 计算属性
  computed: {
    recommendChannels () {
      // 遍历当前用户频道的ID  map  生成新的数组
      const duplicates = this.channels.map(item => item.id)
      // 筛选出不包含当前用户的id
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    },
    ...mapState(['user'])
    // vueX  的辅助方法
    // 用来将 vuex 中的state 中的数据映射到本地计算属性 ，现在就可以  this.user  了
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    closedPopup () {
      this.isEdit = true
    },
    changChannel (item, index) {
      // console.log('changChannel')
      // 给父组件传index
      this.$emit('update:activeChangeIndex', index)
      // 关闭弹出层，操作父组件v-model  :  v-bind   @input
      this.$emit('input', false)
    },
    async deleteChannel (item, index) {
      console.log('deleteChannel')
      this.channels.splice(index, 1)
      if (this.user) {
        // 登录状态下，请求删除频道
        await deletedUserChannel(item.id)
        return
      }
      // 未登录状态下，删除本地存储数据，——重新 映射本地存储
      window.localStorage.setItem('channels', JSON.stringify(this.channels))
    },
    handelUserChannel (item, index) {
      // console.log(this.aliveChannels.includes(item.name))
      // console.log(index)
      if (this.isEdit) {
        // 完成状态下——跳转至频道页，频道高亮显示
        this.changChannel(item, index)
      } else {
        // 编辑状态下——删除频道
        // 判断是否是推荐频道
        // console.log(this.aliveChannels)
        !this.aliveChannels.includes(item.name) && this.deleteChannel(item, index)
      }
    },
    // 加载频道数据
    async loadAllChannels () {
      const data = await getAllChannels()
      data.channels.forEach(item => {
        // 用来遍历当前频道的数据和状态
        item.articles = [] // 存储频道的文章列表
        item.timestamp = Date.now()
        item.downPullLoading = false // 下拉刷新状态
        item.upPullLoading = false // 上拉加载状态
        item.upPullFinished = false // 是否加载完毕
      })
      // console.log(data)
      this.allChannels = data.channels
    },
    // 点击向我的频道添加数据
    async handelAddChannel (item) {
      // console.log(item)
      this.channels.push(item)
      // push向后面追加
      // 持久化储存
      if (this.user) {
        // user,计算属性当中

        const data = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id, // 频道id
            seq: index + 2 // 频道序号
          }
        })
        // console.log(data)
        // 登录状态下，将数据请求添加到后端
        await resetUserChannels(data)
        return
      }
      // 没有登录状态，将数据持久化存储到本地储存
      // 本地存储不能修改，只能重写， 更改之后重新存储
      window.localStorage.setItem('channels', JSON.stringify(this.channels))
    }
  }
}
</script>

<style lang='less' scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 22px;
    }
    .action {
      color: red
    }
  }
  .channel-content {
    margin: 0 20px;
    .text {
      font-size: 20px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 28px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
