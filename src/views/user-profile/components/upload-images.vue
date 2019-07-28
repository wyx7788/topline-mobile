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
      <input  @change="handleFileChange" type="file" ref="file" style="display:none">
      <van-cell value="拍照" />
    </van-cell-group>
  </van-dialog>
</div>
</template>

<script>
import { uploadImagesApi } from '@/api/user'
import { ImagePreview } from 'vant'
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
    return {
      previewImage: null
    }
  },
  methods: {
    handelShowPhoto () {
      this.file.click()
    },
    handleFileChange () {
      // console.log('xuanzele')
      // ImagePreview([
      //   'https://img.yzcdn.cn/2.jpg'
      // ])
      const reader = new FileReader()
      console.log(this.file.files[0]) // dom元素
      reader.readAsDataURL(this.file.files[0])
      // readAsDataURL 方法会读取指定的 Blob 或 File 对象。
      // 读取操作完成的时候，readyState 会变成已完成DONE，
      // 并触发 loadend 事件，
      // 同时 result 属性将包含一个data:URL格式的字符串（base64编码）
      // 以表示所读取文件的内容。
      console.log(reader)
      reader.onload = () => {
        // console.log(reader.result)  // base64 编码的图片文件
        this.previewImage = ImagePreview({
          images: [
            reader.result // base64 编码的图片文件
          ],
          showIndex: false, // 是否显示页码
          onClose: this.handlePreviewImageClose,
          asyncClose: true
        })
      }
    },
    handlePreviewImageClose () {
      this.$dialog.confirm({
        message: '是否设置该图片为头像？'
      }).then(() => {
        // on confirm
        // console,log(this)
        // 关闭图片预览
        this.previewImage.close()
        this.$emit('input', false)
        this.upLoadPhoto()
      }).catch(() => {
        // on cancel
      })
    },
    // 请求接口上传头像
    async upLoadPhoto () {
      try {
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '头像上传中'
        })
        const data = await uploadImagesApi('photo', this.file.files[0])
        this.$toast.success('更新头像成功')
        this.$emit('upload-success', data.photo)
        // 清除loading
        toast.clear()
      } catch (err) {
        this.$toast.fail('更新头像失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-cell__value--alone{
  text-align: center;
}
</style>
