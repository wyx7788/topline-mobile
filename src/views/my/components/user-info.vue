<template>
  <van-cell-group class="user-info">
    <van-cell class="base-info" is-link :border="false">
      <div slot="title">
        <img class="avatar" src="http://toutiao.meiduo.site/FgSTA3msGyxp5-Oufnm5c0kjVgW7" alt="">
        <span class="title">只是为了好玩儿</span>
      </div>
    </van-cell>
    <van-grid class="data-info" :border="false">
      <van-grid-item>
        <span class="count">1</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">2</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">3</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">4</span>
        <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return{}
  }
}
</script>

<style lang="less">
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
}
</style>