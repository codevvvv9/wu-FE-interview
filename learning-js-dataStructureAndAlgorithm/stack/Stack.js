/**
 * @author Wu ShaoLin
 * @email wslsdust@163.com
 * @create date 2020-06-16 17:14:26
 * @modify date 2020-06-16 17:14:26
 * @desc [ 使用js数组模拟栈]
 */

/**
 * 使用js数组模拟栈
 */
function Stack() {
  let items = []
  this.push = function (element) {
    items.push(element)

  }
  this.pop = function () {
    return items.pop()
  }

  /**
   * 查看栈顶的元素
   * @return 栈中最后一个元素
   */
  this.peek = function () {
    return items[items.length - 1]

  }
  this.isEmpty = function () {
    return items.length === 0

  }

  this.size = function () {
    return items.length

  }

  this.clear = function () {
    items = []
  }

  this.print = function () {
    console.log(items.toString())
  }
}