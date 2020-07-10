/**
 * 实现最小优先队列
 */
function PriorityQueue() {
  let items = []
  /**
   * 优先级的构造
   * @param { string } element 
   * @param { number } priority 
   */
  function QueueElement(element, priority) { //(1)
    this.element = element
    this.priority = priority
  }

  /**
   * 优先队列的入列
   * @param { string } element 添加的元素
   * @param { number } priority 优先级
   */
  this.enqueue = function (element, priority) {
    let queueElement = new QueueElement(element, priority)

    let added = false
    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) { // (2)
        items.splice(i, 0, queueElement) //(3)
        added = true
        break //(4)
      }

    }
    if (!added) {
      items.push(queueElement) //(5)
    }
  }

  /**
   * 打印items中的对象
   */
  this.print = function () {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element}-${items[i].priority}`);
    }
  }

  // 以下方法和普通队列的方法一样
  /**
   * 移除队列的第一个元素，
   * @return 移除的第一个元素
   */
  this.dequeue = function () {
    return items.shift()
  }

  /**
   * 队列的第一个元素
   */
  this.front = function () {
    return items[0]
  }

  this.isEmpty = function () {
    return items.length === 0
  }

  this.size = function () {
    return items.length
  }
}