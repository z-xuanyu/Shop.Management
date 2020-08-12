import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: 'auth/admin/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: 'auth/admin/info',
    method: 'get'
  })
}
// 退出登录
export function logout() {
  return request({
    url: 'https://www.fastmock.site/mock/35513a0f1d224c85247701864cd0732f/todo/logout',
    method: 'post'
  })
}
