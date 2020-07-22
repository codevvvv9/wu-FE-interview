## node-server基本步骤
1. yarn init -y
2. touch index.ts
3. yarn add --dev @types/node 安装node声明文件
4. 引入http模块（webstorm自动引入，但是vscode需要配置`tsconfig.json`）
5. http模块创建`server`, http.createServer()的server是http.Server的实例，继承自net.Server
6. 监听上述创建的`server`的request事件
7. server.listen(port),服务器监听一个具体的端口
8. 客户端模拟get访问数据（`curl -v http://localhost:port`）
9. 客户端模拟post访问数据（`curl -v -d "dataContent" http://localhost:port`）

项目启动命令
```javascript
ts-node-dev index.ts
```
### get请求的小知识
1. request.method获取请求的动词
2，request.url获取请求路径（含查询参数）
3. request.headers获取请求头
4. get请求一般没有消息体和请求体
### post请求
1. curl -v -d "dataContent" http://localhost:port
2. request.on('data', fn)获取消息体
3. request.on('end', fn)拼接消息体
### request和response是啥
```javascript
server.on('request', (request, response) => {})
```
- request是http.IncomingMessage的实例, 继承自stream.Readable
- response是http.ServerResponse的实例, 继承自Stream
- 其中的request有headers method url 等属性
从stream.Readable类继承了data/end/error事件
不能直接拿到请求的消息体，与TCP有关，需要使用request.on事件监听，防止一次发送失败后无法断点续传。
- 其中response拥有getHeader/setHeader/end/write等方法
拥有statusCode属性，也继承自Stream

## 业界成熟的静态服务器对比
学习`http-server`和`node stati`