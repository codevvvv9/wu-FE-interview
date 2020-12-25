/**
 * 依赖收集
 */
class Dep {
    constructor() {
        //维护订阅者，存放Watcher
        this.subs = []
    }

    addSub(sub) {
        //这里的sub其实就是Watcher
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }

}

module.exports = Dep