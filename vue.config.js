const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: [
    /\bvue-echarts\b/,
    /\bresize-detector\b/
  ],
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('static', resolve('src/static'))
      .set('views', resolve('src/views'))
      .set('tools', resolve('src/tools'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://39.105.177.12/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}