class Stack {
  constructor() {
    this.items = [] //有弊端，每个实例对象都能操作
  }

  push(element) {
    this.items.push(element);
  }
}