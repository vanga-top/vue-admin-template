import request from '@/utils/request'

/**
 * 初始化panel的数据
 */
export function initPanelData(params) {
  return request({
    url: '/dashboard/panel/init',
    method: 'get',
    params
  })
}

export function getLineData(params) {
  return request({
    url: '/dashboard/line/data',
    method: 'get',
    params
  })
}
