<script>
  import mixin from '@/mixin';
  export default {
    name: 'file-switch',
    template: require("./file-switch.tpl.html"),
    data() {
      return {
        footerSet: {//网站脚部信息
          footerCur: 'file-switch',
          isHideFooter: true
        },
        headerSet: {//网站头部信息
          pageTitle: 'file-switch',
          isHideHeader: false
        },
        fileimg: '',
      }
    },
    props: [""],
    mixins: [mixin],
    components: {},
    mounted() {
      //===03.dataURL转换为Blob对象、dataURL转换为File对象===
      /**
       * dataURL转换为Blob对象
       * @param dataurl
       */
      let dataURLtoBlob = (dataurl) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      };
      //调用:
      let blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');
//      console.log(blob)
      //Blob(7) {size: 7, type: "text/plain"}size: 7type: "text/plain"__proto__: Blob
      /**
       * dataURL转换为File对象
       * @param dataurl
       */
      let dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
      };
      //调用:
      let file = dataURLtoFile('data:text/plain;base64,YWFhYWFhYQ==', 'test.txt');
//      console.log(file)
      //File(7) {name: "test.txt", lastModified: 1527242473811, lastModifiedDate: Fri May 25 2018 18:01:13 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 7, …}
    },


    methods: {
      init(){

      },
      /**
       * File对象转换为dataURL
       * @param e
       */
      imgFileToDataURL(e){
        let file = e.target.files[0];
//          let file =e.currentTarget.files[0];
        //参考文档 e.target与e.currentTarget的区别：https://www.jianshu.com/p/1dd668ccc97a
        //e.target 指向触发事件监听的对象。 被点击的直接元素 li，target是事件的真正触发者
        //e.currentTarget 指向添加监听事件的对象。 被点击的父元素 ul(冒泡)，currentTarget始终是监听事件者
//        console.log('e.target:', e.target)
//        console.log('e.currentTarget:', e.currentTarget)
        console.log('file:', file)
        //===01.File对象转换为dataURL===
        /**
         *File对象转换为dataURL、Blob对象转换为dataURL 方法通用都用FileReader
         * @param file
         * @param callBack
         */
          //回调方式
        let fileToDataURL = (file, callBack) => {
            let fR = new FileReader();
            fR.readAsDataURL(file);//将文件读取为 DataURL（base64）
            fR.onload = (e) => {//e??
              typeof callBack == 'function' && callBack(e.target.result);
            }
          };

        //调用 file=>dataURL
        fileToDataURL(file, (res) => {
          this.fileimg = res;
          console.log('fileToDataURL-res:', res)

          //===04.将File,Blob的图片文件数据绘制到canvas（将file和blob的转化成dataURL，构造Image对象，src为dataURL，图片onload之后绘制到canvas）===
          //上传图片并压缩图片 1.上传图片；2.图片转dataURL；3.把dataURL赋值给一个新建图片，丢进canvas；4.由canvas来对图片压缩 canvas.toDataURL("image/jpeg", 1); //第二个参数是质量
          //File继承于Blob，扩展了一些属性（文件名、修改时间、路径等），基本各种转化都基于dataURL,dataURL又可以通过h5的FileReader来得到
          let canvas = document.getElementById('test-canvas')
          var img = new Image();
          //这里是错误的canvas宽高赋值 不能用style！直接用上面的等于
          // canvas.style.width=100+'px';
          // canvas.style.height=100+'px';
          img.onload = function () {
            console.log('img.width:',img.width)
            canvas.width = img.width;
            canvas.height = img.height;
            console.log('canvas', canvas)
            //context.drawImage(img,x,y,width,height);
            canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
            //drawImage() 方法在画布上绘制图像、画布或视频。 也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。  context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            //mg	规定要使用的图像、画布或视频。
            //sx	可选。开始剪切的 x 坐标位置。
            //sy	可选。开始剪切的 y 坐标位置。
            //swidth	可选。被剪切图像的宽度。
            //sheight	可选。被剪切图像的高度。
          };
          img.src = res;//res:dataURL


          //===05.canvas转换为dataURL (从canvas获取dataURL)
          var dataurl = canvas.toDataURL('image/png');
          var dataurl2 = canvas.toDataURL('image/jpeg', 0.8);

          //===06.Canvas转换为Blob对象并使用Ajax发送
          //转换为Blob对象后，可以使用Ajax上传图像文件。先从canvas获取dataurl, 再将dataurl转换为Blob对象
//          var dataurl = canvas.toDataURL('image/png');
//          var blob = dataURLtoBlob(dataurl);
////使用ajax发送
//          var fd = new FormData();
//          fd.append("image", blob, "image.png");
//          var xhr = new XMLHttpRequest();
//          xhr.open('POST', '/server', true);
//          xhr.send(fd);

        });
      },
      /**
       * Blob对象转换为dataURL
       * @param e
       */
      imgFileBlobToDataURL(e){
        //===02.Blob对象转换为dataURL===
        let file = e.target.files[0];
        /**
         *File对象转换为dataURL、Blob对象转换为dataURL 方法通用都用FileReader
         * @param file
         * @param callBack
         */
          //回调方式
        let fileToDataURL = (file, callBack) => {
            let fR = new FileReader();
            fR.readAsDataURL(file);//将文件读取为 DataURL（base64）
            fR.onload = (e) => {//e??
              typeof callBack == 'function' && callBack(e.target.result);
            }
          };
        /**
         * 获取文件本地的blob地址
         * @param file
         * @returns {*}
         */
        let getFileBlogURL = (file) => {
          let url = null;
          if (window.createObjectURL != undefined) { // basic createObjectURL获取图片的一个本地地址 方便本地预览 类似这样的：blob:http://192.168.22.146:6663/b35b99ea-cd52-4009-a55a-d23b0051a3cc
            //blob /blɒb/ (布罗布) 一滴；一抹 得零分；弄错
            //[HTML5] Blob对象 => https://www.cnblogs.com/hhhyaaon/p/5928152.html
            //Blob对象可以看做是存放二进制数据的容器
            //[JS进阶] JS 之Blob 对象类型  https://blog.csdn.net/oscar999/article/details/36373183
            // 可以使用 FileReader 接口从 blob 读取数据，也可以使用 URL.createObjectURL() 从 blob 创建一个新的 URL 对象
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;//url：blob:http://192.168.22.146:6663/b35b99ea-cd52-4009-a55a-d23b0051a3cc
        };
        /**
         * js 获取图片url的Blob值
         * @param url
         * @param cb
         * js 获取图片url的Blob值并预览 https://www.cnblogs.com/tujia/p/6483255.html
         */
        let getImageBlob = (url, cb) => {
          var xhr = new XMLHttpRequest();
          xhr.open("get", url, true);
          xhr.responseType = "blob";
          xhr.onload = function () {
            if (this.status == 200) {
              if (cb) cb(this.response);
            }
          };
          xhr.send();
        };
        getImageBlob(getFileBlogURL(file), (res) => {
          console.log('getImageBlob:', res)
          //调用 图片Blob=>dataURL
          fileToDataURL(res, (res) => {
            this.fileimg = res;
            console.log('fileToDataURL-res:', res)
          });
        })
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
<style scoped lang="scss" src="./file-switch.scss"></style>

