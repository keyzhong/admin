/**
 * 获取素材列表
 */
import request from '@/utils/request'
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    query: {
      page: params.page,
      pre_page: params.pre_page
    },
    params
  })
}
