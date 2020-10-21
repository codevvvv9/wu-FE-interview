/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-21 23:20:28
 * @modify date 2020-10-21 23:20:28
 * @desc [exec的回调改成promise]
 */

const { exec } = require("child_process");
const util = require("util");

const execWithPromise = util.promisify(exec);

execWithPromise('ls -l').then((data) => {
  console.log("data", data);
});
