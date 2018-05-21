import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let config = [
  {//默认首页
    path: '/',
    component: resolve => require.ensure([], () => resolve(require('@/pages/home/home')), 'home'),
    meta: {hideHeader: true},
    test: 'fdf'
  },
  {//首页
    path: '/home',
    name: 'home',
    meta: {
      test: 'test',
    },
    component: resolve => require.ensure([], () => resolve(require('@/pages/home/home')), 'home')
  },
  {//详情页
    path: '/detail',
    name: 'detail',
    test: 'test',
    component: resolve => require.ensure([], () => resolve(require('@/pages/detail/detail')), 'detail')
  },
  {//详情页
    path: '/detail/:id',
    name: 'detailtwo',
    component: resolve => require.ensure([], () => resolve(require('@/pages/detail/detail')), 'detail')
  },
  {//测试方式list
    path: '/testfnlist',
    name: 'testfnlist',
    meta: {
      test: 'test',
    },
    component: resolve => require.ensure([], () => resolve(require('@/pages/testFnList/test-fn-list')), 'testfnlist')
  },
  {//测试tab（选项卡）
    path: '/testtab',
    name: 'testtab',
    meta: {
      test: 'test',
    },
    component: resolve => require.ensure([], () => resolve(require('@/pages/testTab/test-tab')), 'testtab')
  },
  {//html转图片
    path: '/htmltoimg',
    name: 'htmltoimg',
    meta: {
      // test: 'test',
    },
    component: resolve => require.ensure([], () => resolve(require('@/pages/html-to-img/html-to-img')), 'htmltoimg')
  },
  {//测试vue sync 和 model
    path: "/vuesyncmodel",
    component: resolve => require.ensure([], () => resolve(require('@/pages/vue-sync-model/vue-sync-model')), "vuesyncmodel"),
    name: "",
  },
  {//测试七牛图片上传
    path: "/qiniuimageupload",
    component: resolve => require.ensure([], () => resolve(require('@/pages/qiniu-image-upload/qiniu-image-upload')), "qiniuimageupload"),
    name: "",
  },
];

export  default  config
