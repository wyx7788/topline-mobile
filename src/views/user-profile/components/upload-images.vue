<template>
<div>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    show-cancel-button
    :show-confirm-button="false"
  >
    <van-cell-group>
      <van-cell @click="handelShowPhoto" value="选择相册照片" />
      <input type="file" ref="file" style="display:none">
      <van-cell value="拍照" />
    </van-cell-group>
  </van-dialog>
</div>
</template>

<script>
import { uploadImagesApi } from '@/api/user'
export default {
  name: 'uploadImages',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  data () {
    return {}
  },
  methods: {
    handelShowPhoto () {
      this.file.click()
    }
  }
}
</script>

<style lang='less' scoped>
.van-cell__value--alone{
  text-align: center;
}
</style>
