<script>
  import mixin from '@/mixin';
  import qiniuUpload from '@/components/common-module/qiniu-upload/qiniu-upload';
  export default {
    name: 'qiniu-image-upload',
    template: require("./qiniu-image-upload-test.tpl.html"),
    data() {
      return {
        footerSet: {//网站脚部信息
          footerCur: 'qiniu-image-upload',
          isHideFooter: false
        },
        headerSet: {//网站头部信息
          pageTitle: 'qiniu-image-upload',
          isHideHeader: false
        },
        thumbnail: null,
        headPicUrl: 'http://ojljnwfwk.bkt.clouddn.com/Fu5ZYioJHe9eM6-SgshNRj5qfmY0',
        progress: 0,//上传进度
        imageClipperShow: false,//剪切图片控件是否展示
        uploadImg: '',//剪切图片控件是否展示
      }
    },
    props: [""],
    mixins: [mixin],
    components: {
      qiniuUpload
    },
    mounted() {
    },
    methods: {
      init(){

      },
      uploadProgress (progress, flag) {
        //这里可以通过回调的flag对不同上传域做处理
        this.progress = progress < 100 ? progress : 0;
      },
      async uploadComplete(status, result, flag) {
        if (status == 200) { //
//          let res=await this.updateUserInformationFn({headPath: result.key})//把路径上传给后端 后端保存到数据库
          this.headPicUrl = `http://ojljnwfwk.bkt.clouddn.com/${result.key}` //七牛域名 + 返回的key 组成文件url
        } else {
          //失败处理
          this.$_showMsg('头像上传失败！')
        }
      },
      /**
       * 更新用户信息（头像）
       * @param sendData
       * @returns {Promise.<void>}
       */
      async updateUserInformationFn(sendData){
        try {
          let res = await this.$_api.updateUserInformation(sendData);
          this.headPicUrl=res.body.data.headPath;
        } catch (err) {
          console.log('err:', err);
          this.$_showMsg(err.body && err.body.msg || '网络错误');
        }
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
<style scoped lang="scss" src="./qiniu-image-upload-test.scss"></style>
<style type="text/scss" lang="scss">
  .qiniu-image-upload-test {
    .upload-hd-img {
      //qiniu-upload
      .qiniu-upload {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .mo-upload {
          width: 100%;
          height: 100%;
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>

