module.exports = {
  //反向代理
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    //配置跨域
    proxy: {
      '/api': {
        target: 'https://vuets-api.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
}