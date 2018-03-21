var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var publicPath = config.dev.assetsPublicPath;
var pathss=config.build.assetsPublicPath;
if (process.env.NODE_ENV === 'production') {
  publicPath = config.build.assetsPublicPath;
  pathss=config.build.assetsRoot;
}

if (process.env.NODE_ENV === 'test') {
  publicPath = config.test.assetsPublicPath;
  pathss=config.test.assetsRoot;
}


module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path:pathss ,
    filename: '[name].js',
    publicPath: publicPath,
    chunkFilename:'[name].js'//打包调试别名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '$Components': resolve('src/components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.tpl\.html$/,
        loader: 'string-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
