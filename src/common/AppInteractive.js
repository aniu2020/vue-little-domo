let AppInteractive = {
  /**
   * 创建iframe
   * @param option
   */
  createIframe(option){
    let options = option || {},
      iframe = document.createElement('iframe');
    iframe.src = options.setSrc || '';
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  },
  /**
   * 获取用户信息
   * @param param
   * @param sec
   * @param err
   */
  userInfo (param, sec, err) {
    window.initUser = function (data) {
      sec(data && JSON.parse(data).token);
    };
    this.createIframe({
      setSrc: 'smilife://userInfo?callback=initUser'
    });
  },
  /**
   * 去登录
   */
  // login () {
  //   this.jumpToLogin();
  // },
  /**
   * 跳去登录
   */
  jumpToLogin () {
    this.createIframe({
      setSrc: 'smilife://login'
    });
  },
  /**
   * 返回首页
   */
  goHome () {
    this.createIframe({
      setSrc: 'smilife://goHome'
    });
  },
  /**
   * 返回上一页
   */
  goBackLastPage () {
    this.createIframe({
      setSrc: 'smilife://goLastPage'
    });
  },
  /**
   * 支付
   * @param param
   * @param sec
   * @param err
   */
  pay (param, sec, err) {
    // location.href = domain + `/resources/wap-shop/pages/wx_charge.html?orderInfo=${orderId}|${orderType}`
    let params = param || {},
      orderId = params.orderId || '',//订单号
      orderAmount = params.orderAmount || '',//金额
      orderType = params.orderType || '',//类型 {"2": "charge", "3": "movie", "1": "goods"};
      types = {"2": "charge", "3": "movie", "1": "goods"},
      closeViewType = params.closeViewType || ''; //??
    this.createIframe({
      setSrc: `smilife://pay?orderId=${orderId}&orderAmount=${orderAmount}&orderType=${types[orderType]}&closeViewType=${closeViewType}`
    });
  },
  /**
   * 获取uuid
   * @param param
   * @param sec
   * @param err
   */
  getUUID (param, sec, err) {
    window.initGetUUID = function (data) {
      sec(data && JSON.parse(data).uuid);
    };
    this.createIframe({
      setSrc: 'smilife://getUUID?callback=initGetUUID'
    });

  },
  /**
   * 打开购物车
   */
  openShoppingCar () {
    this.createIframe({
      setSrc: 'smilife://openShoppingCar'
    });
  },
  /**
   * 分享
   * @param param
   * @param sec
   * @param err
   */
  shareSomething(param, sec, err){
    let params = param || {},
      shareUrl = params.shareUrl,
      title = params.title,
      describe = params.describe,
      imageUrl = params.imageUrl;
    this.createIframe({
      setSrc: `smilife://shareSomething?shareUrl=${shareUrl}&title=${title}&describe=${describe}&imageUrl=${imageUrl}`
    });
  },
  /**
   * 打电话
   * @param param
   * @param sec
   * @param err
   */
  callPhone (param, sec, err) {
    let params = param || {},
      phone = params.phone;
    this.createIframe({
      setSrc: `smilife://callPhone?phone=${phone}`
    })
  }
};

export default AppInteractive;
