import Vue from 'vue'
import {Loadmore} from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import {Toast} from 'mint-ui';
import Native from "../common/Native";
import store from '@/store/'

export default {
  data() {
    return {}
  },
  methods: {
    init() {

    },
    refresh() {
      this.init();
    },
    goBack() {
      if (this.isSmiApp()) {
        Native.goBackLastPage([], function (res) {
          this.showMsg(res);
        }, function (res) {
          this.showMsg("接口错误");
        })
      } else {
        history.go(-1);
      }
    },
    /**
     * 上拉刷新
     */
    loadTop() {
      this.refresh();
      this.$refs.loadmore.onTopLoaded();
    },
    loadmore() {

    },
    // handleBottomChange(status) {
    //   this.bottomStatus = status;
    // },
    // loadBottom() {
    //   this.loadmore();
    //   setTimeout(() => {
    //     this.$refs.loadmore.onBottomLoaded();
    //   }, 1000);
    // },
    handleTopChange(status) {
      this.topStatus = status;
    },
    // handleBottomChange(status) {
    //   this.bottomStatus = status;
    // },
    /**
     * 设置网页标题
     */
    setDocunmentTitle() {
      var title = this.titles ? this.titles : "";
      document.title = title;
      this.weixinTitle(title);
    },
    weixinTitle(title) {
      var $body = document.body;
      document.title = title;
      var $iframe = _createDom('<iframe class="for-wxtitle-change" style="display: none"></iframe>');
      $iframe.addEventListener('load', _load);
      $body.appendChild($iframe);

      function _load() {
        setTimeout(function () {
          $iframe.removeEventListener('load', _load);
          $body.removeChild($iframe);
        }, 0);
      }

      function _createDom(htmlStr) {
        var tmp = document.createElement('div');
        tmp.innerHTML = htmlStr;
        var children = tmp.childNodes;
        for (var i = 0; i < children.length; i++) {
          if (children[i].nodeType === 1) {
            return children[i];
          }
        }
        return;
      }
    },
    /**
     * 无痕模式提醒
     */
    incognitoModeJudge(){
      // incognito mode 无痕模式提醒
      try {
        localStorage.setItem('incognitoModeJudge', 'incognitoModeJudgeTest');
      } catch (e) {
        if (e.name == 'QuotaExceededError') {
          this.showMsg('请勿使用无痕模式浏览本网站，否则会影响本站提供的部分功能！');
          localStorage.clear();
          localStorage.setItem('incognitoModeJudge', 'incognitoModeJudgeTest');
        }
      }
    }
  },
  computed: {},
  filters: {},
  watch: {},
  mounted() {
    //初始化
    this.init();
    //设置标题
    this.setDocunmentTitle();
    // var _gobackShow = true;
    // _gobackShow = this.gobackShow == false ? false : true
    // this.$store.commit("setHeader", {
    //   gobackShow: _gobackShow,
    //   title: this.titles ? this.titles : "星美生活",
    //   back: () => {
    //     this.goBack()
    //   },
    //   rightmenu: this.rightmenu || []
    // });
    // document.body.scrollTop = 0;

    //无痕模式提醒
    this.incognitoModeJudge();

    //网站脚部信息配置
    let footerSet=this.footerSet || {};
    store.dispatch('WEB_FOOTER_INFO', {
      isHideFooter: footerSet.isHideFooter || false,//是否隐藏脚部
      footerCur:footerSet.footerCur || 'home',//当前页面
    })

  }

};
