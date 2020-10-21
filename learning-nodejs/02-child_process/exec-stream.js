/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-21 23:19:22
 * @modify date 2020-10-21 23:19:22
 * @desc [exec的流式写法]
 */

const { exec } = require("child_process");

const child = exec("ls -l"); //这是一个流

child.stdout.on("data", (chunk) => {
  console.log("chunk", chunk);
});
