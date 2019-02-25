<script>
  import mixin from '@/mixin';
  export default {
    name: 'ts-keep-alive-c',
    template: require("./ts-keep-alive-c.tpl.html"),
    data() {
      return {
        footerSet: {//网站脚部信息
          footerCur: 'ts-keep-alive-c',
          isHideFooter: false
        },
        headerSet: {//网站头部信息
          pageTitle: 'ts-keep-alive-c',
          isHideHeader: false
        },
      }
    },
    props: [""],
    mixins: [mixin],
    components: {},
    mounted() {
      console.log('ts-keep-alive-c-mounted')
    },
    methods: {
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
<style scoped lang="scss" src="./ts-keep-alive-c.scss"></style>
    
    