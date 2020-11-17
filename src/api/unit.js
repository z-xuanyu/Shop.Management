// 商品单位Api
import request from '@/utils/request'

// 添加商品单位
export function addUnit(data) {
  return request({
    url: 'unit',
    method: 'post',
    data
  })
}

// 获取商品单位列表
export function getUnitList(params) {
  return request({
    url: 'unit/list',
    method: 'get',
    params
  })
}

// 删除商品单位
export function deleteUnit(id) {
  return request({
    url: `unit/${id}`,
    method: 'delete'
  })
}

// 编辑更新商品单位信息
export function updateUnit(data) {
  return request({
    url: `unit/${data._id}`,
    method: 'put',
    data
  })
}

// 改变商品单位状态
export function changeUnitStatus(params) {
  return request({
    url: 'unit/changeStatus',
    method: 'get',
    params
  })
}
