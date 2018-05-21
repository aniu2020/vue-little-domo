<script>
  import mixin from '@/mixin';
  import qiniuUpload from '@/components/common-module/qiniu-upload/qiniu-upload';
  export default {
    name: 'qiniu-image-upload',
    template: require("./qiniu-image-upload.tpl.html"),
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
      uploadComplete(status, result, flag) {
        if (status == 200) { //
          this.thumbnail = `http://ojljnwfwk.bkt.clouddn.com/${result.key}` //七牛域名 + 返回的key 组成文件url
          this.updateUserInformationFn({headPath: result.key})
        } else {
          //失败处理
        }
      },
    },
    computed: {},
    filters: {},
    watch: {},
    destroyed(){

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./qiniu-image-upload.scss"></style>
<style type="text/scss" lang="scss">
  .qiniu-image-upload {
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
          display: block;
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1.28rem;
          }
        }
      }
    }
  }
</style>

