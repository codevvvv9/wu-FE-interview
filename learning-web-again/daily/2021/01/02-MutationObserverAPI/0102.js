//MutationObserver是监视DOM变化的异步API, 异步回调
let mutationObserver = new MutationObserver(function (mutations, observer) {
  mutations.forEach(mutation => {
    console.log('mutation is', mutation);
  })
})

//实例方法1 observe()
//接受的第一个参数所要观察的DOM节点
let article = document.querySelector('article')
//接受的第二个参数 一个配置对象，指定要观察的特定运动
let options = {
  'childList': true,
  'attributes': true,
}
mutationObserver.observe(article, options)