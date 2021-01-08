/**
 * @author [wushaolin]
 * @email [wslsdust@163.com]
 * @create date 2021-01-06 21:26:03
 * @modify date 2021-01-07 10:38:20
 * @desc [使用async/await改造getResult]
 */

async function getResult() {
  try {
    let id_res = await fetch(id_url);
    let id_text = await id_res.text();

    let new_name_url = name_url + "?id=" + id_text;

    let name_res = await fetch(new_name_url);
    let name_text = await name_res.text();
  } catch (error) {
    console.error(error);
  }
}

/**
 * 上面这种写法是不是很像同步写法
 * 其中async函数是一个通过 异步执行的并隐式返回Promise作为结果的函数
 * 简单的理解这种异步模式就是：
 * 1、await执行到的时候，会暂停async函数
 * 2、等待这个函数执行完了（其实就是await后面的promise实例对象状态变成resolve态时），再继续执行async函数
 * 详细的理解async/await：
 * 1、异步执行：如果在async函数里面写了await,遇到await时，async函数
 */
