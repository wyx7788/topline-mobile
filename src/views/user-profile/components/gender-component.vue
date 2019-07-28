<template>
<div>
  <van-action-sheet
    :value="value"
    @input="$emit('input',$event)"
    :actions="actions"
    cancel-text="取消"
    :close-on-click-action="true"
    @select="onSelect"
  />
</div>
</template>

<script>
export default {
  name: 'genderComponent',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      actions: [
        { 
          name: '男',
          value: 0
        },
        { 
          name: '女',
          value: 1
        }
      ],
      gender: null
    }
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      
      this.gender = item.value
      // console.log(this.gender)
      this.$emit('getGender' ,this.gender)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
