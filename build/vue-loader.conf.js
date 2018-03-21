var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'


var sourceMap = config.dev.cssSourceMap;
if (process.env.NODE_ENV === 'production') {

  sourceMap = config.build.productionSourceMap
}
if (process.env.NODE_ENV === 'test') {
  sourceMap = config.test.productionSourceMap
}


module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
