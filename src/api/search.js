import request from '@/utils/request'

// 搜索页面联想建议
export const getSuggestion = (q) => {
  return request({
    method:'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}