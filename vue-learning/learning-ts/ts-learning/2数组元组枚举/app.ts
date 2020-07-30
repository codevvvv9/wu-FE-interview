let array: Array<string>  = ["hello", "22"]
array[1] = "ts"
console.log(array[0]);

let numberArray: Array<number> = [11, 2]
//等价于下面的写法
let numberArrayDemo: number[] = [213, 3213]

let stringArray: string[] = ["hello", "123123"]
let anyArray: any[] = ["hello", 123123, true]

//元组 严格按照定义的顺序来写
let originalArray: [string, number, boolean] = ["21", 123123, true]

//枚举
enum Color {
  red, 
  yellow,
  blue
}

let myColor: Color = Color.red
console.log("myColor", myColor) // 0

//上述枚举的方式，是打印的属性的值，默认是按照 0 1 2排列
//也可以修改，修改后就按照修改后的数值的顺序进行排列
enum Color2 {
  red = 123, 
  yellow,
  blue
}

let myColor2: Color2 = Color2.yellow; // 124
console.log("myColor2", myColor2)

