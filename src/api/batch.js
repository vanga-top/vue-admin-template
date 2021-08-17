import request from '@/utils/request'

export function postOrderQuery(param) {
  return request({
    url: '/order/condition',
    params: param,
    method: 'get'
  })
}

export function queryCourseList(param) {
  return request({
    url: '/course/condition',
    params: param,
    method: 'get'
  })
}

export function loadAllCoachInfo() {
  return request({
    url: '/coach/all',
    method: 'get'
  })
}

export function queryUserNameList(param) {
  return request({
    url: '/user/nameList',
    method: 'get',
    params: param
  })
}
