/**
 * @author Wu ShaoLin
 * @email wslsdust@163.com
 * @create date 2020-07-10 16:05:37
 * @modify date 2020-07-10 16:05:37
 * @desc [完成循环队列，使用击鼓传花模拟]
 */

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

function hotPotato(nameList, number) {
  let queue = new Queue()

  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i])  // (2)
  }

  //淘汰的
  let eliminated = ""
  while (queue.size() > 1) {
    for (let i = 0; i < number; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated = queue.dequeue()
    console.log(eliminated + "被淘汰。");
  }

  return queue.dequeue()
}