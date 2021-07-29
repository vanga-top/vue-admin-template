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

export function getScoreList(query) {
  return request({
    url: '/dashboard/score/list',
    method: 'get',
    params: query
  })
}

export function getBoxCardData(params) {
  return request({
    url: '/dashboard/boxcard/data',
    method: 'get',
    params
  })
}
