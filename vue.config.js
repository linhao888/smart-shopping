const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/smart-shopping/' // 替换为你的 GitHub 仓库名
    : '/'
})
