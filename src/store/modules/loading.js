import * as types from '../types.js'
const state = {
  // 请求数据时加载状态loading
  fetchLoading: false
};
const getters = {
  // 请求数据时加载状态
  fetchLoading: state => state.fetchLoading
};
const actions = {
  // 请求数据时状态loading
  FETCH_LOADING({commit}, res) {
    commit(types.FETCH_LOADING, res)
  },
};
const mutations = {
  // 请求数据时loading
  [types.FETCH_LOADING] (state, res) {
    state.fetchLoading = res
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
