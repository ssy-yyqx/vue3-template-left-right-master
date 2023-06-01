const port = process.env.port || process.env.npm_config_port || 9528
module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '^/dev-api': {
        target: 'http://192.168.2.169:3001/mock/11/',
        // target: 'http://192.168.1.90:8080/',
        changeOrigin: false,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  }
}
