## 安装测试环境
主要步骤
```javascript
yarn global add ts-node mocha //全局安装
mkdir promise-demo
yarn init -y
yarn add chai mocha --dev //安装到本地环境中
yarn add @types/chai @types/mocha --dev
mkdir test
cd test
touch index.ts
mocha -r ts-node/register test/**/*.ts
```

ts文件中测试需要
//@ts-ignore 加上这句忽略可以测试一些显然的错误，避免ts校验不过，无法测试的尴尬

### `mocha`的作用

主要用来运行测试脚本，即测试你写的函数。它是一个测试框架，运行测试的工具，负责提供如下两个功能：
1. `describe`测试套件(test suit)，`describe("测试的描述", executeFunction)`
2. `it`测试用例(test case)，测试最小的单位,`test("测试用例名称", executeFunction)`

### `chai`的作用

`mocha`不自带断言库，所以需要结合使用其他库`chai断言库`，提供`expect`和`assert`