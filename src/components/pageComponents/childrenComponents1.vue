<template>
    <div class="children-components">
      <p> ---childrenComponents1---/start </p>

      <input type="button" value="tell-father-something1" @click="tellFatherSomething1">

      <input type="button" value="tell-childrenComponents2-something" @click="tellChildrenComponents2Something">

      <p>来自组件2的消息：{{getChildrenComponents2Data}}</p>

      <p> ---childrenComponents1---/start/end </p>
    </div>
</template>
<script>
  import Vue from 'vue';
  window.DataBridge = new Vue();
    export default {
        name: '',
        data() {
            return {
              tellFatherData:'我来自子元素消息1！',
              getChildrenComponents2Data:''
            }
        },
        props: [""],
        components: {},
        methods: {
          /**
           * 利用子元素$emit(发布),父元素event(事件)来通信
           */
          tellFatherSomething1(){
            this.$emit('childrenComponents1Data',this.tellFatherData)
          },
          /**
           * 消息提交给组件2
           */
          tellChildrenComponents2Something(){//两个组件通过相互提交 监听来实现数据的通信
            DataBridge.$emit('childrenComponents1Data','我是组件1的消息')
          }
        },
        computed: {},
        filters: {},
        watch: {},
        mounted() {
          DataBridge.$on('childrenComponents2Data',(val)=>{//监听组件2的消息
            this.getChildrenComponents2Data=val;
          })
        },

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./childrenComponents1.scss"></style>
