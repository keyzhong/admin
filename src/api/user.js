/**
 * 用户请求模块
 */
import request from '@/utils/request.js'

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserInfo = (data) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    data
  })
}
