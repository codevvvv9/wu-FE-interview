import * as http from "http";

const server = http.createServer();

server.on('request', (request:http.IncomingMessage, response:http.ServerResponse) => {
  console.log('request.method', request.method);
  console.log('request.url', request.url);
  console.log('request.headers', request.headers);
  
  // 监听post请求的
  const array: Buffer[] = []
  request.on('data', chunk => {
    array.push(chunk)
  })
  request.on('end', () => {
    const body = Buffer.concat(array).toString()
    console.log('body is', body);
    //接受数据完毕后可以更改response
    response.statusCode = 400
    response.setHeader('Content-Type', 'testtest')
    response.write('1\n')
    response.write('2\n')
    response.write('3\n')
    response.end('hi');
  })
})

server.listen(8888, () => {
})