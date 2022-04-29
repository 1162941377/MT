module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    hotOnly: true,
    proxy: {
      // 代理转发，指向mysql所在的服务器地址
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
