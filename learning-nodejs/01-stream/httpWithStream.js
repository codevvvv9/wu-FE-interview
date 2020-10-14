/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-14 22:22:17
 * @modify date 2020-10-14 22:22:17
 * @desc [使用stream读，http访问]
 */
const http = require('http')
const fs = require('fs')

const server = http.createServer()
server.on('request', (request, response) => {
  const stream = fs.createReadStream('./big_file.txt')
  stream.pipe(response)
  console.log('done');
})

server.listen(8889)
console.log('监听8889');