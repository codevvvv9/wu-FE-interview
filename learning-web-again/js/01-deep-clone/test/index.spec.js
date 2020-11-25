const { assert } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const deepClone = require("../src/index");
chai.use(sinonChai);

describe("deepClone", () => {
  it("deepClone是一个函数", () => {
    // assert(typeof deepClone === "function");
    assert.isFunction(deepClone)
  });
  it("deepClone可以克隆6种原始数据类型", () => {
    //1.Number
    const num1 = 123;
    const num2 = deepClone(num1);
    assert(num1 === num2);
    //2.String
    const str = 123;
    const str1 = deepClone(str);
    assert(str === str1);
    //3.Boolean
    const bool1 = true;
    const bool2 = deepClone(bool1);
    assert(bool1 === bool2);
    const bool3 = false;
    const bool4 = deepClone(bool3);
    assert(bool3 === bool4);
    //4. Undefined
    const undefine1 = undefined;
    const undefine2 = deepClone(undefine1);
    assert(undefine1 === undefine2);
    //5. Null
    const null1 = null;
    const null2 = deepClone(null1);
    assert(null1 === null2);
    //6. Symbol
    const symbol1 = Symbol();
    const symbol2 = deepClone(symbol1);
    assert(symbol1 === symbol2);
  });

  it("deepClone能克隆普通对象", () => {
    const obj = { name: "wushao", child: { name: "little" } };
    const obj1 = deepClone(obj);
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
    const arr1 = deepClone(arr);
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
    const fun2 = deepClone(fun1);

    assert(fun1 !== fun2);
    assert(fun1.xxx !== fun2.xxx);
    assert(fun1.xxx.yyy !== fun2.xxx.yyy);
    assert(fun1.xxx.yyy.zzz === fun2.xxx.yyy.zzz);
    assert(fun1(1, 2) === fun2(1, 2));
  });
});
