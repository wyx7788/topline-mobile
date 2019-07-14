import request from '@/utils/request'

// 获取推荐频道文章列表数据
export const getArticles = ({
  channelId, // 频道ID
  timestamp, // 时间戳 （用于分页）
  withTop // 是否包含置顶，进入页面第一次请求时，要包含置顶的文章，1 表示包含置顶，0 表示不包含置顶
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
