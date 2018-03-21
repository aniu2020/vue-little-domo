
window.Promise = require('es6-promise').Promise;
require('es6-promise').polyfill();
window.Promise.prototype.finally = function(fn) {
  function finFn(){
    setTimeout(fn)
  }
  this.then(finFn, finFn)
  return this
}