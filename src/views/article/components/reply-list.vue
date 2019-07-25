<template>
<div>
  <van-popup
    :style="{ height: '80%' }"
    :value="value"
    round
    @input="$emit('input', $event)"
    position="bottom"
  >
  </van-popup>
</div>
</template>

<script>
export default {
  name: 'replyList',
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang='less' scoped>
</style>
