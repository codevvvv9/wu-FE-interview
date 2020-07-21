import * as http from "http";
import * as fs from "fs"
import * as path from "path";
import * as url from "url";

const server = http.createServer();
const publicPath = path.resolve(__dirname, "public");
console.log("process.argv", process.argv);
let cacheAge: number = 3600 *24 * (Number(process.argv[3])) || 3600 *24 * 100
console.log('cacheAge', cacheAge);

server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
  const { url: requestUrl, method } = request
  let truePath = requestUrl || ""
  const {pathname} = url.parse(truePath)
  //静态服务器只能做get请求
  if (method !== "GET") {
    response.statusCode = 405
    response.end("非法操作！！！")
    return 
  }
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
      //返回文件内容
      response.setHeader("Cache-control", `max-age=${cacheAge}, public`)
      response.end(data)
    }
  })
})

server.listen(8888, () => {
})