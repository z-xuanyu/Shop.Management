import request from '@/utils/request'

// 添加分类
export function addCategory(data) {
  return request({
    url: 'categories',
    method: 'post',
    data
  })
}

// 获取分类列表
export function getCategoryList() {
  return request({
    url: 'categories/list',
    method: 'get'
  })
}

// 编辑更新分类信息
export function updataCategoryInfo(data) {
  return request({
    url: `categories/${data._id}`,
    method: 'put',
    data
  })
}

// 删除分类
export function deleteCategory(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}
