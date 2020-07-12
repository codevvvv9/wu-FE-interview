function getCode() {
  return axios.get('./code.json')
}
function getList(params) {
  return axios.get('./person.json', {params})
}



async function getResult(params) {
  try {
    console.log("我是getResult函数");
    let code = await getCode()
    console.log('code.data.code', code.data.code);
    if (code.data.code === 0) {
      var params = {
        code: code.data.code
      }
      let list = await getList(params)
      console.log('list.data.list', list.data.list);
    }
    
  } catch (error) {
    console.log('error is', error);
  } finally {
    
  }
}

getResult()