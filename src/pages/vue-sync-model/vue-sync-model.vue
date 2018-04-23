<script>
  //  smallPopupOriginal 原始的发布订阅
  Vue.component("smallPopupOriginal", {
    template: `
        <div class="small-popup-com small-popup-original" v-show="newPopupShow">
        <p>{{newPopupShow}}</p>
          <div class="popup-bg" @click="popupShow=false"></div>
          <div class="popup-wrap">
            <h3 class="popup-hd">我是标题<span class="close" @click="newPopupShow=false">x</span></h3>
            <div class="popup-bd">
              small-popup-original
            </div>
          </div>
        </div>

        `,
    data: function () {
      return {
        newPopupShow: this.popupShow//1.把props传过来的值复制到组件中新创的值（新创的副本）
      };
    },
    props: ["popupShow"],
    mounted() {
    },
    methods: {},
    watch: {
      /**
       * 监听父组件
       * */
      popupShow(val) {
        this.newPopupShow = val;//2.监听父组件，若父组件中popupShow值变化就赋给newPopupShow（副本）
      },
      /**
       * 通知父组件
       * */
      newPopupShow(val){
        this.$emit("newPopupShow-change", val);//3.如组件中newPopupShow（副本）的值变化，通过发布通知给父组件，父组件通过一个事件订阅对props进来的值进行对应的改变（<smallPopupOriginal :popupShow="smallPopupOriginalShow" @newPopupShow-change="newPopupShowChangeListen"></smallPopupOriginal> 这里的newPopupShowChangeListen）
      }
    },
  });

  //  smallPopupSync 通过sync 简单的进行双向数据绑定 其实就是上面第一种发布订阅的语法糖
  //api:https://cn.vuejs.org/v2/guide/components.html#sync-修饰符
  Vue.component("smallPopupSync", {
    template: `
        <div class="small-popup-com small-popup-sync" v-show="newPopupShow">
        <p>{{newPopupShow}}</p>
          <div class="popup-bg" @click="newPopupShow=false"></div>
          <div class="popup-wrap">
            <h3 class="popup-hd">我是标题<span class="close" @click="newPopupShow=false">x</span></h3>
            <div class="popup-bd">
              small-popup-sync
            </div>
          </div>
        </div>

        `,
    data: function () {
      return {
        newPopupShow: this.popupShow//1.把props传过来的值复制到组件中新创的值（新创的副本）
      };
    },
    props: ["popupShow"],
    mounted() {
    },
    methods: {},
    watch: {
      /**
       * 监听父组件
       * */
      popupShow(val) {
        this.newPopupShow = val;//2.监听父组件，若父组件中popupShow值变化就赋给newPopupShow（副本）
      },
      /**
       * 通知父组件
       * */
      newPopupShow(val){
        this.$emit("update:popupShow", val);//3.如组件中newPopupShow（副本）的值变化，通过发布通知给父组件，父组件通过一个事件订阅对props进来的值进行对应的改变
      }
    },
  });

  //  smallPopupVmodel
  //api:https://cn.vuejs.org/v2/api/#model
  Vue.component("smallPopupVmodel", {
    template: `
        <div class="small-popup-com small-popup-Vmodel" v-show="newPopupShow">
        <p>{{newPopupShow}}</p>
          <div class="popup-bg" @click="newPopupShow=false"></div>
          <div class="popup-wrap">
            <h3 class="popup-hd">我是标题<span class="close" @click="newPopupShow=false">x</span></h3>
            <div class="popup-bd">
              small-popup-Vmodel
            </div>
          </div>
        </div>

        `,
    data: function () {
      return {
        newPopupShow: this.value//1.把props传过来的值复制到组件中新创的值（新创的副本）
      };
    },
    props: {
      value: ''
    },
    mounted() {
    },
    methods: {},
    watch: {
      /**
       * 监听父组件
       * */
      value(val) {
        this.newPopupShow = val;//2.监听父组件，若父组件中popupShow值变化就赋给newPopupShow（副本）
      },
      /**
       * 通知父组件
       * */
      newPopupShow(val){
        this.$emit("input", val);//3.如组件中newPopupShow（副本）的值变化，通过发布通知给父组件
      }
    },
  });

  //  smallPopupVmodel2
  //api:https://cn.vuejs.org/v2/api/#model
  Vue.component("smallPopupVmodel2", {
    template: `
        <div class="small-popup-com small-popup-Vmodel" v-show="newPopupShow">
        <p>{{newPopupShow}}</p>
          <div class="popup-bg" @click="newPopupShow=false"></div>
          <div class="popup-wrap">
            <h3 class="popup-hd">我是标题<span class="close" @click="newPopupShow=false">x</span></h3>
            <div class="popup-bd">
              small-popup-Vmodel
            </div>
          </div>
        </div>

        `,
    data: function () {
      return {
        newPopupShow: this.value//1.把props传过来的值复制到组件中新创的值（新创的副本）
      };
    },
//    model: {
//      prop: 'checked',
//      event: 'change'
//    },
    props: {
      checked: Boolean,
//      value: String
    },
    mounted() {
    },
    methods: {},
    watch: {
      /**
       * 监听父组件
       * */
      checked(val) {
        this.newPopupShow = val;//2.监听父组件，若父组件中popupShow值变化就赋给newPopupShow（副本）
      },
      /**
       * 通知父组件
       * */
      newPopupShow(val){
        //this.$emit("input", val);//3.如组件中newPopupShow（副本）的值变化，通过发布通知给父组件，父组件通过一个事件订阅对props进来的值进行对应的改变（<smallPopupOriginal :popupShow="smallPopupOriginalShow" @newPopupShow-change="newPopupShowChangeListen"></smallPopupOriginal> 这里的newPopupShowChangeListen）
        this.$emit("change", val);
      }
    },
  });


  import mixin from '@/mixin';
  export default {
    name: 'vue-sync-model',
    template: require("./vue-sync-model.tpl.html"),
    data() {
      return {
        footerSet: {//网站脚部信息
          footerCur: 'vue-sync-model',
          isHideFooter: true
        },
        headerSet: {//网站头部信息
          pageTitle: 'vue-sync-model',
          isHideHeader: false
        },
        smallPopupOriginalShow: false,
        smallPopupSyncShow: false,
        smallPopupVmodelShow: false,
        smallPopupVmodel2Show: false,
      }
    },
    props: [""],
    mixins: [mixin],
    components: {},
    mounted() {
    },
    methods: {
      init(){

      },
      /**
       * 显示Original弹框
       * */
      smallPopupOriginalShowClick() {
//        this.smallPopupOriginalShow = !this.smallPopupOriginalShow;
        this.smallPopupOriginalShow = true;
      },
      /**
       * 监听Original组件里面newPopupShow-change事件 改变this.smallPopupOriginalShow的值
       * */
      newPopupShowChangeListen(val){
        console.log(val, 'newPopupShowChangeListen')
        this.smallPopupOriginalShow = val;
      },
      /**
       * 显示Sync弹框
       * */
      smallPopupSyncShowClick(){
        this.smallPopupSyncShow = true;
      },
      /**
       * 显示Vmodel弹框
       * */
      smallPopupVmodelShowClick(){
        this.smallPopupVmodelShow = true;
      },
      /**
       * 显示Vmodel2弹框
       * */
      smallPopupVmodel2ShowClick(){
        this.smallPopupVmodel2Show = true;
      }
    },
    computed: {},
    filters: {},
    watch: {},
    destroyed(){

    }
  }

  //参考
  Vue.component("smallPopupOriginalBak", {
    template: `
        <div class="small-popup-com small-popup-original" v-show="newPopupShow">
        <p>{{newPopupShow}}</p>
          <div class="popup-bg" @click="newPopupShow=false"></div>
          <div class="popup-wrap">
            <h3 class="popup-hd">我是标题<span class="close" @click="newPopupShow=false">x</span></h3>
            <div class="popup-bd">
              small-popup-original
            </div>
          </div>
        </div>

        `,
    props: ["popupShow"],
    data: function () {
      return {
        newPopupShow: this.popupShow//①popupShow的副本--newPopupShow
      };
    },
    mounted() {
//        if(this.popupShow){
//            this.newPopupShow=true;
//        }
    },
    methods: {
//          change() {
//            this.newPopupShow = !this.newPopupShow;
//          }
    },
    watch: {
      /**
       * 监听父组件
       * */
      popupShow(val) {
        this.newPopupShow = val;//②popupShow的变更，并同步到组件内的data属性newPopupShow中
      },
      /**
       * 通知父组件
       * */
      newPopupShow(val){
        this.$emit("newPopupShow-change", val);//③组件内对newPopupShow变更后向外部发送事件通知
      }
    },
  });

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped src="./vue-sync-model.scss"></style>
<style lang="scss" src="./popup.scss"></style>

