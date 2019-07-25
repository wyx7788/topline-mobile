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

// 对文章不喜欢
export const disLikesArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}

// 举报文章
export const reportArticle = ({
  articleId,
  type,
  remark
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type,
      remark
    }
  })
}

// 获取新闻文章详情
export const getArticleContent = (articleId) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 对文章点赞
export const likeArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 取消对文章点赞
export const unLikeArticle = (articleId) => {
  return  request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

// 取消对文章不喜欢
export const unDisLikesArticle = (articleId) => {
  return  request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}
