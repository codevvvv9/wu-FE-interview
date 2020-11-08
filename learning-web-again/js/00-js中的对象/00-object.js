/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-11-08 11:56:17
 * @modify date 2020-11-08 11:56:17
 * @desc [Object.create的polyfill]
 */

if (typeof Object.create !== "function") {
  //数据类型复习详见./数据类型.md
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

