// ui框架
import Vue from 'vue'
import MintUI from 'mint-ui'
// 自定义全局样式
// import '@/themes/main.scss'
// mint-ui 框架样式
import 'mint-ui/lib/style.css'

import {
  Popup,
  Button,
  Range,
  Spinner,
  Indicator,
  InfiniteScroll,
  TabContainer,
  TabContainerItem,
  Lazyload
} from 'mint-ui'

Vue.component(Popup.name, Popup)
Vue.component(Button.name, Button)
Vue.component(Range.name, Range)
Vue.component(Spinner.name, Spinner)
Vue.component('infinite-scroll', InfiniteScroll)
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.use(InfiniteScroll)

Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('../assets/images/loading-spin.svg'),
  loading: require('../assets/images/loading-spin.svg'),
  attempt: 1
});
