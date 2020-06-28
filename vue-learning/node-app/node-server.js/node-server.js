//加载http模块
const http = require('http')

const hostname = "127.0.0.1"
const port = 8000

//创建服务器
const server = http.createServer((req, res) => {
  // 用 HTTP 状态码和内容类型（Content-Type）设置 HTTP 响应头
  res.statusCode = 200
  res.setHeader("Content-type", "text/plain")

   // 发送响应体
  res.write("ha ha ha  ")
  res.end("Hello node-server\n")
})

// 监听 8000 端口的请求，注册一个回调函数记录监听开始
server.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}/`);

})