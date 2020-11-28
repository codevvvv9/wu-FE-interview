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
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  //3、mode有三个值：production(默认值)、development、none，开启之后会启动相应的默认配置函数
  mode: "production",
  //4、loader的使用
  module: {
    rules: [
      {
        //4.1 解析js文件，需要安装@babel/core @babel/preset-env babel-loader 配置.babelrc
        test: /.js$/,
        use: "babel-loader",
      },
      {
        //4.2 解析.css文件，需要style-loader css-loader,链式调用，从右往左,必须先解析.css文件
        test: /.css$/,
        use: [
          "style-loader", //把css放到style标签里面插进head标签里面
          "css-loader", //加载css文件，并转换成commonjs对象
        ],
      },
      {
        //4.3 解析.css文件，需要style-loader css-loader less-loader, 链式调用，从右往左,必须先解析.less文件
        test: /.less$/,
        use: [
          "style-loader", //把css放到style标签里面插进head标签里面
          "css-loader",
          "less-loader", //把less转换成css文件
        ],
      },
      // {
      //   //4.4 解析图片文件，需要file-loader
      //   test: /.(png|img|jpg|jpeg|gif)$/,
      //   use: "file-loader",
      // },
      // {
      //   //4.5 解析字体文件，需要file-loader
      //   test: /.(woff|woff2|eot|ttf|otf)$/,
      //   use: "file-loader",
      // },
      {
        //4.6 解析图片、字体文件，也可以url-loader
        //TODO 字体文件22m打包有问题，需要解决
        test: /.(png|img|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 10, //小于这个字节数会直接base64处理，不生成单独的图片字体文件，直接打进对应的js文件中,对应的那个js文件会变大
            },
          },
        ],
      },
    ],
  },
};
