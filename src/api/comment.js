import request from '@/utils/request'

export const getComments = ({
  isArticle = true,
  source,
  offset,
  limit
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: isArticle ? 'a' : 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      source,
      offset,
      limit
    }
  })
}
