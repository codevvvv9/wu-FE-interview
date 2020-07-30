const http = require("http")
const crypto = require("crypto")

const hostname = "127.0.0.1"
const port = 3000
//魔法字符串
const MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

//http服务器主体部分
const server = http.createServer((req, res) => {
  res.end('websocket test\r\n');
})

//Upgrade请求处理
server.on('upgrade', handleUpgrade)

function handleUpgrade (req, socket) {
  //计算返回的key
  const RES_KEY = crypto.createHash('sha1')
    .update(req.headers['sec-websocket-key'] + MAGIC_STRING)
    .digest('base64')

  //构造响应头
  resHeaders = ([
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    'Test: Test',
    'Sec-WebSocket-Accept:' + RES_KEY
  ]).concat('', '').join('\r\n')

  //添加通信数据处理
  socket.on('data', data => {
    console.log('data aaaa is', data);
    //...
  })

  //响应数据给客户端
  socket.write(resHeaders)
}

server.listen(port, hostname, () => {
  console.log(`Server is running in http://${hostname}:${port}`);
})