import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let
  Home = (resolve) => {
    require.ensure(['@/pages/home/home'], () => {
      resolve(require('@/pages/home/home'))
    }, "home")
  },
  detail = (resolve) => {
    require.ensure(['@/pages/detail/detail'], () => {
      resolve(require('@/pages/detail/detail'))
    }, "detail")
  },
  testFnList = (resolve) => {
    require.ensure(['@/pages/testFnList/test-fn-list'], () => {
      resolve(require('@/pages/testFnList/test-fn-list'))
    }, "testFnList")
  },
  testTab = (resolve) => {
    require.ensure(['@/pages/testTab/test-tab'], () => {
      resolve(require('@/pages/testTab/test-tab'))
    }, "testTab")
  },
  htmltoimg = (resolve) => {
    require.ensure(['@/pages/html-to-img/html-to-img'], () => {
      resolve(require('@/pages/html-to-img/html-to-img'))
    }, "htmltoimg")
  };

let config = [
  {
    path: '/',
    component: testFnList,
    meta: {hideHeader: true},
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      test: 'test',
    },
    component: Home
  },
  {
    path: '/detail',
    name: 'detail',
    test: 'test',
    component: detail
  },
  {
    path: '/detail/:id',
    name: 'detailtwo',
    component: detail
  },
  {
    path: '/testfnlist',
    name: 'testfnlist',
    meta: {
      test: 'test',
    },
    component: testFnList
  },
  {
    path: '/testtab',
    name: 'testtab',
    meta: {
      test: 'test',
    },
    component: testTab
  },
  {
    path: '/htmltoimg',
    name: 'htmltoimg',
    meta: {
      // test: 'test',
    },
    component: htmltoimg
  },
  {
    path: "/vuesyncmodel",
    component: resolve => require.ensure([], () => resolve(require('@/pages/vue-sync-model/vue-sync-model')), "vuesyncmodel"),
    name: "",
  },
];

export  default  config
