import Vue from 'vue'
import {Toast} from 'mint-ui';

// 全局配置信息
let ua = window.navigator.userAgent.toLowerCase(),
  isWechat = false,//微信
  isApp = false,//app
  isBrowser = false; //常规浏览器
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  isWechat = true
}
else if (ua.match(/smi_ios/) || ua.match(/smi_android/)) {
  isApp = true
} else {
  isBrowser = true;
}
window.Vue =Vue;
Vue.prototype.$_config = {
  'isWechat': isWechat,
  'isApp': isApp,
  'isBrowser': isBrowser,
};

//消息弹框
Vue.prototype.$_showMsg = (msg) => {
  Toast({
    message: msg,
    position: 'bottom',
    duration: 2000
  });
};

//请求
import Api from '@/common/Api'
Vue.prototype.$_api = Api;

//cookie操作
/**
 * cookie操作
 * @param {String} name     必填，字段名，当参数仅有一个name时，为读取cookie
 * @param {String} value    选填，字段值，当value值为null时为删除cookie
 * @param {Object} options  选填，cookie详细设置：
 * {Number|Date}   expires     有效期(number类型:小时，Date类型：有效期结束时刻毫秒单位)，缺省：不设置
 * {String}        domain      有效域，缺省：当前域
 * {String}        path        有效目录，缺省：当前目录
 * {Boolean}       secure      secure值为true时，在http模式中不会向服务回发Cookie的验证信息；在https模式中会认为是安全的，会回发数据。
 */
Vue.prototype.$_cookie = (name, value, options) => {
  //console.log(value !== undefined)
  if (value !== undefined) {
    options = options || {};
    if (value === null) {
      value = '';
      //options = $.extend({}, options);
      options.path = '/';
      options.domain = options.domain || '';
      options.expires = options.expires || -1000;
    }
    var expires = '';
    if (options.expires && ( typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    //document.cookie = [name, '=', (value), expires, path, domain, secure].join('');
  } else {

    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, '');
        if (cookie.substring(0, name.length + 1) == (name) + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

//获取浏览器参数
/**
 * 获取浏览器参数
 * @param name 参数名
 */
Vue.prototype.$_getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};



