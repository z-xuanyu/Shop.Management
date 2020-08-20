import request from '@/utils/request'

// 添加商品
export function addGoods(data) {
  return request({
    url: 'commodities',
    method: 'post',
    data
  })
}

// 获取商品列表
export function getGoodsList(params) {
  return request({
    url: 'commodities',
    method: 'get',
    params
  })
}

// 更新商品信息
export function updataGoodsInfo(data) {
  return request({
    url: `commodities/${data._id}`,
    method: 'put',
    data
  })
}

// 删除商品

export function deleteGoods(id) {
  return request({
    url: `commodities/${id}`,
    method: 'delete'
  })
}
