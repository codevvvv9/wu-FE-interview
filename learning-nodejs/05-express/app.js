/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-31 17:53:04
 * @modify date 2020-10-31 17:53:04
 * @desc [学习express.xxx系列的7个API]
 */

//express.xxx系列api共有7个:1个 express() 6个方法
const express = require('express')

const app = express() //1、构建应用
const PORT = 3000 

app.set('case sensitive routing', true) //1、必须设置在最开始，是保证项目的路由是否强制大小写，默认为false，大小写一样
app.set("views", "views")  //2、应用使用的视图在哪个目录
app.set("view engine", "ejs") //3、模板引擎使用哪一个
app.use(express.json()) //2、解析发送的json文件,然后request.body会是一个object
app.use(express.static('static')) //3、解析静态文件，默认会优先从设定的这个目录下寻找内容
app.use(express.urlencoded()) //

app.get('/test', (req, res, next) => {
  res.render('demo', {pageTitle: "EJS测试"}) //render的第一个参数就是views里面第一个文件的名字
})

app.get('/style.css', (req, res, next) => {
  res.send('style.css')
})
app.use((request, response, next) => {
  console.log("request", request.body)
  // request.on('data', (chunk) => {
  //   console.log(chunk.toString());
  // })
  response.send('hi')
  response.end()
})

app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
})