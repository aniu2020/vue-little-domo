<script>
  import Vue from 'vue';
  import mixin from '@/mixin';

  import {Navbar, TabItem} from 'mint-ui';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);

  import {TabContainer, TabContainerItem} from 'mint-ui';

  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);

  export default {
    name: 'detail',
    template: require("./detail.tpl.html"),
    data() {
      return {
        titles: '详情页',//网页标题
        footerSet: {//脚部设置
          isHideFooter: false,//是否隐藏脚部
          footerCur: 'detail'//当前页面
        },
        selected: '1'
      }
    },
    mixins: [mixin],
    props: [""],
    components: {},
    mounted() {
    },
    methods: {
      /**
       * 初始化
       */
      init(){

      }
    },
    computed: {},
    filters: {},
    watch: {},
    destroyed(){

    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./detail.scss"></style>
