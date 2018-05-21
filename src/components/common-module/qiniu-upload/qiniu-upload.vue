<script>
  import imageClipper from '@/components/common-module/image-clipper/image-clipper';
  export default {
    name: 'qiniu-upload',
    template: require("./qiniu-upload.tpl.html"),
    data() {
      return {
        accepts: { //允许的上传类型
          type: String,
          default: 'image/jpeg,image/jpg,image/png,image/gif'
        },
        flag: [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
        maxSize: {
          type: Number,
          default: 0 //上传大小限制
        },
        uploadImg: '',
        imageClipperShow: false,//剪切图片控件是否展示
      }
    },
    props: [""],
    components: {
      imageClipper
    },
    mounted() {
    },
    methods: {
      /**
       * 图片input Change
       * @param event
       * @returns {Promise.<boolean>}
       */
      uploadChange (event) {
        let file = event.target.files[0];
        if (!file) {
          this.$_showMsg('请选择图片上传！');
          return;
        }
        if (!/image\/\w+/.test(file.type)) {
          this.$_showMsg('请选择图片上传!');
          return;
        }
//        this.uploadImg=require('@/assets/images/01.jpg');
        /**
         * 获取文件地址
         * @param file
         * @returns {*}
         */
        var getObjectURL = function (file) {
          var url = null;
          if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;
        };
        var objUrl = getObjectURL(file);
        if (objUrl) {
          this.imageClipperShow = true;
          this.uploadImg = objUrl;
          this.$refs.mouploadinput.value = ''
        }


//        let readBlobAsDataURL=(blob, callback) =>{
//          var a = new FileReader();
//          a.onload = function(e) {callback(e.target.result);};
//          a.readAsDataURL(blob);
//        }
////example:
////        readBlobAsDataURL(blob, function (dataurl){
////          console.log(dataurl);
////        });
//        readBlobAsDataURL(file,  (dataurl)=>{
//          console.log(dataurl);
//          this.uploadImg = dataurl.substr(23);
////          console.log(file, 'file')
//        });
      },
      /**
       * 完成剪切
       */
      ok(data){
        this.imageClipperShow = false;
        /**
         * dataURL转换为File
         * @param dataurl
         * @param filename
         */
        let dataURLtoFile = function (dataurl, filename) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, {type: mime});
        }

        var file = dataURLtoFile(data, new Date().getTime() + '_' + parseInt(Math.random() * 1000000) + '.jpg');
        this.uploadQiNiu(file);

//        let $image = new Image();
//        $image.src = data;
//        $image.addEventListener('load', e => {
//
//        }, false);

      },
      /**
       * 取消剪切
       * */
      cancel(){
        this.imageClipperShow = false;
      },
      /**
       * 上传七牛
       * */
      async uploadQiNiu(file){
        const self = this;
        const flag = this.flag;
        if (!file) {
          return;
        }
        if (file) {
//          if (this.maxSize) {
//            //todo filter file
//          }
          //filter file, 文件大小,类型等过滤
          //如果是图片文件
          // const reader = new FileReader()
          // const imageUrl = reader.readAsDataURL(file)
          // img.src = imageUrl //在预览区域插入图片

          const formData = new FormData();
          formData.append('file', file)
          try {
            let res = await this.$_api.qiniuConfig();
            const result = res.body.data;
            formData.append('token', result.uptoken);
//            formData.append('key', result.key)
            //提交给七牛处理
            self.$http.post('http://up-z2.qiniu.com', formData, {
              progress(event) {
                  console.log(event,999)
                //传递给父组件的progress方法
                console.log(parseFloat(event.loaded / event.total * 100),123)
                self.$emit('progress', parseFloat(event.loaded / event.total * 100), flag)
              }
            })
              .then(response => {
                  const result = response.body
                  if (result.hash && result.key) {
                    //传递给父组件的complete方法
                    self.$emit('complete', 200, result, flag)
                    //让当前target可以重新选择
                    event.target.value = null
                  } else {
                    self.$emit('complete', 500, result, flag)
                  }
                }
                , (error) => {
                  self.$emit('complete', 500, error.message, flag)
                })


          } catch (err) {
            console.log('err:', err)
            this.$_showMsg(err.body && err.body.msg || '网络错误');
          }
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
<style scoped lang="scss" src="./qiniu-upload.scss"></style>

