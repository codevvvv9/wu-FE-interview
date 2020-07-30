//ts中的对象和js中的对象区别还是很大的，在定义之初就决定了这个对象的每个属性的类型
let simpleObject: { name: string, age: number } = {
  name: "wushao",
  age: 30,
}

// simpleObject = {} //error
simpleObject = {
  name: "demo",
  age: 233
} //必须属性一样，属性的类型也要一样

//复杂类型
let complexObject: { data: number[], myFunctions: (data: number) => number[] } = {
  data: [12, 23, 34],
  myFunctions(data: number) {
    this.data.push(data);
    return this.data
  }
}

complexObject.myFunctions(22)
console.log("complexObject.myFunctions(22)", complexObject.myFunctions(22))

//上述的复杂对象写法太复杂，所以采用type的形式
type myType = {
  data: string[],
  myFunction: (data: string) => string
}

let newType: myType = {
  data: ["data"],
  myFunction(data: string): string {
    return data
  }
}
newType.myFunction("test")
console.log("newType.myFunction('test')", newType.myFunction("test"))