1. yarn init -y
2. touch index.ts
3. yarn add --dev @types/node 安装node声明文件
4. 引入http模块（webstorm自动引入，但是vscode需要配置`tsconfig.json`）
5. http模块创建`server`
6. 监听上述创建的`server`的request事件
7. server.listen(port),服务器监听一个具体的端口
8. 客户端模拟get访问数据（`curl -v http://localhost:port`）
9. 客户端模拟post访问数据（`curl -v -d "dataContent" http://localhost:port`）
