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
    let node = new Node(element), // 1
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
  this.insert = function (position, element) {
    //检查越界值
    if (position >= 0 && position <=length) { //1
      let node = new Node(element),
        current = head,
        previous,
        index = 0;
      
        if (position === 0) {
          
          node.next = current //2
          head = node
        } else {
          while (index++ < position) { //3
            previous = current
            current = current.next
          }

          node.next = current // 4
          previous.next = node // 5
        }

        length++ //更新列表长度
        return true

    } else {
      return false //6
    }
  };
  /**
   * 从链表特定位置删除一项
   * @param { string } position 
   */
  this.removeAt = function (position) {
    //检查越界值
    if (position > -1 && position < length) {  //（1）
      let current = head, // 2
        previous, // 3
        index = 0; // 4
      
      //移除第一项
      if(position === 0) { //5
        head = current.next
      } else {

        while (index++ < position) { //6
          previous = current // 7
          current = current.next // 8
        }

        //将previous与current的下一项连接起来：跳过current,从来移除他
        previous.next = current.next //9
      }

      length-- //10

      return current.element
    } else {
      return null //11
    }
  };
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
