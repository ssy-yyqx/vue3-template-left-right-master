import request from '../utils/request'
// 获取菜单树列表
export function getMenuTreeList () :Promise<any> {
  return request({
    url: '/module/tree',
    method: 'get'
  })
}
interface SearchNewsParams {
  pageSize: number,
  pageNumber: number,
  moduleId: string
}
// 获取新闻列表数据
export function getNewsListData (params: SearchNewsParams) :Promise<any> {
  return request({
    url: '/content/info/page',
    method: 'get',
    params
  })
}
