## 安装相关依赖

```javascript
yarn init
yarn add commander
yarn add --dev @types/node
```

## `commander`的基本使用

`commander`是`tj`大神写的命令行库，基本语法如下：

```javascript
const program = new commander.Command() //定义对象

program.version('0.0.1') //定义版本号
  .name('fy') //定义命令的默认名字
  .usage('<english>') //定义命令的用法 尖括号是必选，[]是可选

program.parse(process.argv); //解析命令行的参数
```

## 使用百度翻译的API

## 使用https(nodejs)模块请求API