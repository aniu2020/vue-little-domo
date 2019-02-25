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
    }
  },
  props: [""],
  mixins: [mixin],
  components: {},
  mounted () {
    console.log('ts-keep-alive-b-mounted')
  },
  methods: {
    init () {

    }
  },
  computed: {},
  filters: {},
  watch: {},
  activated () {

  },
  beforeRouteLeave (to, from, next) {
    console.log('---to---', to, '---from---', from, to.path !== '/tskeepalivec', 'ts-keep-alive-b-beforeRouteLeave')
    if (to.path !== '/tskeepalivec') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
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
    
    