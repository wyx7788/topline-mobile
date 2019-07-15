<template>
<div>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '95%' }"
  >
    <div class="channels">
      <div class="header">
        <div>
          <span>我的频道</span>
          <span>点击进入频道</span>
        </div>
        <div>
          <button>编辑</button>
        </div>
      </div>
      <div class="concent">
        <van-grid :border="false" :column-num="4">
          <van-grid-item
            v-for="(channelsItem,index) in channels"
            :key="channelsItem.id"
          >
            <span
            slot="text"
            class="text"
            :class="{active: index === activeChangeIndex}"
            >{{channelsItem.name}}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</div>
</template>

<script>
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
    }
  }
}
</script>

<style lang='less' scoped>
.text{
  font-size: 22px
}
.active{
  color: red
}
</style>
