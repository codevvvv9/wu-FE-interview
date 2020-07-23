"use strict";
var array = ["hello", "22"];
array[1] = "ts";
console.log(array[0]);
var numberArray = [11, 2];
//等价于下面的写法
var numberArrayDemo = [213, 3213];
var stringArray = ["hello", "123123"];
var anyArray = ["hello", 123123, true];
//元组 严格按照定义的顺序来写
var originalArray = ["21", 123123, true];
//枚举
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["yellow"] = 1] = "yellow";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
var myColor = Color.red;
console.log("myColor", myColor); // 0
//上述枚举的方式，是打印的属性的值，默认是按照 0 1 2排列
//也可以修改，修改后就按照修改后的数值的顺序进行排列
var Color2;
(function (Color2) {
    Color2[Color2["red"] = 123] = "red";
    Color2[Color2["yellow"] = 124] = "yellow";
    Color2[Color2["blue"] = 125] = "blue";
})(Color2 || (Color2 = {}));
var myColor2 = Color2.yellow; // 124
console.log("myColor2", myColor2);
