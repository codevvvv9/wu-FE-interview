/**
 * 观察者，其实应该是依赖者 组件 实例等
 */
let Dep = require("./Dep")
class Watcher {
    constructor() {
        // console.log('this is',  this instanceof Watcher);
        Dep.target = this;
    }

    update() {
        console.log('更新数据了');
    }
}

Dep.target = null;

module.exports = Watcher