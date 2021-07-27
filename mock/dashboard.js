const Mock = require('mockjs')

const data = Mock.mock({
  avgScores: '@float(0, 10.0)',
  runTask: '@integer(10, 300)',
  warnTask: '@integer(10, 300)',
  rank: '@integer(1, 300)'
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
  }
]
