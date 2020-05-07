/**
 * @author Wu ShaoLin
 * @email wslsdust@163.com
 * @create date 2020-05-07 10:02:51
 * @modify date 2020-05-07 10:02:51
 * @desc [学习promise]
 */
function getCode() {
  return axios.get('./code.json')
}
function getList(params) {
  return axios.get('./person.json', {params})
}



function getFinal() {
  console.log('我是getFinal函数');
  getCode().then(res => {
    if (res.data.code === 0) {
      var params = {
        code: res.data.code
      }

      getList(params).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.list);
        }
      })
    }
  })
  
}

getFinal()