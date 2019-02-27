<script>
import mixin from '@/mixin';
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
export default {
  name: 'ts-vue-scroller',
  template: require("./ts-vue-scroller.tpl.html"),
  data () {
    return {
      footerSet: {//网站脚部信息
        footerCur: 'ts-vue-scroller',
        isHideFooter: false
      },
      headerSet: {//网站头部信息
        pageTitle: 'ts-vue-scroller',
        isHideHeader: false
      },
      lists: [],
      currentPage: 1
    }
  },
  props: [""],
  mixins: [mixin],
  components: {},
  mounted () {
    // this.getPostsFn()
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
        // this.loading = false;
        console.log(res,999)
        res.body = res.body || [];
        this.lists = [...this.lists, ...res.body];
      } catch (err) {
        console.log('getPostsFnErr', err)
        this.$_showMsg(err.body && err.body.message || '网络异常')
      }
    },
    refresh (done) {

    },
    infinite (done) {
      this.currentPage++
      this.getPostsFn()
      //  done()
    }
  },
  computed: {},
  filters: {},
  watch: {},
  destroyed () {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./ts-vue-scroller.scss"></style>
    
    