const { write } = require("../db");

const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}
/**
 * jest构造的假函数进行拦截
 * @param { string } path 路径
 * @param { object } error 错误信息
 * @param { object } data 真实数据
 */
fs.setReadMock = (path, error, data) => {
  readMocks[path] = [error, data]
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
  if (path in readMocks) {
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

let writeMocks = {}

fs.setWriteMock = (path, fn) => {
  writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback)
  } else {
    _fs.writeFile(path, data, options, callback)
  }
}

fs.clearMocks = () => {
  readMocks = {}
  writeMocks = {}
}
module.exports = fs;