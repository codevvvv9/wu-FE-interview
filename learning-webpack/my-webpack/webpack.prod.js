/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-11-28 19:22:54
 * @modify date 2020-11-28 19:22:54
 * @desc [学习webpack的5个核心概念：entry、output、loader、plugin、mode]
 */

"use strict";

const path = require("path");
//抽离单独的css文件可使其追加指纹
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
//压缩css文件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
//压缩html
const HtmlWebpackPlugin = require("html-webpack-plugin")
//清理上一次构建目录
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

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
    filename: "[name]_[chunkhash:8].js",
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
          MiniCssExtractPlugin.loader, //提取成带指纹的单个css文件，不能与style-loader共存
          "css-loader", //加载css文件，并转换成commonjs对象
        ],
      },
      {
        //4.3 解析.css文件，需要style-loader css-loader less-loader, 链式调用，从右往左,必须先解析.less文件
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader", //把less转换成css文件
        ],
      },
      {
        //4.4 解析图片文件，需要file-loader
        test: /.(png|img|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ],
      },
      {
        //4.5 解析字体文件，需要file-loader
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ],
      },
      // {
      //   //4.6 解析图片、字体文件，也可以url-loader
      //   //TODO 字体文件22m打包有问题，需要解决
      //   test: /.(png|img|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 1024 * 10, //小于这个字节数会直接base64处理，不生成单独的图片字体文件，直接打进对应的js文件中,对应的那个js文件会变大
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    //1、css提取成单独文件的插件，使用contenthash做指纹
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    //2、压缩css文件的插件，预处理器使用cssnano
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require("cssnano")
    }),
    //3、压缩html文件，可对应多页面
    new HtmlWebpackPlugin({
      // 模板
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'], //依赖哪个entry
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false, //一行展示html
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'], //依赖哪个entry
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin(),
  ]
};
