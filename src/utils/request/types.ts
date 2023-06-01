import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?:(config: AxiosRequestConfig) => AxiosRequestConfig
  requrstInterceptorsCatch?:(err:any) => any
  // 相应拦截
  reponseInterceptors?:(config: AxiosResponse) => AxiosResponse
  reponseInterceptorsCatch?:(err: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?:RequestInterceptors
}
