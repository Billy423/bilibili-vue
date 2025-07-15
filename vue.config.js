const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 3000, // frontend port

    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring boot backend
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})