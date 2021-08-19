import request from '@/utils/request'

export function postOrderQuery(param) {
  return request({
    url: '/order/condition',
    params: param,
    method: 'get'
  })
}

export function postCreateOrder(param) {
  return request({
    url: '/order/create',
    params: param,
    method: 'post'
  })
}

export function queryCourseList(param) {
  return request({
    url: '/course/condition',
    params: param,
    method: 'get'
  })
}

export function queryCourseById(param) {
  return request({
    url: '/course/id',
    params: param,
    method: 'get'
  })
}

export function queryUserType(param) {
  return request({
    url: '/user/type',
    method: 'get',
    params: param
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
