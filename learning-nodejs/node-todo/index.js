const fs = require('fs')
const path = require("path")
//获取家目录 ~
const homedir = require('os').homedir();
console.log("homedir", homedir)
//如果自己设置了私有的Home就用私有的
const home = process.env.HOME || homedir
console.log("home", home)
//在你的系统家目录下的 ~/.todo
const dbPath = path.join(home, ".todo")
console.log("dbPath", dbPath)

module.exports.add = (title) => {
  console.log('title is', title);
  //1、读取之前的任务
  fs.readFile(dbPath, {flag: "a+"}, (readError, data) => {
    if (readError) {
      //如果读取错误，打印读取错误
      console.log('read file error is: ', readError);
    } else {
      //存任务的数组
      let list
      try {
        list = JSON.parse(data.toString())
      } catch (error) {
        list = []
      }

      console.log('list is: ', list);
      const task = {
        title: title,
        done: false
      }
      list.push(task)
      console.log('after list push is: ', list);
      const taskString = JSON.stringify(list)
      //把添加的任务写入到~/.todo中,taskString + "\n" 用来换行
      fs.writeFile(dbPath, taskString + "\n", (writeError) => {
        console.log('write task error is: ', writeError);
      })
    }
  })
}
