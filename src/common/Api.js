//后台接口配置文件
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
import req_config from './ApiConfig';
import Native from './Native';
import {
  Indicator
} from 'mint-ui';
import {
  Toast
} from 'mint-ui';
// import store from '../store/'

/*根据环境设置后台请求路径*/
var env = process.env.NODE_ENV,
  config = {
    rqurl: '/smiweb'
  };
// if (env == 'development') {
//   // config.rqurl = "http://testmall.xingmeihui.com/smiweb"
//   config.rqurl = "http://testmall.xingmeihui.com/smiweb"
// } else if (env == 'test') {
//   config.rqurl = "http://testmall.xingmeihui.com/smiweb"
// } else if (env == 'production') {
//   config.rqurl = ""
// } else {
//   config.rqurl = ""
// }

if (env == 'development') {
  // config.rqurl = "http://localhost:3338"
  config.rqurl = ''
} else if (env == 'test') {
  config.rqurl = "http://test.aniublog.com"
} else if (env == 'production') {
  config.rqurl = location.origin
} else {
  config.rqurl = location.origin
}
var requesturl = config.rqurl;

/*根据环境设置后台请求路径 end*/

//var version = "V1";//接口版本管理 暂时不需要

var Api = {};
Api.requesturl = requesturl;
var index = 0;
for (let item in req_config) {
  let options = req_config[item];

  if (options.contentType === undefined) { //默认值
    options.contentType = "application/x-www-form-urlencoded"
  }
  if (options.emulateJSON === undefined) { //默认值
    options.emulateJSON = true;
  }
  if (options.method === undefined) { //默认值
    options.method = "POST"
  }
  if (options.loadingTime === undefined) { //默认值
    options.loadingTime = 1000
  }
  if (options.needLogin === undefined) { //默认值
    options.needLogin = true
  }
  //注册API方法
  Api[item] = function (data) { //给每个Api，注册方法
    //匹配restful参数,从Url得到需要匹配的参数{param}

    // ===for in===
    var params = {}; //去掉空参数
    var urlStr = '';
    if (/\{(.+?)\}/.test(req_config[item].url)) { //restful风格

      var arr = req_config[item].url.match(/\{(.+?)\}/g); //req_config[item].url.match(/\{(.+?)\}/g) => ["{page}", "{pageSize}"]
      for (var keyM in arr) {
        // console.log(keyM,arr)
        var key = arr[keyM].replace("{", "").replace("}", ""); //得到参数名 page pageSize
        if (data[key]) {
          var pt = new RegExp("\\{(" + key + "+?)\\}", "g"); //拼装得到替换参数的正则
          req_config[item].url = req_config[item].url.replace(pt, data[key]);
          delete data[key]; //删除url参数
          // data[key] = undefined;
        } else {
          console.error("restful参数" + key + "不存在");
        }
      }

      //删除传参
      for (let key in data) {
        if (data[key]) {
          params[key] = data[key];
        }
      }

      // // ===for of===
      // for (var match of req_config[item].url.match(/\{(.+?)\}/g)) {
      //   console.log(match,req_config[item].url,222,req_config[item].url.match(/\{(.+?)\}/g))
      //   var key = match.replace("{", "").replace("}", ""); //得到参数名
      //   if (data[key]) {
      //     var pt = new RegExp("\\{(" + key + "+?)\\}", "g"); //拼装得到替换参数的正则
      //     req_config[item].url = req_config[item].url.replace(pt, data[key]);
      //     // console.log(req_config[item].url,2)
      //     data[key] = undefined; //将url参数置空
      //   } else {
      //     console.error("restful参数" + key + "不存在");
      //   }
      // }
      //
      // for (let key in data) {
      //   if (data[key]) {
      //     params[key] = data[key];
      //   }
      //
      // }

      //错误写法
      // for (let keyM in req_config[item].url.match(/\{(.+?)\}/g)) {
      //   console.log(keyM,req_config[item].url,222,req_config[item].url.match(/\{(.+?)\}/g))
      //   let macth = req_config[item].url.match(/\{(.+?)\}/g)[keyM];
      //   var key = macth.replace("{", "").replace("}", ""); //得到参数名
      //   if (data[key]) {
      //     var pt = new RegExp("\\{(" + key + "+?)\\}", "g"); //拼装得到替换参数的正则
      //     req_config[item].url = req_config[item].url.replace(pt, data[key]);
      //     delete data[key]; //删除url参数
      //   } else {
      //     console.error("restful参数" + key + "不存在");
      //   }
      // }

    } else { //正常风格
      params = data;
      //如果是GET
      if (options.method == 'GET' || options.method == 'get') {
        urlStr = '?'
        for (var i in data) {
          urlStr += i + '=' + data[i] + '&'
        }
        urlStr = urlStr.substring(0, urlStr.length - 1);
        params = '';
      }
    }

    //发送请求，返回promise对象
    return new Promise((reslove, reject) => {
      var loading = false;
      //设定请求参数并且发送请求
      var p = Vue.http({
        //urlplus在提交订单时用到，提交的的借口需要从url取得token
        url: requesturl + options.url + urlStr,
        body: params, //请求参数
        headers: {
          "Content-Type": options.contentType, //请求数据类型
        },
        before: () => {
          //菊花转圈
          loading = true;
          setTimeout(() => {
            if (!loading) {
              return;
            }
            Indicator.open({
              spinnerType: 'fading-circle'
            });
          }, options.loadingTime)

        }, //请求预处理函数
        method: options.method, //请求方式，POST GET PUT DELETE OPTION
        emulateJSON: options.emulateJSON //是否序列化body
      });
      let axiosDate = new Date()
      //请求结果处理
      p.then((res) => {
        loading = false;
        Indicator.close();
        if (res.ok == true) { //成功
          reslove(res)
        } else { //出错
          reject(res)
        }
        // if (res.body.code == 1) { //成功

        //   // 关闭  loading图片消失
        //   let oDate = new Date()
        //   // let time = oDate.getTime() - axiosDate.getTime()
        //   // if (time < 500) time = 500
        //   // setTimeout(() => {
        //   //   store.dispatch('FETCH_LOADING', true)
        //   // }, time)
        //   // resolve(response.data)

        //   reslove(res)

        // } else if (res.body.code == 3) { //需要登录
        //   //去登录
        //   if (options.needLogin) {
        //     Native.jumpToLogin();
        //   }

        // } else if (res.body.code == 7) { //滑动验证码验证
        //   var geetest = () => {
        //     if (res.body.data) {
        //       //取得验证码构造参数，类似微信授权appid之类的
        //       var verifyInitInfo = JSON.parse(res.body.data);
        //       //创建一个div用来显示滑动验证码
        //       var obj = document.createElement('div');
        //       obj.id = 'pop';
        //       document.body.appendChild(obj);

        //       //初始化验证码
        //       initGeetest(verifyInitInfo, (captchaObj) => {
        //         //初始化成功后添加到之前创建的div
        //         captchaObj.appendTo("#pop");
        //         captchaObj.onReady(function () {
        //           //阻止事件冒泡
        //           document.getElementById("pop").firstChild.addEventListener("click", function (e) {
        //             e.stopPropagation();
        //           });
        //         });
        //         //滑动验证匹配之后回调
        //         captchaObj.onSuccess(() => {
        //           //拼装三个验证所需参数
        //           params.geetest_challenge = captchaObj.getValidate().geetest_challenge;
        //           params.geetest_validate = captchaObj.getValidate().geetest_validate;
        //           params.geetest_seccode = captchaObj.getValidate().geetest_seccode;
        //           //移除验证码
        //           obj.remove();
        //           //重新发起上次请求
        //           this[item](params).then((res) => {
        //             reslove(res); //成功
        //           }, (res) => {
        //             reject(res) //失败
        //           });

        //         });
        //         window.captchaObj = captchaObj
        //       });
        //     }
        //   };
        //   if (typeof (initGeetest) === "undefined") {
        //     var head = document.getElementsByTagName('head')[0];
        //     var script = document.createElement('script');
        //     script.type = 'text/javascript';
        //     script.src = "https://static.geetest.com/static/tools/gt.js?" + new Date().getTime();
        //     head.appendChild(script);
        //     script.onload = () => {
        //       geetest();
        //     }
        //   } else {
        //     geetest();
        //   }
        //   // 弹窗极验验证的弹窗后仍然返回数据
        //   reslove(res);
        // } else { //出错
        //   // 关闭  loading图片消失
        //   // store.dispatch('FETCH_LOADING', false)
        //   axiosDate = new Date()
        //   // reject(error)
        //   reject(res)
        // }

      }, function (error) {
        loading = false;
        //网路错误
        Indicator.close();
        // 关闭  loading图片消失
        // store.dispatch('FETCH_LOADING', false)
        reject(error)

        reject({
          body: {
            msg: "网络错误"
          }
        }); //与之前出错格式匹配；
      });
    });

  }
}
export default Api
