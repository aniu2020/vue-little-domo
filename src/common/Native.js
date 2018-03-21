// import Vue from 'vue'
import Api from "./Api"
import AppInteractive from "./AppInteractive"
import BroInteractive from "./BroInteractive"
import {Toast} from 'mint-ui';
import WebCom from "../common/webCom";
let Native = {},
  isSmiApp = WebCom.isSmiApp();
import store from '@/store'

// if (!WebCom.isAppLastV('2.3.4') || !isSmiApp) {//在新版app及web端 用新的交互方式
// }
//获取用户信息
  Native.getUserInfo = (data) => {
    data = data || {};
    if (data.login && data.login !== false) {
      data.login = true;
    }
    return new Promise((resolve, reject) => {
      if (isSmiApp) {

        AppInteractive.userInfo('', (userid) => {
          if (!userid || userid == "") {
            if (data.login) {
              Native.jumpToLogin();
            }
            resolve(userid)
          } else {
            resolve(userid)
          }
        }, () => {
          reject();
        })

      } else {

        BroInteractive.userInfo('', (userid) => {
          if (!userid || userid == "") {
            if (data.login) {
              Native.jumpToLogin();
            }
            resolve(userid)
          } else {
            resolve(userid)
          }
        }, () => {
          reject();
        })
      }


    })
  };

//跳转登录
  Native.jumpToLogin = () => {
    isSmiApp ? AppInteractive.jumpToLogin() : BroInteractive.jumpToLogin();
  };

//分享
  Native.shareSomething = (data, sec, err) => {
    isSmiApp ? AppInteractive.shareSomething(data, sec, err) : '';
  };

//返回上级页面
  Native.goBackLastPage = () => {
    isSmiApp ? AppInteractive.goBackLastPage() : BroInteractive.goBackLastPage();
  };

//返回首页
  Native.goHome = function () {
    isSmiApp ? AppInteractive.goHome() : BroInteractive.goHome();
  };

//打开支付页面
  Native.goCharge = function (data, seccess, error) {
    isSmiApp ? AppInteractive.pay(data) : BroInteractive.pay(data);
  };

//获取uuid
  Native.getUUID = function (data) {
    data = data || [];
    return new Promise((resolve, reject) => {

      if (isSmiApp && WebCom.isAppLastV('2.3.3')) {//如果是app2.3.3的上一个版本

        BroInteractive.getUUID(data, (UUID) => {
          if (!UUID || UUID == "") {
            resolve(UUID)
          } else {
            resolve(UUID)
          }
        }, () => {
          reject();
        });

      }
      else if (isSmiApp) {
        AppInteractive.getUUID(data, (UUID) => {
          if (!UUID || UUID == "") {
            resolve(UUID)
          } else {
            resolve(UUID)
          }
        }, () => {
          reject();
        });

      } else {
        BroInteractive.getUUID(data, (UUID) => {
          if (!UUID || UUID == "") {
            resolve(UUID)
          } else {
            resolve(UUID)
          }
        }, () => {
          reject();
        });
      }

    })
  };

//去购物车页面
  Native.openShoppingCar = () => {
    if (isSmiApp && WebCom.isAppLastV('2.3.3')) {//如果是app2.3.3的上一个版本
      BroInteractive.openShoppingCar();
    } else {
      isSmiApp ? AppInteractive.openShoppingCar() : BroInteractive.openShoppingCar();
    }
  };

//打电话
  Native.callPhone = function (data) {
    isSmiApp ? AppInteractive.callPhone(data) : BroInteractive.callPhone(data);
  };



export default Native;
