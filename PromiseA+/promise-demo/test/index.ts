import * as chai from "chai"
import * as sinon from "sinon"
import * as sinonChai from "sinon-chai"
chai.use(sinonChai)

import Promise from "../src/promise"
const assert = chai.assert

describe("Promise", () => {
  it("是一个类", () => {
    //@ts-ignore 加上这句忽略可以测试一些显然的错误，避免ts校验不过，无法测试的尴尬
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })

  it("new Promise()如果接受的不是一个函数就报错", () => {
    assert.throw(() => {
      //@ts-ignore
      new Promise()
    })
  })

  it("new Promise(fn)会生成一个对象，该对象有then方法", () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })

  it("new Promise(fn)中的fn会立即执行", () => {
    let fn = sinon.fake()
    new Promise(fn)
    //@ts-ignore
    assert(fn.called)
  })

  it("new Promise(fn)中的fn执行的时候接受 resolve 和reject两个函数", done => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })

  it("promise.then(success)中的success会在resolve被调用后执行", done => {
    const success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      //这个函数会立即执行
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      })
    })
    // @ts-ignore
    promise.then(success)
  })
  it("promise.then(null, fail)中的fail会在reject被调用后执行", done => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      //这个函数会立即执行
      reject()
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      })
    })
    // @ts-ignore
    promise.then(null,fail)
  })
  it("2.2.1 promise的then中两个参数onFulfilled和onRejected都是可选的参数：", () => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(false, null)
    assert(1 === 1)
  })

  it(`2.2.2 如果onFulfilled是函数: 此函数必须在promise 完成(fulfilled)后被调用
    并把promise 的值作为它的第一个参数
    此函数在promise完成(fulfilled)之前绝对不能被调用
    此函数绝对不能被调用超过一次`, done => {
    const succeed = sinon.fake()
    const promise = new Promise(resolve => {
      assert.isFalse(succeed.called)
      resolve(233)
      resolve(2333)
      setTimeout(() => {
        assert(promise.state === "fulfilled")
        assert.isTrue(succeed.calledOnce)
        assert(succeed.calledWith(233))
        done()
      }, 0);
    })
    promise.then(succeed)
  })
  it(`2.2.3如果onRejected是函数:
  此函数必须在promise rejected后被调用,并把promise 的reason作为它的第一个参数
  此函数在promise rejected之前绝对不能被调用
  此函数绝对不能被调用超过一次`, done => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject(233)
      reject(2333)
      setTimeout(() => {
        assert(promise.state === "rejected")
        assert.isTrue(fail.calledOnce)
        assert(fail.calledWith(233))
        done()
      }, 0);
    })
    promise.then(null, fail)
  })
  it(`2.2.4 在执行上下文堆栈（execution context）仅包含平台代码之前
  不得调用 onFulfilled和onRejected
  即我的代码执行完毕之前，不得调用then后面的两个函数`, (done) => {
    const succeed = sinon.fake()
    const promise = new Promise(resolve => {
      resolve()
    })
    promise.then(succeed)
    console.log(1);
    assert.isFalse(succeed.called)
    setTimeout(() => {
      assert.isTrue(succeed.called)
      done()
    }, 0)
    
  })
  it(`2.2.4 onRejected
    不得调用then后面的两个函数`, (done) => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    promise.then(null, fail)
    console.log(1);
    assert.isFalse(fail.called)
    setTimeout(() => {
      assert.isTrue(fail.called)
      done()
    }, 0)
  })
  it(`2.2.5 onFulfilled和onRejected必须被当做函数调用, this的指向不应该被限制`, (done) => {
    const promise = new Promise((resolve) => {
      resolve()
    })
    promise.then(function () {
      "use strict";
      assert(this === undefined)
      done()
    })
  })
  it(`2.2.6 then可以在同一个promise中被多次调用
    2.2.6.1 如果/当 promise 完成执行（fulfilled）
    各个相应的onFulfilled回调 必须根据最原始的then 顺序来调用`, done => {
    const promise = new Promise(resolve => {
      resolve()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
  it(`2.2.6 then可以在同一个promise中被多次调用
    2.2.6.2 如果/当 promise 被拒绝（rejected）
    各个相应的onRejected回调 必须根据最原始的then 顺序来调用`, done => {
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(null, callbacks[0])
    promise.then(null, callbacks[1])
    promise.then(null, callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
})
