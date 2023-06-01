import request from '../utils/request'
interface SearchParams {
  pageNumber: number,
  pageSize: number,
  username: string
}
export function getUserList (data: SearchParams) :Promise<any> {
  return request({
    url: '/system/user/list',
    method: 'post',
    data
  })
}
