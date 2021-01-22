/**
 * axios 请求模块
 */
import axios from 'axios'
import JSONbigInt from 'json-bigint'

// 创建axios实例
// 通过这个实例发请求 把配置交给这个实例处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/', // 请求的基础路径
  // 定义后端返回的原始数据的处理
  // 参数data就是后端返回 未经处理的JSON格式数据
  transformResponse: [
    function (data) {
      // axios 默认是 return JSON.parse(data)
      try {
        return JSONbigInt.parse(data)
      } catch {
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 发送请求之前的操作
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  } else {
    config.headers.Authorization =
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDI3NDk0OTQsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.R50JoDKYaEBlqAjBnYtnIjANFrtjyhQyKRcx8L00ME0'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做什么
  return response
}, function (error) {
  return Promise.reject(error)
})

// 导出
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
