<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
      >
        <div slot="icon">
          <img class="avatar" src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU" alt="">
        </div>
        <div slot="title">
          <span>只是为了好玩儿</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>hello world</p>
          <p>
            <span>2019-7-17 14:08:20</span>
            ·
            <span>回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {},
  methods: {
    onLoad () {
      console.log('onLoad')
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
