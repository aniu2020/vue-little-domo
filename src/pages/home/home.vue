<script>
  import mixin from '@/mixin';
  export default {
    name: 'home',
    template: require("./home.tpl.html"),
    data() {
      return {
        titles: '首页',//网页标题
        footerSet: {//脚部设置
          isHideFooter: false,//是否隐藏脚部
          footerCur: 'home'//当前页面
        },
        getTopNewsList:[]
      }
    },
    mixins: [mixin],
    props: [""],
    components: {},
    mounted() {
      //restful风格
//      this.$_api.query({
//        page: 1,
//        pageSize: 2
//      })
//      console.log(this.$_config)
//      console.log(this.$route)
    },
    methods: {
      /**
       * 初始化
       */
      init(){
//        this.getAdvertsFn1();
//        this.getTopNews();
//        this.getAdvertsFn2();
      },
      /**
       * 写法1
       * @returns {Promise.<void>}
       */
      async getAdvertsFn1(){
        try {
          var res = await this.$_api.getAdverts({type: 1})
          this.$_showMsg(res.body.msg + '111')
        } catch (res) {
          console.log(res, 222,'async await')
          this.$_showMsg(res.body.msg + '222')
        }
      },
      /**
       * * 写法2
       */
      getAdvertsFn2(){
        this.$_api.getAdverts({
          type: 1
        }).then((res) => {
          this.$_showMsg(res.body.msg + '333')
        }).catch((res) => {
          console.log(res, 444,'then')
          this.$_showMsg(res.body.msg + '444')
        })
      },
      /**
       * 获取最新资讯
       * @returns {Promise.<void>}
       */
      async getTopNews(){
        try {
          var res = await this.$_api.getTopNews()
          this.getTopNewsList=res.body.entity
        } catch (res) {
          this.$_showMsg(res.body.msg)
        }
      },
    },
    computed: {},
    filters: {},
    watch: {},
    destroyed(){

    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./home.scss"></style>
