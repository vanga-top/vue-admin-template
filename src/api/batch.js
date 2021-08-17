import request from '@/utils/request'

export function postOrderQuery(param) {
  return request({
    url: '/order/condition',
    params: param,
    method: 'get'
  })
}
