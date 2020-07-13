const db = require('../db.js')

describe("db", () => {
  it("can read", () => {
    expect(db.read instanceof Function).toBe(true)
  })
})