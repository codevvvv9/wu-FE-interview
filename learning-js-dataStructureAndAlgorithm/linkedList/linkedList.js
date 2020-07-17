function LinkedList() {
  /**
   * node辅助类
   * @param { object } element 链表中的每一项
   */
  let Node = function (element) {
    // (1)
    this.element = element;
    this.next = null;
  };

  let length = 0; // (2)
  //存储第一个节点的引用
  let head = null; // (3)
  /**
   * 向链表尾部增加一个新的项
   * @param { object } element 链表的元素
   */
  this.append = function (element) {
    let node = new Node(element) // 1
    current // 2

    if (head === null) {//列表中第一个节点 // 3
      head = node
    } else {
      current = head // 4

      //循环列表找到最后一项
      while (current.next) {
        current = current.next
      }
      //找到最后一项 将其next赋给node,建立链接
      current.next = node // 5
    }
    length++ //更新列表长度
  };
  /**
   * 向链表特定位置插入一个新的项
   * @param { string } position 
   * @param { object } element 
   */
  this.insert = function (position, element) {};
  /**
   * 从链表特定位置删除一项
   * @param { string } position 
   */
  this.removeAt = function (position) {};
  /**
   * 从链表移除一项
   * @param { object } element 
   */
  this.remove = function (element) {};
  /**
   * 返回元素在链表中的引用，没有该元素则返回-1
   * @param { object } element 
   */
  this.indexOf = function (element) {};
  /**
   * 判断链表是否为空
   */
  this.isEmpty = function () {}
  /**
   * 返回链表中的元素个数
   */
  this.size = function () {}
  /**
   * 
   */
  this.getHead = function () {}
  this.toString = function () {}
  this.print = function () {}
}
