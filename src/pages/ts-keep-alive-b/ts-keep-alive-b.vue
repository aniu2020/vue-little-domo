<script>
import mixin from '@/mixin';
export default {
  name: 'ts-keep-alive-b',
  template: require("./ts-keep-alive-b.tpl.html"),
  data () {
    return {
      footerSet: {//网站脚部信息
        footerCur: 'ts-keep-alive-b',
        isHideFooter: false
      },
      headerSet: {//网站头部信息
        pageTitle: 'ts-keep-alive-b',
        isHideHeader: false
      },
      list: []
    }
  },
  props: [""],
  mixins: [mixin],
  components: {},
  mounted () {
    console.log('ts-keep-alive-b-mounted')
     this.getPostsFn()
  },
  methods: {
    init () {
     
    },
    /**
   * 获取文章分类下的文章
   */
    async getPostsFn () {
      try {
        let categoriesObj = {
          page: this.currentPage,//当前第几页
          per_page: 5,//一页多少数据
        }
        let res = await this.$_api.getCatePosts(categoriesObj);
        this.loading = false;
        //                    this.notContShow = true;
        res.body = res.body || [];
        this.list = [...this.list, ...res.body];
      } catch (res) {
        this.$_showMsg(res.body && res.body.message || '网络异常')
      }

    }
  },
  computed: {},
  filters: {},
  watch: {},
  activated () {

  },
  beforeRouteLeave (to, from, next) {
    console.log('---to---', to, '---from---', from, to.path !== '/tskeepalivec', 'ts-keep-alive-b-beforeRouteLeave')
    // if (to.path !== '/tskeepalivec') {
    //   from.meta.keepAlive = false
    // } else {
    //   from.meta.keepAlive = true
    // }
    //  if (from.path === '/tskeepalivec') {
    //   from.meta.keepAlive = true
    // }
    next()
    // 设置下一个路由的 meta
    // if (to.path === "/merchantshome") {
    //   from.meta.keepAlive = false // 设置当前的无缓存
    // } else {
    //   to.meta.keepAlive = true
    // }
    // to.meta.keepAlive = true
    // clearInterval(this.timer)
  },
  destroyed () {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./ts-keep-alive-b.scss"></style>
    
    