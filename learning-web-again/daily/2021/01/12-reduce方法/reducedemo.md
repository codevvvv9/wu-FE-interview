## 数组的reduce方法
Array.prototype.reduce(callback(accumulator, currentValue, currentIndex, sourceArray), initialValue)

上面就是reduce方法的参数签名，建议每次操作时都声明initialValue，避免结果有问题。
主要区别是：
- 设置了初始值后，accumulator就是初始值，回调从数组第一个元素开始执行，index 0
- 未设置初始值，accumulator就是数组第一个元素，回调从数组第二个元素开始执行，index 1

## reduce方法的实际应用
1. 数组求和
2. 对象数组的求和
3. 拍平二维数组
4. 计算对象中元素重复个数
5. 对象按照某种规则进行组合
6. 使用扩展运算符和初始值粘合对象中每个数组元素
7. 数组去重
8. 替换array.filter().map()
9. 顺序执行promise
10. 函数管道化
11. 替换map()
12. 数组里面是对象 根据对象的某个属性去重