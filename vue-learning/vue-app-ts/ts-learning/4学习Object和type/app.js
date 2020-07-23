"use strict";
//ts中的对象和js中的对象区别还是很大的，在定义之初就决定了这个对象的每个属性的类型
var simpleObject = {
    name: "wushao",
    age: 30,
};
// simpleObject = {} //error
simpleObject = {
    name: "demo",
    age: 233
}; //必须属性一样，属性的类型也要一样
//复杂类型
var complexObject = {
    data: [12, 23, 34],
    myFunctions: function (data) {
        this.data.push(data);
        return this.data;
    }
};
complexObject.myFunctions(22);
console.log("complexObject.myFunctions(22)", complexObject.myFunctions(22));
var newType = {
    data: ["data"],
    myFunction: function (data) {
        return data;
    }
};
newType.myFunction("test");
console.log("newType.myFunction('test')", newType.myFunction("test"));
