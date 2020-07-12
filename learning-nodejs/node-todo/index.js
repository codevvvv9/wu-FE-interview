const db = require("./db.js")

module.exports.add = async (title) => {
  //1、读取之前的任务
  const list = await db.read()
  //2、往任务列表里面增加任务项
  list.push({title, done: false})
  //3、存储任务到文件中
  await db.write(list)
}
