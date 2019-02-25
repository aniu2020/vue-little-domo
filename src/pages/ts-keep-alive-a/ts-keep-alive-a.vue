<script>
import mixin from '@/mixin';
export default {
  name: 'ts-keep-alive-a',
  template: require("./ts-keep-alive-a.tpl.html"),
  data () {
    return {
      footerSet: {//网站脚部信息
        footerCur: 'ts-keep-alive-a',
        isHideFooter: false
      },
      headerSet: {//网站头部信息
        pageTitle: 'ts-keep-alive-a',
        isHideHeader: false
      },
    }
  },
  props: [""],
  mixins: [mixin],
  components: {},
  mounted () {
    console.log('ts-keep-alive-a-mounted')
  },
  methods: {
    init () {

    }
  },
  computed: {},
  filters: {},
  watch: {},
  beforeRouteLeave (to, from, next) {
    console.log('---to---', to, '---from---', from, 'ts-keep-alive-a-beforeRouteLeave')
    if (to.path === '/tskeepaliveb') {
      to.meta.keepAlive = false
    }
    next()
  },
  destroyed () {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./ts-keep-alive-a.scss"></style>
    
    