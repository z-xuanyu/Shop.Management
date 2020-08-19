import request from '@/utils/request'

// 添加标签
export function addTag(data) {
  return request({
    url: 'tags',
    method: 'post',
    data
  })
}

// 获取标签列表
export function getTagList(params) {
  return request({
    url: 'tags/list',
    method: 'get',
    params
  })
}

// 更新标签信息

export function updataTagInfo(data) {
  return request({
    url: `tags/${data._id}`,
    method: 'put',
    data
  })
}

// 删除标签

export function deleteTag(id) {
  return request({
    url: `tags/${id}`,
    method: 'delete'
  })
}

// 改变标签状态
export function changeTagStatus(params) {
  return request({
    url: 'tags/changeStatus',
    method: 'get',
    params
  })
}
