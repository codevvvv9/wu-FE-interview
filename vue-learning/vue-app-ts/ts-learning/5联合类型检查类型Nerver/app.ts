//Union type，即可以设置多个类型
let unionType: string | number | boolean = 123

unionType = true

//检查类型，typeof 需要使用''
let checkType: number = 123

if (typeof checkType !== 'string') {
  console.log('checkType isn\'t string');

}

//null和undefined
let myNull = null
let myUndefined = undefined

// never是任何类型的子类型，也可以赋值给任何类型
//但是没有类型是never的子类型或者说可以赋值给never类型，除了never自身之外
let never2: never

//应用场景可以抛出异常
function neverFunction(message: string): never {
  throw new Error(message)
}

// 处理死循环
function loop(): never {
  while (true) { }
}

let y: number
y = (() => {
  throw new Error('message')
})()