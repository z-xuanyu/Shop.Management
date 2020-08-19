import request from '@/utils/request'

// 添加会员收货地址
export function addMemberAddress(data) {
  return request({
    url: 'receiptAddress',
    method: 'post',
    data
  })
}

// 获取会员收货地址
export function getMemberAddress(params) {
  return request({
    url: 'receiptAddress/list',
    method: 'get',
    params
  })
}

// 更新会员收货地址
export function updataMemberAddressInfo(data) {
  return request({
    url: `receiptAddress/${data._id}`,
    method: 'put',
    data
  })
}

// 删除会员地址
export function deleteMemberAddress(id) {
  return request({
    url: `receiptAddress/${id}`,
    method: 'delete'
  })
}

// 设置默认收货地址
export function setDefaultAddress(data) {
  return request({
    url: `receiptAddress/setDefault`,
    method: 'put',
    data
  })
}
