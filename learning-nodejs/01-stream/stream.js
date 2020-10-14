/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-10-14 22:20:58
 * @modify date 2020-10-14 22:20:58
 * @desc [基础的使用stream]
 */


const fs = require('fs')
const stream = fs.createWriteStream('./big_file.txt')
for (let i = 0; i < 100000; i++) {
  stream.write(`这是第${i}行内容,我们需要很多很多内容，要不停的写文件啊啊啊啊啊回车\n`)
}

stream.end() //stream一定记得关掉
console.log('done');
