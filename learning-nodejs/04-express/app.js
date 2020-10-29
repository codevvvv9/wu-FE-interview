const express = require("express")
const logger = require("./logger.js")

const app = express()
const PORT = 3000

app.use(logger('dev'))

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