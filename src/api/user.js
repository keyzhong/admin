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
    // 除了登录接口 其他接口都需要授权才能使用
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
    },
    data
  })
}
