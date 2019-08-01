<template>
  <div>chat page</div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'ChatIndex',
  created () {
    const socket = io('http://ttapi.research.itcast.cn', { 
      // 可选对象，可以用来配置连接信息
      query: {
        token: this.$store.state.user.token
      }
    })
    socket.on('connect', () => {
      console.log('连接成功')
      // 给服务端发小消息，必须在连接成功以后
      socket.emit('message', { // 后端要求的数据格式
        msg: 'hello',
        timestamp: Date.now()
      })
    })
    // 服务端支持发小类型为 message 的消息
    // socket.emit('message', 数据)
    socket.on('message', data => {
      console.log('收到来自服务端的数据了', data)
    })
  }
}
</script>

<style>
</style>