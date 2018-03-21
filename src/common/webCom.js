import Vue from 'vue'
import {Toast} from 'mint-ui';
import Native from "../common/Native";
import GUID from "./GUID";

var webCom = {};

webCom = {
  /**
   * 来源是否是app
   * @returns {boolean}
   */
  isSmiApp() {
    let ua = navigator.userAgent;
    if (ua.match(/SMI_iOS/) || ua.match(/SMI_Android/)) {
      return true;
    }
    return false;
  },
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
  cookie: function (name, value, options) {
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
  },
  /**
   * app 上一个版本
   * comparisonV 要比较的版本
   */
  isAppLastV(comparisonV){
    var flag = false;
    // comparisonV = '2.3.9';
    if (this.isSmiApp()) {//app
      let curUa = navigator.userAgent;//当前ua
      // curUa = 'moz/5.0/aale/536.36/SMI_Android/2.7.10/df';
      // '6/SMI_Android/2.7.10/df/SMI_iOS/2.7.42/xx'
      let reStr = curUa.match(/SMI_Android/) ? "/SMI_Android/" : "/SMI_iOS/",
        curVersionNumber = curUa.substr(curUa.lastIndexOf(reStr) - 1).split(reStr)[1].split('/')[0].replace('v', ''),
        comparisonVArr = comparisonV.split('.'),
        curUaVArr = curVersionNumber.split('.');
      for (let i = 0, comparisonVArrLen = comparisonVArr.length; i < comparisonVArrLen; i++) {
        if (curUaVArr[i]) {
          if (Number(curUaVArr[i]) < Number(comparisonVArr[i])) {
            flag = true;
            break;
          }
        }
      }
    }
    return flag;
  },
  /**
   * 获取用户guid
   * @returns {*}
   */
  getH5Guid(){
    let lifeShopGuid = this.cookie('lifeShopGuid');
    if (!lifeShopGuid) {
      let setGuid = new GUID().newGUID();
      let options = {
        expires: 720,
        path: '/',
        domain: window.location.host.replace(window.location.host.split('.')[0], '') //在星美生活同域cookie可以相互访问
      };
      this.cookie('lifeShopGuid', setGuid, options);
      lifeShopGuid = setGuid;
    }
    return lifeShopGuid;
  }
};

export default webCom;
