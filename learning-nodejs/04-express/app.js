const express = require("express")
const logger = require("./logger.js")

const app = express()
const PORT = 3000

app.use(logger('dev'))

app.use((request, response, next) => {
  if (request.path === '/xxx') {
    response.write('xxx')
  }
  next()
})
//其实等价于下面的简写

app.use('/equal', (request, response, next) => {
  response.write('equal')
  next()
})

//也可以判断方法类型

app.use((request, response, next) => {
  if (request.path === '/a' && request.method === 'POST') {
    response.write('a')
  } else {
    console.log("request", request.method)
    response.write('方法类型不匹配')
  }

  next()
})

//等价于
app.get((request, response, next) => {
  if (request.path === '/b') {
    //做各种处理
  }
})
app.use((request, response, next) => {
  // response.send('hi') //只能发送一次，应该改为write
  response.write('hi') //只能发送一次，应该改为write
  next() //两个use需要使用next
})
app.use((request, response, next) => {
  response.write('hi22')
  response.end()
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
})