import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
  responseType: 'json'
})
service.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken()
  if (token) {
    const headers = config.headers
    if (headers) {
      headers.Authorization = 'Bearer ' + token
    }
  }
  return config
})
service.interceptors.response.use(response => {
  const res = response.data
  if (String(res.code) !== '200') {
    if (String(res.code) === '401') {
      location.reload()
    } else {
      console.log(res.msg || 'Error')
    }
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return res
  }
},
error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

export default service
