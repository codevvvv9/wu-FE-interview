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
