let promise = new Promise(function(resolve, reject) {
  // 当Promise被构造完成后，自动执行此函数
  resolve('state: fulfilled, result: done')
  reject("state: rejected, result: error")
})
promise.then((value) => {
  console.log(value);
  
}, (error) => {
  console.log(error);
  
})