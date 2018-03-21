<template>
    <div class="children-components">
      <p> ---childrenComponents2---/start </p>

      <input type="button" value="tell-childrenComponents1-something" @click="tellChildrenComponents1Something">
      <p>来自组件1的消息：{{getChildrenComponents1Data}}</p>
      <p> ---childrenComponents2---/start/end </p>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
              getChildrenComponents1Data:''
            }
        },
        props: [""],
        components: {},
        methods: {
          /**
           * 消息提交给组件1
           */
          tellChildrenComponents1Something(){//两个组件通过相互提交 监听来实现数据的通信
            DataBridge.$emit('childrenComponents2Data','我是组件2的消息！')
          },
        },
        computed: {},
        filters: {},
        watch: {},
        mounted() {
          DataBridge.$on('childrenComponents1Data',(val)=>{//监听组件1的消息
              this.getChildrenComponents1Data=val;
          })
        },

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped lang="scss" src="./childrenComponents1.scss"></style>-->
