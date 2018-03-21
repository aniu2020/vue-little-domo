<template>
  <span class="count-down">
    <span>{{h}}</span> : <span>{{m}}</span> : <span>{{s}}</span>
  </span>
</template>
<script>
  export default {
    name: 'countDown',
    data() {
      return {
        timer: null,
        h: '00',
        m: '00',
        s: '00',
      }
    },
    props: ["time"],
    methods: {
      /**
       * countDownFn 倒计时
       * @param time
       */
      countDownFn(time) {
//        setTimeout( () =>{
//        },1000)
        time = Number(this.time);
        time = parseInt(time);
        var tiemss = '';
        if (time == 0) {
          return;
        }
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          tiemss = time--;
          if (Math.floor(time / 3600) > 99) {
            this.h = 99;//场次倒计时h
          } else {
            this.h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600);//场次倒计时m
          }
          this.m = Math.floor(time % 3600 / 60) < 10 ? '0' + Math.floor(time % 3600 / 60) : Math.floor(time % 3600 / 60);
          this.s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);//场次倒计时s
          //如果倒计时结束  刷新页
          if (this.h == 0 && this.m == 0 && this.s == 0) {
            location.reload();
            clearInterval(this.timer);
          }
        }, 1000);

      },

    },
    computed: {},
    filters: {},
    watch: {},
    mounted() {
      this.countDownFn();
    },
    destroyed(){
      if (this.timer) {
        clearInterval(this.timer);
      }
    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./countDown.scss"></style>
