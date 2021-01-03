/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2021-01-03 22:35:33
 * @modify date 2021-01-03 22:35:33
 * @desc [V8如何实现async/await]
 */

//1. 先通过一个小🌰了解回调地狱
/**
 * 假设你们老板给了你一个小需求，要求你从网络获取某个用户的用户名，获取用户名称的步骤是先通过一个 id_url 来获取用户 ID
 * 然后再使用获取到的用户 ID 作为另外一个 name_url 的参数，以获取用户名。
 * const id_url = 'https://raw.githubusercontent.com/binaryacademy/geektime-v8/master/id'
 * const name_url = 'https://raw.githubusercontent.com/binaryacademy/geektime-v8/master/name'
 * 回调分为 同步回调和异步回调
 * 同步回调是指 回调在执行函数内部执行
 * 异步回调是指 回调在执行函数外部被执行
 */
const id_url = 'https://raw.githubusercontent.com/binaryacademy/geektime-v8/master/id'
const name_url = 'https://raw.githubusercontent.com/binaryacademy/geektime-v8/master/name'

function GetUrlContent(resultCallback, url) {
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'text'
  request.onload = function () {
    resultCallback(request.response)
  }
  request.send()
}

function IDCallback(id) {
  console.log('id is', id);
  let newNameUrl = name_url + "?id=" + id
  GetUrlContent(NameCallBack, newNameUrl)
}

function NameCallBack(name) {
  console.log('name is', name);
}

GetUrlContent(IDCallback, id_url)