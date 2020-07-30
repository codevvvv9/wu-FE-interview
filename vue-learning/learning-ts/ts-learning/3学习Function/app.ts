//函数
//定义返回值类型
function getNumber(): number {
  return 123
}

//返回值类型为空
function get():void {
  console.log('get void');
  
}
get()
//定义参数的类型
function sum(add: number, subtract: number): number {
  return add + subtract
}

sum(1, 2)
console.log("sum(1, 2)", sum(1, 2))
//函数类型
let sumVariable: (a: number, b: number) => number

sumVariable = getNumber
sumVariable(1, 2)
console.log("sumVariable(1, 2)", sumVariable(1, 22))