/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-21 23:19:45
 * @modify date 2020-10-21 23:19:45
 * @desc [exec的基本写法]
 */

const { exec } = require("child_process");

exec("ls ../", (error, stdout, stderr) => {
  console.log("error", error);
  console.log("stdout", stdout);
  console.log("stderr", stderr);
});

// exec(cmd, options, fn)
