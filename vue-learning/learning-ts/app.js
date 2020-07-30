"use strict";
//函数
//定义返回值类型
function getNumber() {
    return 123;
}
//返回值类型为空
function get() {
    console.log('get void');
}
get();
//定义参数的类型
function sum(add, subtract) {
    return add + subtract;
}
sum(1, 2);
console.log("sum(1, 2)", sum(1, 2));
//函数类型
var sumVariable;
sumVariable = getNumber;
sumVariable(1, 2);
console.log("sumVariable(1, 2)", sumVariable(1, 22));
