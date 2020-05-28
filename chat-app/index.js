// 引入模块
let express = require('express')
let socket = require('socket.io')

//实例化express对象
let app = express()

//监听端口号,相当于有了这样一个服务器
let server = app.listen(4000, () => console.log('服务器正在4000端口上运行……'));

//需要让服务器识别静态文件
app.use(express.static('public'))

//设置socket.io  在服务端的配置
let io = socket(server)
io.on('connection', (socket) => {
  console.log('实现socket连接' );

  //获取客户端发送的数据 （chat）
  socket.on("chat", (message) => {
    io.sockets.emit("chat", message)
  })

  //获取客户端发送的数据(typing)
  socket.on("typing", (message) => {
    //socket.io的广播方法
    socket.broadcast.emit("typing", message)
  })
})
