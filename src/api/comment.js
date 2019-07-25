import request from '@/utils/request'


export const getCommentArticle = ({
  articleId,
  offset,
  limit
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: 'a',// 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      source: articleId,
      offset,
      limit
    }
  })
}