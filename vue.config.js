const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    open: true
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@views', resolve('src/views'))
      .set('@axios', resolve('src/plugins/axios'))
  }
}
