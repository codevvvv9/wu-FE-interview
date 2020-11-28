/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-11-28 19:22:54
 * @modify date 2020-11-28 19:22:54
 * @desc [学习webpack的5个核心概念：entry、output、loader、plugin、mode]
 */

"use strict";

const path = require("path");

module.exports = {
  //1、单入口文件写法如下：
  // entry: "./src/index.js",
  // output: {
  //   path: path.join(__dirname, "dist"),
  //   filename: "bundle.js",
  // },
  //2、多入口文件写法如下：entry 使用对象的写法，output只能使用占位符[name]
  entry: {
    'index': './src/index.js',
    'search': './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  //3、mode有三个值：production(默认值)、development、none，开启之后会启动相应的默认配置函数
  mode: "production"
};
