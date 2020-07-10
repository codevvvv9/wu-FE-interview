/**
 * @author Wu ShaoLin
 * @email wslsdust@163.com
 * @create date 2020-06-19 17:12:29
 * @modify date 2020-06-19 17:12:29
 * @desc [使用栈处理10进制转换成任意进制的字符串]
 */

/**
 * 
 * @param { number } decNumber 要处理的10进制数字
 * @param { number } base 进制
 */
function baseConverterByTs(decNumber: number, base: number): string {
  var remainderStack = [],
    remainder, baseString = '',
    digits = '0123456789ABCDEF'

    while (decNumber > 0) {
      remainder = Math.floor(decNumber % base)
      remainderStack.push(remainder)
      decNumber = Math.floor(decNumber / base)
    }

    while (remainderStack.length > 0) {
      baseString += digits[remainderStack.pop()]
    }

    return baseString
}