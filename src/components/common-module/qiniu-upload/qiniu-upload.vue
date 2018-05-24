<script>
  import imageClipper from '@/components/common-module/image-clipper/image-clipper';
  export default {
    name: 'qiniu-upload',
    template: require("./qiniu-upload.tpl.html"),
    data() {
      return {
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
        let file = event.target.files[0];//拿到上传的文件
        //event.target.files => FileList {0: File(858835), length: 1}
        //event.target.files[0] => File(858835) {name: "123.gif",size: 858835,type:"image/gif" lastModified: 1526462225841, lastModifiedDate: Wed May 16 2018 17:17:05 GMT+0800 (中国标准时间), webkitRelativePath: "",  …}
        if (!file) {
          this.$_showMsg('请选择图片上传！');
          return;
        }
        if (!/image\/\w+/.test(file.type)) {
          this.$_showMsg('请选择图片上传!');
          return;
        }

        //preview img ： filereader方式
        //FileReader 获取图片的base64 代码
        //参考js图片前端预览之 filereader 和 window.URL.createObjectURL => https://www.cnblogs.com/saysmy/p/5626337.html
        //Html5 js FileReader接口 => https://www.cnblogs.com/access520/p/5672435.html

        //===将图片文件赋值给剪切插件处理===（这里有两个方法可用方法一是将图片转化成base64，方法二是将图片转化成本地地址，两个方法都可以）
        //方法一：
        /**
         * 图片文件转DataURL
         * */
        let FileReaderToDataURL = (file, callBack) => {
          if (!file) {
            return;
          }
          let fr = new FileReader();
          fr.readAsDataURL(file);//将文件读取为 DataURL（base64）
          fr.onload = function (file) {
            typeof callBack == 'function' && callBack(file.target.result)
            //file.target.result：data:image/gif;base64,R0lGODlh...NWWhtCwgAOw==
            //dataURL ==> data:image/jpeg;base64,/9j/4A...RQf/Z
            console.log(file.target, file.target.result, 'file.target.result')
          }
        }
        FileReaderToDataURL(file, (result) => {
          if (result) {
            this.imageClipperShow = true;
            this.uploadImg = result;
            this.$refs.mouploadinput.value = ''
          }
        })
        return;
//        方法二：
        /**
         * 获取文件本地地址
         * @param file
         * @returns {*}
         */
        let getFlieBlogURL = function (file) {
          let url = null;
          if (window.createObjectURL != undefined) { // basic createObjectURL获取图片的一个本地地址 方便本地预览 类似这样的：blob:http://192.168.22.146:6663/b35b99ea-cd52-4009-a55a-d23b0051a3cc
            //blob /blɒb/ (布罗布) 一滴；一抹 得零分；弄错
            //[HTML5] Blob对象 => https://www.cnblogs.com/hhhyaaon/p/5928152.html
            //Blob对象可以看做是存放二进制数据的容器
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;//url：blob:http://192.168.22.146:6663/b35b99ea-cd52-4009-a55a-d23b0051a3cc
        };
        let objUrl = getFlieBlogURL(file);
        if (objUrl) {
          this.imageClipperShow = true;
          this.uploadImg = objUrl;
          //同一张图片的时候，让当前input可以重新选择（同一张图片不会触发change事件）
          this.$refs.mouploadinput.value = ''
        }

      },
      /**
       * 完成剪切
       * dataURl(base64)
       */
      ok(dataURl){
          // imgData.append('file', base64.substr(23));
        //dataURL ==> data:image/jpeg;base64,/9j/4A...RQf/Z
        this.imageClipperShow = false;
        /**
         * dataURL转换为File
         * @param dataurl
         * @param filename
         */
        let dataURLtoFile = (dataurl, filename) => {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, {type: mime});
        };
        let file = dataURLtoFile(dataURl, new Date().getTime() + '_' + parseInt(Math.random() * 1000000) + '.jpg');
        this.uploadQiNiu(file);
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
          //要有onload
          // img.src = imageUrl //在预览区域插入图片

          const formData = new FormData();//FormData对象，可以把所有表单元素的name与value组成一个queryString
          //参考
          //new FormData() - FormData对象的作用及用法 => https://segmentfault.com/a/1190000012327982
          //HTML5 FormData 方法介绍以及实现文件上传 => https://blog.csdn.net/u014607184/article/details/52372551
          formData.append('file', file);
          try {
//            let res = await this.$_api.qiniuConfig();
            let res = await this.$http.get('http://192.168.68.113/login/v1/user/qiniu/config');
//            res：{"code":0,"msg":"success","data":{"uptoken":"3fNOMPqkma30JdzgLuZ0VRaOA5JSN3dYgmZVtqhp:0VtUlAe1soeJpAbNQIwt9NdkKz8=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTUyNzA3NzcxMH0=","domain":"http://ojljnwfwk.bkt.clouddn.com/"}}
            const result = res.body.data;
            formData.append('token', result.uptoken);
//            formData.append('key', result.key)
            //request payload 请求负载 即：formData
//            ------WebKitFormBoundaryiurFmjxcMAZX71ib
//            Content-Disposition: form-data; name="file"; filename="1527073895580_171706.jpg"
//            Content-Type: image/jpeg
//
//            ÿØÿàJFIFÿÛC...
//            ------WebKitFormBoundaryiurFmjxcMAZX71ib
//            Content-Disposition: form-data; name="token"
//
//            3fNOMPqkma30JdzgLuZ0VRaOA5JSN3dYgmZVtqhp:j_oCTJg7eBAdK5efQm7ABmrCKzg=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTUyNzA3NzM1OX0=
//              ------WebKitFormBoundaryiurFmjxcMAZX71ib--


            console.log(formData, 'formData')
            //提交给七牛处理
            this.$http.post('http://up-z2.qiniu.com', formData)
              .then(response => {
                  const result = response.body
                  if (result.hash && result.key) {
                    //传递给父组件的complete方法
                    this.$emit('complete', 200, result, flag)
                  } else {
                    this.$emit('complete', 500, result, flag)
                  }
                }
                , (error) => {
                  this.$emit('complete', 500, error.message, flag)
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

