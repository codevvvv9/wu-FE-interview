/**
 * 管理执行函数和参数
 */
class DelayedTask {
    constructor(resolve, fn, args) {
        this.resolve = resolve
        this.fn = fn
        this.args = args
    }
}