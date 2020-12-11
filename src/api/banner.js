import request from '@/utils/request'

// 获取banner列表
export function getBannerList() {
  return request({
    url: 'banner',
    method: 'get'
  })
}

// 新增banner
export function addBanner(data) {
  return request({
    url: 'banner',
    method: 'post',
    data
  })
}

// 更新保存banner信息
export function updateBanner(data) {
  return request({
    url: `banner/${data._id}`,
    method: 'put',
    data
  })
}

// 删除banner
export function deleteBanner(id) {
  return request({
    url: `banner/${id}`,
    method: 'delete'
  })
}
