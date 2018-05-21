<template>

  <section class="goods-index-nav" v-if="!$store.state.footer.webfooterinfo.isHideFooter">

    <a href="#/home" :class="['index-nav-item', {cur:$store.state.footer.webfooterinfo.footerCur=='home'}]">
      <span class="go-index-icon"></span>
      <span class="nav-item-text">首页</span>
    </a>
    <a href="#/detail" :class="['index-nav-item', {cur:$store.state.footer.webfooterinfo.footerCur=='detail'}]">
      <span class="cage-icon"></span>
      <span class="nav-item-text">详情</span>
    </a>
    <a href="#/testfnlist" :class="['index-nav-item', {cur:$store.state.footer.webfooterinfo.footerCur=='testfnlist'}]">
      <span class="cage-icon"></span>
      <span class="nav-item-text">testfnlist</span>
    </a>
    <!--<a href="#/GoodsCart" :class="['index-nav-item', {cur:type=='cart'}]">-->
      <!--<span class="shopping-cart-icon"></span>-->
      <!--<span class="nav-item-text">购物车</span>-->
    <!--</a>-->
    <!--<a href="#/UserCenter" :class="['index-nav-item', {cur:type=='my'}]">-->
      <!--<span class="my-center-icon"></span>-->
      <!--<span class="nav-item-text">我的</span>-->
    <!--</a>-->

  </section>

</template>
<script>
  export default {
    name: 'Footer',
    data() {
      return {
        type: ''
      }
    },
    props: [],
    methods: {},
    computed: {},
    filters: {},
    watch: {},
    mounted() {

    },

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./footer.scss"></style>
