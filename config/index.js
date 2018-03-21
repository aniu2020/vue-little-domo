// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../target/index.html'),
    assetsRoot: path.resolve(__dirname, '../target'),//assets（资源）根目录
    assetsSubDirectory: 'static',//ssets（资源）副（Sub）目录
    assetsPublicPath: '/vuelittledomo/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  test: {
    env: require('./test.env'),
    index: path.resolve(__dirname, '../test/index.html'),
    assetsRoot: path.resolve(__dirname, '../test'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/smilife/',
    assetsPublicPath: '/',//在index里面的 css js路径里面加一层目录
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 6662,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/smiweb': {
      //   target: 'http://testmall.xingmeihui.com',
      //   ws:false,
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^/smiweb' : '/smiweb',
      //   },
      //
      //   onProxyRes:function(proxyReq, req, res){
      //     if(req.url.match(/getGoodInfo/)){
      //       console.log(req.body);
      //     }
      //   },
      // },
      // '/life-v230-beta1314': {
      //   target: 'http://192.168.68.23:8081',//目标地址
      //   ws:false,
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^/life-v230-beta1314' : '/life-v230-beta1',
      //   },
      //
      //   onProxyRes:function(proxyReq, req, res){
      //     if(req.url.match(/getGoodInfo/)){
      //       console.log(req.body);
      //     }
      //   },
      // },

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
