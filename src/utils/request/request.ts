import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?:RequestInterceptors

  constructor (config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors

    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('全局请求拦截器')
        return res
      },
      (err: any) => err
    )
    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.reponseInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.reponseInterceptors,
      this.interceptorsObj?.reponseInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局相应拦截器')
        return res.data
      },
      (err: any) => err
    )
  }

  request (config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
}

export default Request
