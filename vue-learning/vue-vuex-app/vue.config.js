module.exports = {
  devServer: {
    //proxy解决了，跨域
    proxy: {
      '/api': {
        target: 'http://localhost:8082/',
        ws: true,
        changeOrigin: true //默认是false,目前觉得很鸡肋，true也没看出有啥用
      }
    }
  }
}