
// import { Dep } from "./Dep";
// import { Watcher } from "./Watcher";
var Dep = require("./Dep")
var Watcher = require("./Watcher")
function defineReactive(obj, key, value) {
    //1、引进依赖收集者
    let dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            //2、 /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
           dep.addSub(Dep.target)
           return value
        },
        set: function reactiveSetter(newValue) {
            if (newValue === value) {return}
            value = newValue
            // cb(newValue)
            // /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify()
        }
    }) 
}

function cb(value) {
    console.log('更新了');
}

function observer(obj) {
    if (!obj || typeof obj !== 'object') {
        return
    }

    Object.keys(obj).forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
}

class Vue {
    constructor(options) {
        this._data = options.data
        observer(this._data)
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher() //
         /* 在这里模拟render的过程，为了触发test属性的get函数 */
         console.log('render~', this._data.test);
    }
}

let vue = new Vue({
    data: {
        test: "test",
    }
})

vue._data.test = "12"
// console.log(vue._data.test);