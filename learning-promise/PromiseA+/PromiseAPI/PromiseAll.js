/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-11-15 22:44:50
 * @modify date 2020-11-15 22:44:50
 * @desc [学习Promise基础API]
 */

// 1. Promise.resolve() 适用于作弊，啊哈哈😃
Promise.resolve("直接制造一个成功的promise").then((success) =>
  console.log(success)
);
/**
 * 控制台打印：直接制造一个成功的promise
  <·Promise {<fulfilled>: undefined}
  __proto__: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: undefined
 */

// 2. Promise.reject()
Promise.reject("直接制造一个失败的promise").then(null, (failed) =>
  console.log(failed)
);
/**
 * 
  VM582:1 直接制造一个失败的promise
  Promise {<fulfilled>: undefined}
  __proto__: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: undefined
 */

//3. Promise.all() 接受一个元素为promise的数组，如果数组中的所有promise全部成功，返回一个各个成功值组成的数组；如果有一个失败，后续的就不会处理了
var p0 = () => new Promise((resolve, reject) => resolve(0));
var p1 = () => new Promise((resolve, reject) => resolve(1));
var p2 = () => new Promise((resolve, reject) => resolve(2));

Promise.all([p0(), p1(), p2()]).then((result) => console.log(result));
//控制台打印：
// VM840:1
// (3) [0, 1, 2]
// Promise {<fulfilled>: undefined}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined

//如果有一个失败了
var p0 = () => new Promise((resolve, reject) => resolve(0));
var p1 = () => new Promise((resolve, reject) => reject(1));
var p2 = () => new Promise((resolve, reject) => resolve(2));
Promise.all([p0(), p1(), p2()]).then(null, (result) => console.log(result));
// 1
// Promise {<fulfilled>: undefined}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined

Promise.all([p0(), p1(), p2()]).then((result) => console.log(result));
{
  /* Promise {<rejected>: 1}
__proto__: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: 1 */
}

// 有弊端：有一个失败了，后续就不会执行了，所以新版本引进了新的API解决这个问题，可以在无论什么情况下，所有的promise都结束之后再出结果
//4. Promise.allSettled() 都执行，打印所有结果的数组
Promise.allSettled([p0(), p1(), p2()]).then((result) => console.log(result));
// VM968:1
// (3) [{…}, {…}, {…}]
// 0: {status: "fulfilled", value: 0}
// 1: {status: "rejected", reason: 1}
// 2: {status: "fulfilled", value: 2}
// length: 3
// __proto__: Array(0)
// Promise {<fulfilled>: undefined}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined

//这个API又太新，所以我们手写一个替代品
//手写的基本原理：既然数组中的promise会又失败的情况，那么我们链式调用，不让其失败，换句话说甭管结果如果，都分别处理成对象返回。
Promise.all([
  p0().then(
    (resolve) => ({ state: "OK", result: resolve }),
    (reject) => ({ state: "not OK", reason: reject })
  ),
  p1().then(
    (resolve) => ({ state: "OK", result: resolve }),
    (reject) => ({ state: "not OK", reason: reject })
  ),
  p2().then(
    (resolve) => ({ state: "OK", result: resolve }),
    (reject) => ({ state: "not OK", reason: reject })
  ),
]).then((results) => console.log(results));

//会立马得到如下打印
// (3) [{…}, {…}, {…}]
// 0: {state: "OK", result: 0}
// 1: {state: "not OK", reason: 1}
// 2: {state: "OK", result: 2}
// length: 3
// __proto__: Array(0)
// Promise {<fulfilled>: undefined}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined

//而且这三个promise是同时进行的，可以认为是并行执行，接下来我们做一个简单的实验
console.time("time");
var timerPromiseDemo = (delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });

Promise.all([
  timerPromiseDemo(1000),
  timerPromiseDemo(2000),
  timerPromiseDemo(3000),
]).then((results) => {
  console.timeEnd("time");
  console.log(results);
});

// 控制台打印结果如下：
// VM1275:13 time: 3002.507080078125 ms
//打印总用时3秒钟，而不是1s+2s+3s=6s。上面的代码只是说每隔1s ,2s, 3s回一个promise的状态变为resolve态，所有的都执行完，至少用时3s左右。

//继续改造上面的变式，可以使用一个通用函数进抽象
function changePromise(promise) {
  return promise.then(
    (resolve) => ({ state: "OK", result: resolve }),
    (reject) => ({ state: "not OK", reason: reject })
  );
}

Promise.all([
  changePromise(p0()),
  changePromise(p1()),
  changePromise(p2()),
]).then((results) => console.log(results));

//同样可以打印出来
// 0: {state: "OK", result: 0}
// 1: {state: "not OK", reason: 1}
// 2: {state: "OK", result: 2}

//进一步统一，直接把all()方法的数组处理掉
function change(promiseArray) {
  return promiseArray.map(promise => changePromise(promise))
}
// function changePromise(promise) {
//   return promise.then(
//     (resolve) => ({ state: "OK", result: resolve }),
//     (reject) => ({ state: "not OK", reason: reject })
//   );
// }
// function change(promiseArray) {
//   return promiseArray.map(promise => changePromise(promise))
// }
// Promise.all(change([p0(), p1(), p2()])).then((results) => console.log(results));
// VM1326:10 
// (3) [{…}, {…}, {…}]
// 0: {state: "OK", result: 0}
// 1: {state: "not OK", reason: 1}
// 2: {state: "OK", result: 2}
// length: 3
// __proto__: Array(0)
// Promise {<fulfilled>: undefined}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined

//最后我们借助Promise.all以及上述的两个中间函数可以实现 Promise.allSetted()
Promise.allSettled2 = (promiseArray) => Promise.all(change(promiseArray))
Promise.allSettled2([p0(), p1(), p2()]).then(results => console.log(results))
// (3) [{…}, {…}, {…}]
// 0: {state: "OK", result: 0}
// 1: {state: "not OK", reason: 1}
// 2: {state: "OK", result: 2}
// length: 3
// __proto__: Array(0)

//除了结果形式和Promise.allSettled()不一样之外，其它功能完全实现。