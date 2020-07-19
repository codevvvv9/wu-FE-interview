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

  switch (pathname) {
    case "/index.html":
      response.setHeader("Content-Type", "text/html; charset=utf-8")
      fs.readFile(path.resolve(publicPath, "index.html"), (err, data) => {
        if (err) throw err
        response.end(data.toString())
      })
      break;
    case "/style.css":
      response.setHeader("Content-Type", "text/css; charset=utf-8")
      fs.readFile(path.resolve(publicPath, "style.css"), (err, data) => {
        if (err) throw err
        response.end(data.toString())
      })
      break;
    case "/main.js":
      response.setHeader("Content-Type", "text/javascript; charset=utf-8")
      fs.readFile(path.resolve(publicPath, "main.js"), (err, data) => {
        if (err) throw err
        response.end(data.toString())
      })
      break;
    default:
      break;
  }
})

server.listen(8888, () => {
})