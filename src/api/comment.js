import request from '@/utils/request'

// 评论（回复）列表 接口
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

// 添加评论（回复） 接口
export const addComments = ({
  target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
  content, // 评论内容
  articleId = null, // 对文章进行评论，不要传此参数。
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
      content, // 评论内容
      art_id: articleId, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
    }
  })
}