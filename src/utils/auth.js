// 操作本地存储中的用户数据信息  封装一个模板
// 然后在任何需要操作本地存储中 user 的地方去使用

const USER_KEY = 'user'

// 获取本地user 数据
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 设置本地user数据
export const saveUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

// 移除本地user数据
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
