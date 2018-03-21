<template>
	<div id="" v-show="$store.state.header.showHeader">
		<div id="top_field" style="height: 0.88rem;"></div>
		<nav class="v2-common-nav">
			 	  <a v-if="$store.state.header.gobackShow" href="javascript:;" class="v2-common-back" id="goback" @click="backaction">
			 	  	<i class="fa-angle-left"></i>
			 	  </a>
			 	  <span class="subjectTitle" id="subjectTitle">{{$store.state.header.title}}</span>
			 	  <div class="h-right">
			 	  	<a v-for="item in $store.state.header.rightmenu" href="javascript:;" class="fa-right" @click="item.func">{{item.content}}
			 	  		<span v-html="item.html"></span>
			 	    </a>
			 	  </div>
		</nav>
	</div>
</template>
<script>
	export default {
		name: 'header',
		data() {
			return {

			}
		},
		props:["backaction"],
		methods: {
			init() {
			},
			goBack(){
				this.$store.commit('setBack',true);
			}
		},
		computed: {
//			title(){
//				this.$store.state.addr.title
//			}
		},
		filters: {

		},
		watch: {

		},
		mounted() {
			this.init();
		},


	}
</script>
<style  lang="scss" scoped src="./header.scss"></style>
<!--h-right-com 属于未来元素 不能加scoped 否则样式不生效-->
<style>
  .h-right-com{
    position: absolute;
    right: .12rem;
    display: inline-block;
    background-image:url("~assets/images/icon_home.png");
    background-size:0.6rem 0.5rem;
  }
	.h-right .search{
	    width: .4rem;
	    height: .4rem;
	    background-position: -0.82rem -0.54rem;
      top: .22rem;
	}
  .h-right .go-index{
    width: .55rem;
    height: .52rem;
    /*background-position:-1.32rem -.54rem;*/
    top: .2rem;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
