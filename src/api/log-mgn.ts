import request from '../utils/request'
interface SearchParams {
  pageNumber: number,
  pageSize: number,
  keyword: string
}
export function getLogList (params: SearchParams) :Promise<any> {
  return request({
    url: '/system/log/list',
    method: 'get',
    params
  })
}
