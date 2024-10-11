const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/smart-shopping/' // 替换为你的 GitHub 仓库名
  //   : './'

  // css: {
  //   loaderOptions: {
  //     less: {
  //       modifyVars: {
  //         '@tabbar-item-icon-size': '100px', // 自定义图标大小
  //         '@tabbar-item-font-size': '140px' // 自定义文字大小
  //       },
  //       javascriptEnabled: true
  //     }
  //   }
  // }
})
