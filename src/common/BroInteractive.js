import Api from "../common/Api"
import GUID from "../common/GUID";
import {
  Toast
} from 'mint-ui';
let BroInteractive = {
  /**
   * 获取用户信息
   * @param param
   * @param sec
   * @param err
   */
  userInfo (param, sec, err) {
    let userInfo = "",
      env = process.env.NODE_ENV;
    if (env == 'development') {//本地
      userInfo = localStorage.getItem('userInfo');
    }
    else {//其他
      userInfo = this.getUserInfoByCookie();
    }
    let user = {};
    if (userInfo && userInfo != "") {
      user = JSON.parse(userInfo);
    }
    //处理token undefined时候接口报错
    user.token = !user.token ? '' : user.token;
    sec(user.token);
  },
  getUserInfoByCookie() {

    let strCookie = document.cookie,
      //将多cookie切割为多个名/值对
      arrCookie = strCookie.split("; "),
      //遍历cookie数组，处理每个cookie对
      userInfo = null;
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split("=");
      //找到名称为userId的cookie，并返回它的值

      if ("userInfo" == arr[0]) {
        userInfo = decodeURIComponent(arr[1]);
        break;
      }
    }
    return userInfo;
  },
  /**
   * 去登录
   */
  // login () {
  //   this.jumpToLogin();
  // },
  /**
   * 去登录
   */
  jumpToLogin() {
    var env = process.env.NODE_ENV;
    if (env == 'development') {
      location.href = "dev/wx-login/login.html?returnUrl=" + encodeURIComponent(window.location.href);
    } else if (env == 'test') {
      location.href = "http://login.xingmeihui.com/login.html?returnUrl=" + encodeURIComponent(window.location.href);
    } else {
      location.href = "http://login.smi170.com/login.html?returnUrl=" + encodeURIComponent(window.location.href);
    }
  },
  /**
   * 返回首页
   */
  goHome() {
    location.href = "#/index";
  },
  /**
   * 返回上一页
   */
  goBackLastPage() {
    history.go(-1);
  },
  /**
   * 支付
   * @param param
   * @param sec
   * @param err
   */
  pay (param, sec, err) {
    let orderId = param.orderId, updatePayChannel,
      orderType = param.orderType,
      // token = param.token,
      // ua = navigator.userAgent;
      //var openid = localStorage.getItem("openid");
      domain = "http://m.smi170.com/",
      env = process.env.NODE_ENV;
    if (env == 'test') {
      domain = "http://testws.xingmeihui.com/smilife/";
    }
    if (env == 'development') {

      domain = "";
    }
    location.href = domain + `#/charge?orderInfo=${orderId}|${orderType}`;
    // // var domain = "m.smi170.com";
    // var domain = "http://xmlife.smi170.com";
    // var env = process.env.NODE_ENV;
    // if (env == 'test') {
    //   domain = "http://testmall.xingmeihui.com/smiweb";
    // }
    // if (env == 'development') {
    //   domain = "http://testmall.xingmeihui.com/smiweb";
    // }
    // location.href = domain + `/resources/wap-shop/pages/wx_charge.html?orderInfo=${orderId}|${orderType}`;
    // return;
    //
    // //===微信===
    // if (ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
    //
    //   // var domain = "m.smi170.com";
    //   var domain = "http://xmlife.smi170.com";
    //   var env = process.env.NODE_ENV;
    //   if (env == 'test') {
    //     domain = "http://testmall.xingmeihui.com/smiweb";
    //   }
    //   if (env == 'development') {
    //     domain = "http://testmall.xingmeihui.com/smiweb";
    //   }
    //   location.href = domain + `/resources/wap-shop/pages/wx_charge.html?orderInfo=${orderId}|${orderType}`;
    //   return;
    // }
    // //===web(支付宝)===
    // let channel = "WAP";
    // Api.updatePayChannel({
    //   orderId,
    //   token,
    //   orderType,
    //   channel
    // }).then((res) => {
    //   window.location.href = res.body.entity.url;
    // }, (res) => {
    //   Toast({
    //     message: res.body.msg,
    //     position: 'bottom',
    //     duration: 2000
    //   });
    // });
  },
  /**
   * cookie操作
   * @param name
   * @param value
   * @param options
   * @returns {*}
   */
  cookie (name, value, options) {
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
   * 获取uuid
   * @param param
   * @param sec
   * @param err
   */
  getUUID (param, sec, err) {
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
    sec(lifeShopGuid);
  },
  /**
   * 打开购物车
   */
  openShoppingCar() {
    location.href = "#/GoodsCart";
  },
  /**
   * 打电话
   * @param param
   * @param sec
   * @param err
   */
  callPhone: function (param, sec, err) {
    let telNum = param.phone || '';
    window.location.href = 'tel://' + telNum;
  }
};

export default BroInteractive;
