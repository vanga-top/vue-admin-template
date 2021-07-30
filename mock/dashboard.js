const Mock = require('mockjs')

const data = Mock.mock({
  avgScores: '@float(0, 10.0, 0, 2)',
  runTask: '@integer(10, 300)',
  warnTask: '@integer(10, 300)',
  rank: '@integer(1, 300)'
})

const listData = Mock.mock({
  avgScores: {
    'expectedData|7': ['@float(1.0, 9.9, 0, 2)'],
    'actualData|7': ['@float(1.0, 9.9, 0, 2)']
  },
  runTask: {
    'expectedData|7': ['@integer(100, 300)'],
    'actualData|7': ['@integer(100, 300)']
  },
  warnTask: {
    'expectedData|7': ['@integer(100, 300)'],
    'actualData|7': ['@integer(100, 300)']
  },
  rank: {
    'expectedData|7': ['@integer(100, 300)'],
    'actualData|7': ['@integer(100, 300)']
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
    url: '/dashboard/score/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          'items|20': [{
            fileId: '@guid()',
            timestamp: +Mock.Random.date('T'),
            username: '@name()',
            score: '@float(1.0, 9.9, 0, 2)',
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
          fileId: '@guid()',
          score: '@float(1.0, 9.9, 0, 2)',
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

