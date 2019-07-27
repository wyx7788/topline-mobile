import request from '@/utils/request'

// 封装用户相关的接口请求函数

// 登录接口
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 拉黑用户
export const blackoutUsers = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}

// 关注用户
export const focusOnUsers = (userId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const unFocusOnUsers = (userId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取用户自己的信息
export const getCurrentUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

//获取用户个人资料
export const getCurrentUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
