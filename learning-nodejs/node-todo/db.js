/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-07-12 17:24:24
 * @modify date 2020-07-12 17:24:24
 * @desc [代码封装，数据库的读写功能]
 */

const fs = require("fs");
const path = require("path");
//获取家目录 ~
const homedir = require("os").homedir();
//如果自己设置了私有的Home就用私有的
const home = process.env.HOME || homedir;
//在你的系统家目录下的 ~/.todo
const dbPath = path.join(home, ".todo");
/**
 * 构建db对象，做任务的读写功能
 */
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (readError, data) => {
        if (readError) return reject(readError);
        //存任务的数组
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error) {
          list = [];
        }
        resolve(list)
      });
    });
  },
  write(data, path = dbPath) {
    return new Promise((resolve, reject) => { 
      const taskString = JSON.stringify(data);
      //把添加的任务写入到~/.todo中,taskString + "\n" 用来换行
      fs.writeFile(path, taskString + "\n", (writeError) => {
        if (writeError) return reject(writeError)
        resolve()
      });
    })
  },
};

module.exports = db
