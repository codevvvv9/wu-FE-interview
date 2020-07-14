const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}
/**
 * jest构造的假函数进行拦截
 * @param { string } path 路径
 * @param { object } error 错误信息
 * @param { object } data 真实数据
 */
fs.setMock = (path, error, data) => {
  mocks[path] = [error, data]
}
/**
 * 模拟fs的读取函数，进行拦截
 * @param { string} path 路径
 * @param { Object } options 选项
 * @param { Function } callback 回调
 */
fs.readFile = (path, options, callback) => {
  //如果fs.readFile("xxx", callback),那么options就是callback
  if (callback === undefined) {
    callback = options
  }
  //path在mocks中，说明被拦截到了
  if (path in mocks) {
    callback(...mocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}
module.exports = fs;