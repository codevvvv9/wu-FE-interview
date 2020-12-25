/**
 * 观察者
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