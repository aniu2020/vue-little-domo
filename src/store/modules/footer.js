import * as types from '../types.js'
const state = {
  // 请求数据时加载状态loading
  webfooterinfo: {
    footerCur: '',
    isHideFooter: ''
  }
};
const getters = {
  // 请求数据时加载状态
  webfooterinfo: state => state.webfooterinfo
};
const actions = {
  // 请求数据时状态loading
  WEB_FOOTER_INFO({commit}, res) {
    commit(types.WEB_FOOTER_INFO, res)
  },
};
const mutations = {
  // 请求数据时loading
  [types.WEB_FOOTER_INFO] (state, res) {
    state.webfooterinfo.footerCur = res.footerCur;
    state.webfooterinfo.isHideFooter = res.isHideFooter;
  }
};

// 触发派发
//网站脚部信息配置
// let footerSet=this.footerSet || {};
// this.$store.dispatch('WEB_FOOTER_INFO', {
//   isHideFooter: footerSet.isHideFooter || false,//是否隐藏脚部
//   footerCur:footerSet.footerCur || 'home',//当前页面
// })
// 数据调用
// this.$store.state.footer.webfooterinfo
export default {
  state,
  getters,
  actions,
  mutations
}
