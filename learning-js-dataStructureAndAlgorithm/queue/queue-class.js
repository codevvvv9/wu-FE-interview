let Queue = (function () {
  const items = new WeakMap()

  class Queue {
    constructor() {
      items.set(this, [])
    }

    /**
     * 队列尾部增加元素
     * @param { string } element 
     */
    enqueue(element) {
      let q = items.get(this)
      q.push(element)
    }

    /**
     * 队列头部移除一个元素
     * @return 队列头部的元素
     */
    dequeue() {
      let q = items.get(this)
      let r = q.shift()
      return r
    }

    front() {
      let q = items.get(this)
      return q[0]
    }

    size() {
      let q = items.get(this)
      return q.length
    }

    isEmpty() {
      let q = items.get(this)
      return q.length === 0
    }

    print() {
      let q = items.get(this)
      console.log(q.toString());
      
    }
  }
  return Queue
})()