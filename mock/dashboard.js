const Mock = require('mockjs')

const data = Mock.mock({
  avgScores: '@integer(0, 10.0)',
  messages: '@integer(10, 300)'
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
