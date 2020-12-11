import request from '@/utils/request'

// 新增导航
export function addNavigator(data) {
  return request({
    url: 'navigator',
    method: 'post',
    data
  })
}

// 获取导航列表
export function getNavigatorList(params) {
  return request({
    url: 'navigator',
    method: 'get',
    params
  })
}

// 编辑导航信息
export function editNavigatorInfo(id) {
  return request({
    url: `navigator/${id}`,
    method: 'get'
  })
}

// 更新导航信息
export function updateNavigatorInfo(data) {
  return request({
    url: `navigator/${data._id}`,
    method: 'put',
    data
  })
}

// 删除导航
export function deleteNavigator(id) {
  return request({
    url: `navigator/${id}`,
    method: 'delete'
  })
}
