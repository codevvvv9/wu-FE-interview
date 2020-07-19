import * as http from "http";
import * as fs from "fs"
import * as path from "path";
import * as url from "url";

const server = http.createServer();
const publicPath = path.resolve(__dirname, "public");
server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
  const { url: requestUrl } = request
  let truePath = requestUrl || ""
  const {pathname, search} = url.parse(truePath)
  console.log("search", search)
  const filename = pathname?.substr(1) || ""
  fs.readFile(path.resolve(publicPath, filename), (err, data) => {
    if (err) {
      response.statusCode = 404
      response.end("你访问的文件不存在")
    }
    response.end(data.toString())
  })
})

server.listen(8888, () => {
})