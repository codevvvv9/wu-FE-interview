/**
 * @author [wushaolin]
 * @email [wslsdust@163.com]
 * @create date 2021-01-06 21:26:03
 * @modify date 2021-01-06 21:45:43
 * @desc [使用async/await改造getResult]
 */

 async function getResult() {
     try {
         let id_res = await fetch(id_url)
         let id_text = await id_res.text()

         let new_name_url = name_url + "?id=" + id_text
         
         let name_res = await fetch(new_name_url)
         let name_text = await name_res.text()
     } catch (error) {
        console.error(error);
     }
 }

/**
 * 上面这种写法是不是很像同步写法
 * 其中async函数是一个异步执行的返回隐式Promise的函数
 * await执行到的时候，会暂停async函数，等待这个函数执行完了（其实就是promise态变成resolve态时），在继续执行async函数
 */
