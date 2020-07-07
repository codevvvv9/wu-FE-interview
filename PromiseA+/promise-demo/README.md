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