import request from '@/utils/request'

// 获取管理员列表
export function getAdminList(data) {
  return request({
    url: 'users',
    method: 'get',
    params: data
  })
}

// 添加管理员
export function addAdmin(data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

// 查看管理员信息
export function getAdminInfo(id) {
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}

// 更新管理员信息
export function updataAdminInfo(data) {
  return request({
    url: `users/${data._id}`,
    method: 'put',
    data
  })
}

// 删除管理员
export function deleteAdminInfo(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 重置管理员密码
export function resetPasswordAdmin(data) {
  return request({
    url: 'users/reSetPassword',
    method: 'put',
    data
  })
}

// 改变管理员状态
export function changeStatusAdmin(data) {
  return request({
    url: 'users/changeStatus',
    method: 'put',
    data
  })
}
