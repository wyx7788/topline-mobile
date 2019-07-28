<template>
<div>
  <van-action-sheet
    :value="value"
    @input="$emit('input',$event)"
  >
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="handelBirthday"
    @cancel="handelCancel"
  />
  </van-action-sheet>
</div>
</template>

<script>
export default {
  name: 'birthday',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userProfile: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      currentDate: new Date(),
      minDate: new Date(1542, 1, 1),
      maxDate: new Date(2019, 10, 1)
    }
  },
  created () {
    if (this.userProfile.birthday) {
      this.currentDate = this.userProfile.birthday
    }
  },
  methods: {
    handelBirthday (value) {
      // console.log(value)
      const day = new Date(value)
      const resDate = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
      this.userProfile.birthday = resDate
      // console.log(this.userProfile.birthday)
      this.handelCancel()
    },
    handelCancel () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
