let Stack = (function () {
  let _items = Symbol()
  class Stack {
    constructor() {
      this[_items] = [] //假的私有属性
    }

    push(element) {
      this[_items].push(element);
    }
    pop() {
      return this[_items].pop()
    }

    peek() {
      return this[_items][this[_items].length - 1]

    }
    isEmpty() {
      return this[_items].length === 0

    }

    size() {
      return this[_items].length

    }

    clear() {
      this[_items] = []
    }

    print() {
      console.log(this[_items].toString())
    }
  }

  return Stack
})()

//以上代码看似没事，但是通过以下方法仍可以修改
// let stack = new Stack();
// stack.push(5);
// stack.push(8);
// let objectSymbols = Object.getOwnPropertySymbols(stack);
// console.log(objectSymbols.length); // 1
// console.log(objectSymbols); // [Symbol()]
// console.log(objectSymbols[0]); // Symbol()
// stack[objectSymbols[0]].push(1);
// stack.print(); //输出 5, 8, 1