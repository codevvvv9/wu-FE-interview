/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-06-18 23:18:38
 * @modify date 2020-06-18 23:18:38
 * @desc [使用栈这个数据结构来处理十进制转换为二进制]
 */

/**
 * 
 * @param { number } decNumber 需要处理的十进制数字
 */
function divide2(decNumber) {
  var stack = [],
  remainder,
  binaryString = ''

  while (decNumber > 0) {
    remainder = Math.floor(decNumber % 2)
    stack.push(remainder)
    decNumber = Math.floor(decNumber / 2)
  }

  while (stack.length > 0) {
    binaryString += stack.pop().toString()
  }

  return binaryString
}