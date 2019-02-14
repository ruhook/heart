import Vue from 'vue'
import router from '@/router'
import qs from 'qs'
import axios from 'axios'
import { error } from './enum'

let STI_AJAX_BASEURL = '/api'
let STI_AJAX_TIMEOUT = 50000
let STI_LOGIN_URL = '/login'
let vue = new Vue()
const serialize = JSON.stringify

function extendToken(data) {
  return {
    ...data,
    'csrf_token': getToken() // 添加token信息
  }
}

function updateUser() {

}

function showLogin() {
  updateUser() // 清空账户信息
  router.push(STI_LOGIN_URL) // 跳转登录页面
}

// 自定义axios实例
const http = axios.create({
  baseURL: STI_AJAX_BASEURL,
  timeout: STI_AJAX_TIMEOUT,
  // 只适用'POST'、'PUT'、'PATCH'，序列化参数
  // 只适用'POST'、'PUT'、'PATCH'，序列化参数
  // transformRequest: [function(data) {
  //   let ret = '';
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //   }
  //   return ret
  // }],
  // 只适用'POST'、'PUT'、'PATCH'，序列化参数
  transformRequest: [function(data) {
    return serialize(data)
  }],
  // GET请求，序列化参数，只有在有参数的情况先才会执行
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
})
// let loading // 加载遮罩
/**
 * 请求拦截器
 * @return {[type]}          [description]
 */
http.interceptors.request.use(function(request) {
  let { method, data, params } = request

  let _data = request.data
  return request
})


/**
 * 响应拦截器
 * @return {[type]}                 [description]
 */
http.interceptors.response.use(function(response) {
  const { config, data } = response
  if (data.head.errCode) {
    vue.$notify.error({
      title: '提示',
      message: data.head.errMsg
    })
    return Promise.reject(data)
  }
  return data
}, function(error) {
  console.log(error)
  return Promise.reject(error)
})

/**
 * http工具函数
 * @param  {...[type]} config [description]
 * @return {[type]}         [description]
 */
const ajax = function(config) {
  return http(config)
}
// Object.defineProperty(ajax, 'csrfToken', {
//   enumerable: false,
//   configurable: false,
//   get() {
//     return getToken()
//   },
//   set(val) {
//     setToken(val)
//   }
// })

/**
 * POST操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.post = function(...args) {
  let [url, data = {}, options] = args
  console.log("%c%s", "color: blue;", url);
  let headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  if (localStorage.getItem('token')) {
    headers['token'] = localStorage.getItem('token')
  }
  return http({
    url,
    data,
    headers,
    method: 'post',
    ...options
  })
}
/**
 * GET操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.get = function(...args) {
  let [url, data, options] = args
  return http({
    url,
    params: data,
    method: 'get',
    ...options
  })
}

export default ajax.post