<template>
  <a href="javascript:;" :class="[{'go-top':goTopShow}]" @click="goTop">
  </a>
</template>
<script>
	export default {
		name: 'goTop',
		data() {
			return {
        scrollDistance:0,//滚动距离
        goTopShow:false,
			}
		},
		props: [""],
		methods: {
      /**
       * 窗口滚动 显示顶部按钮
       */
      goTopShowFn(){
        this.scrollDistance = document.body.scrollTop;
        //滚动到第一屏的时候 展示返回顶部按钮
        if(this.scrollDistance>window.screen.height){
          this.goTopShow=true;
        }else{
          this.goTopShow=false;
        }
      },
      /**
       * 返回顶部
       */
      goTop(){
        document.body.scrollTop=0;
      }
		},
		computed: {

		},
		filters: {

		},
		watch: {

		},
    mounted() {
      window.addEventListener('scroll', this.goTopShowFn)
		},

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./goTop.scss"></style>
