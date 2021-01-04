/**
 * @author [wushaolin]
 * @email [wslsdust@163.com]
 * @create date 2021-01-04 19:39:26
 * @modify date 2021-01-04 19:45:30
 * @desc [promise升级异步回调]
 */
fetch(id_url) 
  .then((response) => {
    return response.text
  })
  .then((response) => {
    let new_name_url = name_url + "?id" + response
    return fetch(new_name_url)
  }).then((response) => {
    return response.text()
  }).then((response) => {
    console.log('response is', response);
  })
 
