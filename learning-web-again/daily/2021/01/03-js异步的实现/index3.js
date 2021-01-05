/**
 * @author [wushaolin]
 * @email [wslsdust@163.com]
 * @create date 2021-01-04 19:52:11
 * @modify date 2021-01-05 19:54:12
 * @desc [使用generator改造异步回调]
 */
/**
 * 如果我们能把index2.js中连续的then函数用这种同步的形式来书写代码的话
 * function getResult() {
        let id = getUserID()
        let name = getUserName(id)
        return name
    }
 * 那么如何才能够做到这一点呢，一个可行的方式就是:
 * 1. getResult函数内部执行到异步函数时，就暂停当前函数
 * 2. 执行遇到的这个异步函数，异步函数返回结果后，再接着执行getResult函数
 * 所以这个模型的关键就是 函数暂停执行与函数恢复执行
 * es6引入了生成器就是为了上述两个关键点而设计的
*/


//1、使用生成器的方式写的伪代码
function* getResult() {
    yield 'getUserID'
    yield 'getUserName'
    
    return 'name'
    
}

let result = getResult()

result.next().value //userID
result.next().value //userName
result.next().value // 返回真实的名字

//上面代码的实现原理使用了协程的概念，协程是线程的更轻量级的实现
//线程里面可以有多个协程，但是只能同时运行一个协程，而且他的控制权不在系统内核，在用户态。
//所以性能有了很大的提升，不会像线程切换那样消耗资源。

//2、真正使用

function* getResult() {
   let id_res = yield fetch(id_url)
   console.log('id_res', id_res); 
   let id_text = yield id_res.text()
   console.log('id_text', id_text);
   
   let new_name_url = name_url + '?id=' + id_text
   console.log('new_name_url', new_name_url);
   
   let name_res = yield fetch(new_name_url)
   console.log('name_res', name_res);
   let name_text = yield name_res.text()
   console.log('name_text', name_text);
}

let result = getResult()

result.next().value.then(res => {
    return result.next(res).value
}).then(res => {
    return result.next(res).value
}).then(res => {
    return result.next(res).value
}).then(res => {
    return result.next(res).value
})