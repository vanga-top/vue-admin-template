const Mock = require('mockjs')

const data = Mock.mock({
  avgScores: '@float(0, 10.0)',
  runTask: '@integer(10, 300)',
  warnTask: '@integer(10, 300)',
  rank: '@integer(1, 300)'
})

const listData = Mock.mock({
  avgScores: {
    expectedData: [9.5, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5],
    actualData: [8.5, 9.5, 10.0, 6.7, 7.6, 9.5, 8.9]
  },
  runTask: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  warnTask: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  rank: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
})

module.exports = [
  {
    url: '/dashboard/panel/init',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success',
        data: data
      }
    }
  },
  {
    url: '/dashboard/line/data',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success',
        data: listData
      }
    }
  },
  {
    url: '/dashboard/transaction/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          'items|20': [{
            order_no: '@guid()',
            timestamp: +Mock.Random.date('T'),
            username: '@name()',
            price: '@float(1.0, 9.9, 0, 2)',
            'status|1': ['success', 'pending']
          }]
        }
      }
    }
  },
  {
    url: '/dashboard/boxcard/data',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          'items|20': [{
            name: '@guid()',
            score: '@integer(0,100)'
          }
          ]
        }
      }
    }
  }
]

