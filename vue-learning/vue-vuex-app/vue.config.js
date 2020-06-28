module.exports = {
  devServer: {
    proxy: {
      '/spring': {
        target: 'http://localhost:8082/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}