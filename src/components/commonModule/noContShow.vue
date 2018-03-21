<template>
  <div class="no-cont-show">
    <div class="cont-show-hd">
      <img :src="noContImg" alt="">
      <!--<img src="~assets/images/common_img/no_cont_img.png" alt="">-->
    </div>
    <div class="cont-show-bd">
      <p class="show-bd-text">{{noContShowCont.tip}}</p>
      <p class="no-cont-show-op">
        <a href="javascript:;" v-for="item in noContShowCont.userOp" @click="item.func">{{item.opText}}</a>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'noContShow',
    data() {
      return {
        noContImg: require("../../assets/images/common_img/no_cont_img.png"),//默认图片
      }
    },
    props: ["noContShowCont"],
    methods: {},
    computed: {},
    filters: {},
    watch: {},
    mounted() {
      this.noContImg = this.noContShowCont.tipsImg || this.noContImg;
    },
    destroyed(){

    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped src="./noContShow.scss"></style>
