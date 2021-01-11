/**
 * 任务池：控制任务执行
 */
class TaskPool {
    constructor(size) {
        this.size = size
        this.queue = new Queue()
    }

    addTask(fn, args) {
        return new Promise((resolve) => {
            this.queue.push(new DelayedTask(resolve, fn, args))
            if (this.size) {
                this.size--
                const { resolve: taskResolve, fn, args } = this.queue.shift()
                taskResolve(this.runTask(fn, args))
            }
        })
    }

    pullTask() {
        if (this.queue.isEmpty()) {
            return 
        }

        if (this.size === 0) {
            return
        }

        this.size++
        const { resolve, fn, args } = this.queue.shift()
        resolve(this.runTask(fn, args))
    }

    runTask(fn, args) {
        const result = Promise.resolve(fn(...args))

        result.then(() => {
            this.size--
            this.pullTask()
        }).catch(() => {
            this.size--
            this.pullTask()
        })

        return result
    }
}