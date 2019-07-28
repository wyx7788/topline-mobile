<template>
<div>
  <van-action-sheet
  :value="value"
  @input="$emit('input', $event)"
  title="昵称">
    <van-cell-group>
      <van-field
      v-model="nameText.name"
      placeholder="请输入用户名"
      :clearable="true"/>
    </van-cell-group>
  </van-action-sheet>
</div>
</template>

<script>
export default {
  name: 'nameTitle',
  props: {
    nameText: {
      type: [String, Object],
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>

</style>
