<script>
  import mixin from '@/mixin';
  import html2canvas from 'html2canvas';
  import VueQriously from 'vue-qriously'
  export default {
    name: 'html-to-img',
    template: require("./html-to-img.tpl.html"),
    data() {
      return {
        footerSet: {//网站脚部信息
          footerCur: 'html-to-img',
          isHideFooter: false
        },
        headerSet: {//网站头部信息
          pageTitle: 'html-to-img',
          isHideHeader: false
        },
        canvasTest: '',
        QRcodeSharePopUpShow: false,//二维码图片弹框
        qriouslyUrl: document.URL
      }
    },
    props: [""],
    mixins: [mixin],
    components: {
      VueQriously
    },
    mounted() {
//      this.$nextTick(() => {
      setTimeout(() => {
        html2canvas(document.getElementById('test-to-img'), {
          useCORS: true,//开启跨域配置
        }).then((canvas) => {
//          var width = document.getElementById('test-to-img').offsetWidth; //获取dom 宽度
//          var height = document.getElementById('test-to-img').offsetHeight; //获取dom 高度 内容高+padding+边框
//          let dom = document.querySelector('#test-to-img');
//          let box = window.getComputedStyle(dom);
          canvas.id = "myCanvas";
          this.canvasTest = canvas;
//          document.querySelector('#html-to-img').appendChild(canvas);
          /**
           * conver to img
           * @param canvas
           */
          let convertCanvasToImage = (canvas) => {
            let image = new Image();
            image.src = canvas.toDataURL("image/jpeg");
//            image.width = parseInt(box.width);
//            image.height = parseInt(box.height);
            return image;
          };
          convertCanvasToImage(canvas);
          document.querySelector('#QRcodeShare-img').appendChild(convertCanvasToImage(canvas));
        }).catch((res) => {
          console.log(res, 'err')
        });
      }, 1000)

//
//      var pic;
//      var canvas2 = document.createElement("canvas");
//      let _canvas = document.querySelector('#test-to-img');
//      var w = parseInt(window.getComputedStyle(_canvas).width);
//      var h = parseInt(window.getComputedStyle(_canvas).height);
//      //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
//      canvas2.width = w * 2;
//      canvas2.height = h * 2;
//      canvas2.style.width = w + "px";
//      canvas2.style.height = h + "px";
//      //可以按照自己的需求，对context的参数修改,translate指的是偏移量
//      var context = canvas2.getContext("2d");
//      context.scale(2,2);
//      html2canvas(document.querySelector('#test-to-img'),{
//        canvas:canvas2,
//        useCORS: true,//开启跨域配置
//      }).then(function(canvas) {
//        pic=canvas;
//        let convertCanvasToImage = (canvas) => {
//          var image = new Image();
//          image.src = canvas.toDataURL("image/jpeg");
////            let dom = document.querySelector('#test-to-img');
////            let box = window.getComputedStyle(dom);
////            image.width = parseInt(box.width);
////            image.height = parseInt(box.height);
//          return image;
//        };
//        convertCanvasToImage(canvas);
//        document.querySelector('#QRcodeShare-img').appendChild(convertCanvasToImage(canvas));
////          document.querySelector('#QRcodeShare-img').appendChild((canvas));
//        //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
////          document.querySelector(".down").setAttribute('href',canvas.toDataURL());
//      });
//
//      return

//      })

    },
    methods: {
      init(){
      },
      /**
       * 二维码分享
       * */
      QRcodeShare(){
        this.QRcodeSharePopUpShow = true;
      },
      /**
       * 在本地进行文件保存
       * @param  {String} data     要保存到本地的图片数据
       * @param  {String} filename 文件名
       */
      saveFile(data, filename) {
        let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');//createElementNS() 方法可创建带有指定命名空间的元素节点。 此方法可返回一个 Element 对象。 createElementNS(ns,name) ns	字符串值，可为此元素节点规定命名空间的名称。 name	字符串值，可为此元素节点规定其名称。
        saveLink.href = data;
        saveLink.download = filename;
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        saveLink.dispatchEvent(event);
      },
      saveFileClick(){
        this.saveFile(this.canvasTest.toDataURL('image/jpeg'), '我是图片名字')
        return
        //图片导出为 png 格式
        var type = 'png';
        var imgData = this.canvasTest.toDataURL(type);

        /**
         * 获取mimeType
         * @param  {String} type the old mime-type
         * @return the new mime-type
         */
        var _fixType = function (type) {
          type = type.toLowerCase().replace(/jpg/i, 'jpeg');
          var r = type.match(/png|jpeg|bmp|gif/)[0];
          return 'image/' + r;
        };

        // 加工image data，替换mime type
        imgData = imgData.replace(_fixType(type), 'image/octet-stream');

        /**
         * 在本地进行文件保存
         * @param  {String} data     要保存到本地的图片数据
         * @param  {String} filename 文件名
         */
        var saveFile = function (data, filename) {
          var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = data;
          save_link.download = filename;

          var event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        };

// 下载后的文件名
        var filename = '二维码.' + type;
// download
        saveFile(imgData, filename);
        return
//        var imgUri = this.canvasTest.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
//        window.location.href= imgUri; // 下载图片
        this.saveFile(this.canvasTest.toDataURL('image/jpeg'), '123')
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
<style scoped lang="scss" src="./html-to-img.scss"></style>
<style lang="scss" type="text/scss">
  .html-to-img #test-to-img .to-img-bd .goods-info .info-r .info-r-img {
    canvas {
      vertical-align: top;
    }
  }
  .html-to-img .QRcodeShare-pop-up .pop-up-bd .QRcodeShare-img img{
    width: 100%;
  }
</style>

