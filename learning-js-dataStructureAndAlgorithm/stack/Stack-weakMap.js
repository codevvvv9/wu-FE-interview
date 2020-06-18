let Stack = (function () {
  const items = new WeakMap() 
  // 存储键值对，键是一个对象，值可以是任意对象
  class Stack {
    constructor() {
      items.set(this, []) //
    }

    push(element) {
      let s = items.get(this)
      s.push(element)
    }
    pop() {
      let s = items.get(this)
      let r = s.pop()
      return r
    }
    print() {
      let s = items.get(this)
      console.log(s.toString())
    }
  }

  return Stack
})()