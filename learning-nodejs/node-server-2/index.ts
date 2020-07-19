import * as http from "http";
import * as fs from "fs"
import * as path from "path";
import * as url from "url";

const server = http.createServer();
const publicPath = path.resolve(__dirname, "public");
server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
  const { url: requestUrl } = request
  let truePath = requestUrl || ""
  const {pathname} = url.parse(truePath)
  const filename = pathname?.substr(1) || "index.html"
  fs.readFile(path.resolve(publicPath, filename), (err, data) => {
    if (err) {
      if (err.errno === -2) {
        response.statusCode = 404
        fs.readFile(path.resolve(publicPath, "404.html"), (err, data) => {
          response.end(data)
        })
      } else {
        response.statusCode = 500
        response.end("服务器繁忙，稍后再试……")
      }
    } else {
      response.end(data)
    }
  })
})

server.listen(8888, () => {
})