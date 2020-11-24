const { assert } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const deepClone = require("../src/index");
chai.use(sinonChai);

describe("deepClone", () => {
  it("deepClone是一个函数", () => {
    assert(typeof deepClone === "function");
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

  it("deepClone能克隆对象", () => {
    const obj = { name: "wushao", child: { name: "little" } };
    const obj1 = deepClone(obj);
    assert(obj !== obj1)
    assert(obj.name === obj1.name)
    assert(obj.child !== obj1.child)
    assert(obj.child.name === obj1.child.name)
  });
});
