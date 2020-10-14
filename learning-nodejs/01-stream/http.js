/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-14 22:21:23
 * @modify date 2020-10-14 22:21:23
 * @desc [使用fs读本地文件，http网络访问]
 */

const http = require('http')
const fs = require('fs')

const server = http.createServer()
server.on('request', (request, response) => {
  fs.readFile('./big_file.txt', (error, data) => {
    if (error) throw error

    response.end(data)
    console.log('done');
  })
})

server.listen(8888)
console.log('监听8888');