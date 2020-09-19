## 安装相关依赖

```javascript
yarn init
yarn add commander
yarn add --dev @types/node
```

## `commander`的基本使用

`commander`是`tj`大神写的命令行库，基本语法如下：

```javascript
const program = new commander.Command(); //定义对象

program
  .version("0.0.1") //定义版本号
  .name("fy") //定义命令的默认名字
  .usage("<english>"); //定义命令的用法 尖括号是必选，[]是可选

program.parse(process.argv); //解析命令行的参数
```

## 使用百度翻译的 API

## 使用 https(nodejs)模块请求 API

## cli.ts 加入#!/usr/bin/env node

## 使用 tsc 命令在 dist 目录下编译成所需的 js 文件

## 修改 package.json

```json
  "main": "dist/main.js",
  "bin": {
    "f1": "dist/cli.js"
  },
  "files": [
    "dist/**/*.js"
  ],
```
## 发布到npm上

```
npm adduser
npm publish
```

## 项目中用的主要知识点

1. node相关的：https模块、querystring模块、process模块
2. md5库、百度翻译api库
3. ts的类型：

```typescript
type ErrorMap = {
  [key: string]: string;
}

type BaiduResult = {
  error_code?: string;
  error_msg?: string;
  from: string;
  to: string;
  trans_result: { src: string; dst: string }[];
};
```

4. js和基础编程知识：

```javascript
/[a-zA-Z]/.test() //正则匹配
//表驱动的方式去优化if组合
```