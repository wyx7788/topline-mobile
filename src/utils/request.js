import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import router from '@/router'
// axios.create  用于创建一个  axios 实例， 该实例和 axios 的功能一模一样 。
// 说白了就是 克隆了一个  axios
// 为什么要这样做呢， 我们 可以拥有 多个不同的请求函数， 而他们的配置可能是 不一样的
// 例如  有些项目中可能会涉及到使用  不同的接口路径
//       http:// toutiao.cn
//       http:// b.com
//       http:// a.com

const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 使用JSONbig 处理返回数据中超出 js 安全整数范围的数字
// JSONbig 自己会分析数据中的哪个数字超出最大范围
request.defaults.transformResponse = [function (data) {
  // data 是未经处理的后端相应数据JSON 格式字符串
  // 如果 data 不是一个JSON 格式的字符串， 会导致 JSONbig.parse 或者JSON.parse 转换失败并报异常
  // return JSONbig.parse(data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
    // 无法转换的数据直接原样返回
  }
}]

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果已登录了，为接口统一添加请求token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 响应拦截器
request.interceptors.response.use(function (response) {
  // Do something with response data

  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, async (error) => {
  // Do something with response error
  // console.dir(error)
  // token 过期后判断状态码 401
  if (error.response.status === 401) {
    // 判断是否有登录信息
    if (!store.state.user) {
      // 没有登录直接去登陆
      router.push({
        name: 'login'
      })
      return
    }
    // 如果是有登录信息了，使用refresh_token  重新获取token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${store.state.user.refresh_token}`
        }
      })
      // 新的token  获取成功
      // 通过vue x 容器更改数据
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: store.state.user.refresh_token
      })
      // 继续发送刚才的请求
      // 非刷新的token 的请求，使用request 走正常请求拦截器
      return request(error.config)
    } catch (error) {
      // token 请求失败，就直接跳转登录吧
      router.push({
        name: 'login'
      })
    }
  }
  return Promise.reject(error)
})

export default request
