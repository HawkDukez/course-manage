const Mock = require('mockjs') // 获取mock对象
const domain = '/api' // 定义默认域名，随便写

const Data = req => {
  console.log(req) // 请求体，用于获取参数
  let status = 1
  return {
    status
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/notice.1`, 'post', Data)
