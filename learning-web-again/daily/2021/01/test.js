/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2021-01-01 23:21:07
 * @modify date 2021-01-01 23:21:07
 * @desc [学习使用V8调试工具d8, mac下直接brew install v8]
 */
//各平台编译好的d8工具
// mac平台:
// https://storage.googleapis.com/chromium-v8/official/canary/v8-mac64-dbg-8.4.109.zip
// linux32平台:
// https://storage.googleapis.com/chromium-v8/official/canary/v8-linux32-dbg-8.4.109.zip
// linux64平台:
// https://storage.googleapis.com/chromium-v8/official/canary/v8-linux64-dbg-8.4.109.zip
// win32平台:
// https://storage.googleapis.com/chromium-v8/official/canary/v8-win32-dbg-8.4.109.zip
// win64平台:
// https://storage.googleapis.com/chromium-v8/official/canary/v8-win64-dbg-8.4.109.zip
// let a = {x:1}
// function bar(obj) { 
//   return obj.x 
// }


// function foo () { 
//   let ret = 0
//   for(let i = 1; i < 10000; i++) {
//     ret += bar(a)
//   }
//   return ret
// }


// foo()


function strToArray(str) {
  let i = 0
  const len = str.length
  let arr = new Uint16Array(str.length)
  for (; i < len; ++i) {
    arr[i] = str.charCodeAt(i)
  }
  return arr;
}


function foo() {
  let i = 0
  let str = 'test V8 GC'
  while (i++ < 1e5) {
    strToArray(str);
  }
}


foo()