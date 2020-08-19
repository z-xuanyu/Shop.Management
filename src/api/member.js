import request from '@/utils/request'

// 添加会员
export function addMember(data) {
  return request({
    url: 'members',
    method: 'post',
    data
  })
}

// 获取会员列表
export function getMemberList(params) {
  return request({
    url: 'members/list',
    method: 'get',
    params
  })
}

// 获取会员详细信息
export function getMemberInfo(id) {
  return request({
    url: `members/${id}`,
    method: 'get'
  })
}

// 更新会员信息
export function updataMemberInfo(data) {
  return request({
    url: `members/${data._id}`,
    method: 'put',
    data
  })
}

// 删除会员
export function deleteMember(id) {
  return request({
    url: `members/${id}`,
    method: 'delete'
  })
}

// 重置会员密码
export function resetMemberPassword(data) {
  return request({
    url: 'members/resetMemberPassword',
    method: 'put',
    data
  })
}
