// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

//引用相关依赖
import '@/libs'

//样式
import '@/assets/sass/common/index.scss'

// 路由钩子
router.beforeEach((to, now, next) => {
  // 如果要保存当前页面的滚动条位置,且将要跳转的地址对应配置项
  // if (now.meta.storePostion) {
  //   let _shouldStore = now.meta.storeWhenGo.filter(item => to.name === item)
  //   now.meta.positionY = (_shouldStore.length > 0) ? document.body.scrollTop : 0
  // }
  next();
  store.dispatch('FETCH_LOADING', true);
});

router.afterEach(route => {
  Vue.nextTick(() => {
    // setTimeout(() => {
    //   // 如果要跳转的地址已经保存了滚动条位置,则需要恢复原来位置
    //   if (route.meta.storePostion) {
    //     document.body.scrollTop = route.meta.positionY || 0
    //   }
    //   document.title = route.meta.title || '默认标题'
    //   // store.dispatch('FETCH_LOADING', false);
    // }, 300)
    store.dispatch('FETCH_LOADING', false);
  });

  //移除元素
  var removeEle=(ele)=>{
    if (ele) {
      ele.parentNode.removeChild(ele);
    }
  };

  //星美统计
/*   window._XmAnalysisData = window._XmAnalysisData || [];
  (function () {
    var XMAnalysis = document.getElementById('XM-analysis');
    removeEle(XMAnalysis);
    var XmAnalysis = document.createElement('script');
    XmAnalysis.type = 'text/javascript';
    XmAnalysis.async = true;
    XmAnalysis.id = 'XM-analysis';

    var ua = navigator.userAgent;
    if (ua.match(/SMI_iOS/) || ua.match(/SMI_Android/)) {//app端
      XmAnalysis.src = 'http://log.smi170.com/smilogger/js/XmAnalysisAppWeb.min.js';
    }
    else {//移动端 微信端 pc端
      XmAnalysis.src = 'http://log.smi170.com/smilogger/js/XmAnalysisPcWeb.min.js?SmiLife';
    }
    // var s = document.getElementsByTagName('script')[0];
    // s.parentNode.insertBefore(XmAnalysis, s);
    var htmlHead = document.getElementsByTagName('head')[0];
    htmlHead.appendChild(XmAnalysis);

  })(); */

});

if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
// || process.env.NODE_ENV == 'development'
  // require('./libs/vconsole.min.js');
}

require('./libs/vconsole.min.js');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

