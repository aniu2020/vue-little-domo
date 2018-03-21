import Vue from 'vue'
import Api from "../common/Api";
export default {
  data() {
    return {
    }
  },
  methods: {
    init() {
    },
    /**
     * 判断是否为微信
     * @returns {boolean}
     */
    testOp ()  {
      console.log('testOp')
      return true;
    },
    /**
     * 微信分享初始化
     */
    wxInit(data, sendData, wxFun){
      if (data && sendData && window.wx) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode']
          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          switch (wxFun) {
            case 'wxShare':
              wx.onMenuShareAppMessage(sendData);
              wx.onMenuShareQQ(sendData);
              wx.onMenuShareTimeline(sendData);
              wx.onMenuShareWeibo(sendData);
              wx.onMenuShareQZone(sendData);
              break;
            case 'wxScanQRCode':
              wx.scanQRCode(sendData);
              break;
          }
        });
      }
    },
    /**
     * 设置微信方法  wxShare 分享 wxScanQRCode 扫码
     * @param wxFun
     * @param sendData
     * @returns {Promise.<void>}
     */
    async setWxFun(wxFun, sendData){
      try {
        let res = await Api.getWXShare({"url": location.href}),
          data = res.body.entity;
        if (!window.wx) {
          let head = document.getElementsByTagName('head')[0],
            script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
          head.appendChild(script);
          script.onload = () => {
            this.wxInit(data, sendData, wxFun);
          };
        } else {
          this.wxInit(data, sendData, wxFun);
        }
      } catch (err) {
        this.showMsg(err.body.msg);
      }
    },
    /**
     * 获取code
     * @param thisURL 当前url
     */
    async getWXCode(thisURL){

      //参数截取，重新组装，目前仅支持一个参数
      var state = "";
      var redirectUri = thisURL.split('?')[0];//url
      var obj = thisURL.split('?')[1];//数据串
      if (obj != undefined) {
        var obj1 = obj.split("=")[1];
        if (obj1 != undefined) {
          state = obj1;
        }
      }
      redirectUri = encodeURIComponent(redirectUri);//编码
      try {
        let res = await Api.getWXCode({"redirectUri": redirectUri, "state": state, "type": "1"}),
          data = res.body;
        if (data.code == 1) {
          if (data.entity.value == '') {
            this.showMsg('回调地址为空');
          } else {
            window.location.href = data.entity.value;
            //window.location.href = "index.html?code=1";
          }
        } else {
          this.showMsg(data.body.msg);
        }

      } catch (data) {
        this.showMsg(data.body.msg);
      }
    },
    /**
     * 获取openid
     * @param code
     * @param sec
     */
    async getWXOpenid (code, sec){
      try {
        let res = await Api.getWXOpenid({"code": code}),
          data = res.body;
        if (data.code == 1) {
          if (data.entity.value == '') {
            this.showMsg("openid为空");
          } else {
            var openid = data.entity.value;
            localStorage.setItem("xmOpenid", openid);
            if (sec) {
              sec(openid);
            }
          }
        } else {
          this.showMsg(data.body.msg);
        }
      } catch (data) {
        this.showMsg(data.body.msg);
      }
    },
    /**
     * 获取缓存openid
     */
    getCacheOpenId(){
      return localStorage.getItem("xmOpenid");
    }

  },
  computed: {},
  filters: {},
  watch: {},
  mounted() {
  }

};
