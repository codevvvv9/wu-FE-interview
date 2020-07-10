function Queue(params) {
  let items = []

  /**
   * 向队列尾部添加一个或多个元素
   * @param { string } element 
   */
  this.enqueue = function (element) {
    items.push(element)
  }

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

  this.print = function () {
    console.log(items.toString());
  }
}