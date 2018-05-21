<template>
  <div id="app">
    <!--页面切换-->
    <router-view></router-view>
    <transition name="fade">
      <Loading v-show="fetchLoading"></Loading>
    </transition>

    <!--网站脚部-->
    <webFooter></webFooter>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Loading from "./components/common-module/loading/loading"
  import webFooter from "@/components/common-module/footer/footer"
// import Api from '@/common/Api'
  export default {
    name: 'app',
    data() {
      return {}
    },
    props: [""],
    components: {
      Loading,
      webFooter
    },
    mounted() {
//      window.Api = Api;


    },
    methods: {},
    computed: {
      ...mapGetters([
        'fetchLoading',
      ]),
    },
    filters: {},
    watch: {},
    destroyed(){

    }
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  .fade-leave-active {
    opacity: 0;
    transition: all 0.5s ease
  }
</style>
