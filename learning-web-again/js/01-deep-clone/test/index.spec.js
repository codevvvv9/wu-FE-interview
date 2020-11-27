const { assert } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const DeepClone = require("../src/index");
chai.use(sinonChai);

describe("DeepClone", () => {
  it("deepClone是一个函数", () => {
    // assert(typeof DeepClone === "function");
    assert.isFunction(DeepClone)
  });
  it("deepClone可以克隆6种原始数据类型", () => {
    //1.Number
    const num1 = 123;
    const num2 = new DeepClone().deepClone(num1);
    assert(num1 === num2);
    //2.String
    const str = 123;
    const str1 = new DeepClone().deepClone(str);
    assert(str === str1);
    //3.Boolean
    const bool1 = true;
    const bool2 = new DeepClone().deepClone(bool1);
    assert(bool1 === bool2);
    const bool3 = false;
    const bool4 = new DeepClone().deepClone(bool3);
    assert(bool3 === bool4);
    //4. Undefined
    const undefine1 = undefined;
    const undefine2 = new DeepClone().deepClone(undefine1);
    assert(undefine1 === undefine2);
    //5. Null
    const null1 = null;
    const null2 = new DeepClone().deepClone(null1);
    assert(null1 === null2);
    //6. Symbol
    const symbol1 = Symbol();
    const symbol2 = new DeepClone().deepClone(symbol1);
    assert(symbol1 === symbol2);
  });

  it("deepClone能克隆普通对象", () => {
    const obj = { name: "wushao", child: { name: "little" } };
    const obj1 = new DeepClone().deepClone(obj);
    assert(obj !== obj1);
    assert(obj.name === obj1.name);
    assert(obj.child !== obj1.child);
    assert(obj.child.name === obj1.child.name);
  });

  it("deepClone能克隆数组对象", () => {
    const arr = [
      [11, 22, 33],
      [111, 222, 333],
    ];
    const arr1 = new DeepClone().deepClone(arr);
    assert(arr !== arr1);
    assert(arr[0] !== arr1[0]);
    assert(arr[1] !== arr1[1]);
    assert.deepEqual(arr, arr1);
    //expected [ [ 11, 22, 33 ], [ 111, 222, 333 ] ] to deeply equal { Object (0, 1) }
  });

  it("deepClone能克隆函数对象", () => {
    const fun1 = function (x, y) {
      return x + y;
    };
    fun1.xxx = { yyy: { zzz: 1 } };
    const fun2 = new DeepClone().deepClone(fun1);

    assert(fun1 !== fun2);
    assert(fun1.xxx !== fun2.xxx);
    assert(fun1.xxx.yyy !== fun2.xxx.yyy);
    assert(fun1.xxx.yyy.zzz === fun2.xxx.yyy.zzz);
    assert(fun1(1, 2) === fun2(1, 2));
  });

  it("deepClone能克隆环", () => {
    const obj = {name: 'wushao'}
    obj.self = obj
    const obj1 = new DeepClone().deepClone(obj)
    assert(obj !== obj1)
    assert(obj.name === obj1.name)
    assert(obj.self !== obj1.self)
  })

  it("能够克隆正则表达式", () => {
    // const regExp = /hi\d+/gi
    //等价于
    const regExp = new RegExp("hi\\d+", "gi")
    regExp.xxx = {yyy: {zzz: 1}}
    const regExp1 = new DeepClone().deepClone(regExp)
    assert(regExp !== regExp1)
    assert(regExp.xxx !== regExp1.xxx)
    assert(regExp.xxx.yyy !== regExp1.xxx.yyy)
    assert(regExp.xxx.yyy.zzz === regExp1.xxx.yyy.zzz)
    assert(regExp.flags === regExp1.flags)
    assert(regExp.source === regExp1.source)
  })

  it("能够克隆Date", () => {
    const date = new Date()
    date.xxx = {yyy: {zzz: 1}}
    const date1 = new DeepClone().deepClone(date)
    assert(date !== date1)
    assert(date.xxx !== date1.xxx)
    assert(date.xxx.yyy !== date1.xxx.yyy)
    assert(date.xxx.yyy.zzz === date1.xxx.yyy.zzz)
    assert(date.getTime() === date1.getTime())
  })
  it("能够跳过原型属性不克隆", () => {
    const obj1 = Object.create({name: "a"})
    obj1.xxx = {yyy: {zzz: 1}}
    const obj2 = new DeepClone().deepClone(obj1)
    assert(obj1 !== obj2)
    assert.isTrue("name" in obj1)
    assert.isFalse("name" in obj2)
    assert(obj1.xxx !== obj2.xxx)
    assert(obj1.xxx.yyy !== obj2.xxx.yyy)
    assert(obj1.xxx.yyy.zzz === obj2.xxx.yyy.zzz)
  })
});
