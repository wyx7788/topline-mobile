import Vue from 'vue'

export default new Vue()

// 创建一个  vue  新实例
// 这个 vue 实例 与 main.js  中的 Vue 实例没有任何关系


// vue 实例有俩个方法
// $on   监听一个自定义事件
// $emit   发布一个自定义事件

// 我们可以利用这个vue 实例在任何需要组件通信的组件去使用 $on  $emit 
// 为什么单独创建一个vue  实例？  组件不都是 vue 实例的成员吗？
// 这主要是为了保护她的特性，如果 你在组件中去  this.$emit, 他是向发布事件的