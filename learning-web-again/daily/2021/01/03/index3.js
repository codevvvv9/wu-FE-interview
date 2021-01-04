/**
 * @author [wushaolin]
 * @email [wslsdust@163.com]
 * @create date 2021-01-04 19:52:11
 * @modify date 2021-01-04 19:54:11
 * @desc [使用generator改造异步回调]
 */
//如果我们能把index2.js中连续的then函数用这种同步的形式来书写代码的话
//
function getResult() {
    let id = getUserID()
    let name = getUserName(id)
    return name
}
