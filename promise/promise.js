/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-05-07 22:36:06
 * @modify date 2020-05-07 22:36:06
 * @desc [学习链式promise]
 */

function getUserInfo(name) {
  return new Promise(function (resolve, reject) {
    if (name === "wushaolin") {
      console.log("我认识吴少林");
      resolve(name); // 传递给then中回调函数的value
    } else {
      console.log("我不认识这个人");
      reject("没有这个人");
    }
  });
}
function printUserInfo(userInfo) {
  return new Promise(function (resolve, reject) {
    console.log('userInfo is: ', userInfo);
    resolve(userInfo);
  });
}
function printErrorInfo(errorInfo) {
  console.log("errorInfo is:", errorInfo);
  // return undefined // 只打印的话：隐藏语句是它，你什么也不返回，认为你处理好了，后续的成功函数可以执行
  //为了表示我不对错误负责， 应该使用reject
  // return new Promise(function (resolve, reject) {
  //   reject() //我没搞定，后面的成功函数不要执行了
  // })

  //以上很长的return可以用以下的代替
  // return Promise.reject("我没搞定")

  // 同样的这里可以进行兜底操作，就认为成功了
  return Promise.resolve("wushaolin") //重新引导进入后续的正确函数的回调里面
}
function printErrorInfo2(errorInfo2) {
  console.log("errorInfo2 is:", errorInfo2);
  // return Promise.reject("第二次我没搞定")
}
function printErrorInfo3(errorInfo3) {
  console.log("errorInfo3 is:", errorInfo3);
}
function getAnotherUserInfo(userInfo) {
  return new Promise(function (resolve, reject) {
    resolve(userInfo);
  });
}
function getFriendInfo(name) {
  console.log('获取好友信息');
  
  return new Promise(function (resolve, reject) {
    if (name === "wushaolin") {
      resolve("吴少林的好友：王力宏、周杰伦");
    } else {
      reject("这个人没有好友信息");
    }
  });
}
getUserInfo("wusaolin")
  .then(printUserInfo, printErrorInfo) // 在这里把失败函数printErrorInfo写上并且没有reject，那么意味着失败已经被处理好了，后续正确函数会被执行，如果两个函数都处理了reject,才会进入后续的错误处理函数
  .then(getFriendInfo, printErrorInfo2) // 打印获取好友信息
  .then(printUserInfo, printErrorInfo3)

  // getUserInfo("wusaolin")
  // .then(printUserInfo) // 在这里没把失败函数printErrorInfo写上，那么意味着失败我这没法处理，后续函数不会被执行
  // .then(getFriendInfo)
  // .then(printUserInfo, printErrorInfo) 
