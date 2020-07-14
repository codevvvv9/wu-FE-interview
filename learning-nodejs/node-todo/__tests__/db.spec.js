const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe("db", () => {
  //每执行一次测试都要清空上一次的测试
  afterEach(() => {
    fs.clearMocks()
  })

  it("can read", async () => {
    const data = [{title: "can read", done: true}]
    fs.setReadMock("/xxx", null, JSON.stringify(data))
    const list = await db.read("/xxx")
    expect(list).toStrictEqual(data)
  })

  it("can write", async () => {
    let fakeFile = null
    fs.setWriteMock("/yyy", (path, data, callback) => {
      fakeFile = data
      callback(null) // 保证没有错，才会resolve
    })
    const list = [{title: "写小说", done: true}, {title: "写散文", done: true}]
    await db.write(list, "/yyy")
    expect(fakeFile).toBe(JSON.stringify(list) + "\n")
  })
})