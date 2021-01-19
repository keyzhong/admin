/**
 * axios 请求模块
 */
import axios from 'axios'

// 创建axios实例
// 通过这个实例发请求 把配置交给这个实例处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器

// 响应拦截器

// 导出
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
