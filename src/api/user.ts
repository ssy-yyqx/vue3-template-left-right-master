import request from '../utils/request'
// 登录
interface FormState {
  username: string;
  password: string;
}
export function login (data: FormState) :Promise<any> {
  return request({
    url: '/manager/login',
    method: 'post',
    data
  })
}
// 登出
export function logout () :Promise<any> {
  return new Promise(resolve => {
    resolve({
      code: '200',
      data: '',
      msg: '登出成功'
    })
  })
}
