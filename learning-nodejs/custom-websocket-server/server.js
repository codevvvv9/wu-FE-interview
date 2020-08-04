const http = require("http");


const PORT = 8889;
const hostname = "localhost"
//引入工具类
const {
  generateAcceptValue,
  parseMessage,
  constructReply,
} = require("./utils");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end("data is end");
});

server.on("upgrade", (req, socket) => {
  socket.on("data", (buffer) => {
    const message = parseMessage(buffer);

    if (message) {
      console.log("Message from client: " + message);
      socket.write(constructReply({ message }));
    } else if (message === null) {
      console.log("WebSocket connection closed by the client.");
    }
  });

  if (req.headers["upgrade"] !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request")
    return 
  }

  //读取客户端提供的Sec-WebSocket-Key
  const secWsKey = req.headers["sec-websocket-key"]
  //使用SHA-1算法生成Sec-WebSocket-Accept
  const hash = generateAcceptValue(secWsKey)
  //设置HTTP响应头
  const responseHeaders = [
    "HTTP/1.1 101 Web Socket Protocol Handshake",
    "Upgrade: WebSocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${hash}`,
  ]
  //返回握手请求的响应信息
  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n")
});

server.listen(PORT, hostname, () => {
  console.log(`Server is running on http://${hostname}:${PORT}`);
})
