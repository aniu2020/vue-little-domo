<script>
import mixin from '@/mixin';
export default {
  name: 'ts-canvas-sign',
  template: require("./ts-canvas-sign.tpl.html"),
  data () {
    return {
      footerSet: {//网站脚部信息
        footerCur: 'ts-canvas-sign',
        isHideFooter: true
      },
      headerSet: {//网站头部信息
        pageTitle: 'ts-canvas-sign',
        isHideHeader: true
      },
    }
  },
  props: [""],
  mixins: [mixin],
  components: {},
  mounted () {
    // let vm = 
    new this.LineCanvas({
      el: document.getElementById("sign-canvas"), // 绘制canvas的父级div
      clearEl: document.getElementById("clearCanvas"), // 清除按钮
      saveEl: document.getElementById("saveCanvas"), // 保存按钮
      linewidth: 5, // 线条粗细，选填
      color: "black", // 线条颜色，选填
      background: "#ffffff" // 线条背景，选填
    }, () => { // 用户落笔回调
      console.log('落笔了')
    }, (base64) => { // 保存按钮回调
      console.log('保存回调（canvas-to-base64）：', base64)
    })
    /*     window.Vue.use({
          vm
        }) */
    // 阻止微信浏览器下拉滑动效果（ios11.3 橡皮筋效果）
    document.addEventListener('touchmove', this.stopTouchmoveHandler, { passive: false })
    // 阻止微信浏览器下拉滑动效果（ios11.3 橡皮筋效果） https://segmentfault.com/a/1190000014134234
    // JS中event.preventDefault()取消默认事件能否还原？ https://segmentfault.com/q/1010000004819075
    // passive 参数不能省略，用来兼容ios和android
    //      document.body.addEventListener('touchmove', function (e) {
    //        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    //      }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
  },
  methods: {
    init () {

    },
    /**
    * 阻止屏幕滑动
    * */
    stopTouchmoveHandler (event) {
      event.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    },
    /**
     * canvas签名
     * @param obj canvas渲染参数
     * @param touchEndCallBack 用户落笔回调
     * @param saveElCallBack 保存按钮回调
     * @constructor
     */
    LineCanvas (obj, touchEndCallBack, saveElCallBack) {
      this.linewidth = 1
      this.color = "#000000"
      this.background = "#ffffff"
      for (let i in obj) {
        this[i] = obj[i]
      }
      this.canvas = document.createElement("canvas")
      this.el.appendChild(this.canvas)
      this.cxt = this.canvas.getContext("2d")// getContext(): Canvas.getContext(contextID) 方法返回一个用于在画布上绘图的环境
      this.canvas.width = this.el.clientWidth
      this.canvas.height = this.el.clientHeight
      this.cxt.fillStyle = this.background// fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width)
      // fillRect() 方法绘制“已填色”的矩形。默认的填充颜色是黑色。 context.fillRect(x,y,width,height);(矩形左上角的 x 坐标,矩形左上角的 y 坐标,矩形的宽度，以像素计,矩形的高度，以像素计)
      this.cxt.strokeStyle = this.color // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
      this.cxt.lineWidth = this.linewidth// lineWidth 属性设置或返回当前线条的宽度，以像素计。
      this.cxt.lineCap = "round"// 绘制圆形的结束线帽
      // 开始绘制
      this.canvas.addEventListener("touchstart", function (e) {
        this.cxt.beginPath()// beginPath() 方法开始一条路径，或重置当前的路径。
        // changedTouches: 涉及当前(引发)事件的触摸点的列表
        this.cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        // ctx.moveTo(0,0); ctx.lineTo(300,150); 开始一条路径，移动到位置 0,0。创建到达位置 300,150 的一条线 context.moveTo(x,y); 路径的目标位置的 x 坐标 路径的目标位置的 y 坐标
        // screenX clientX pageX的区别 https://www.cnblogs.com/yehuabin/archive/2013/03/07/2946004.html
        // screenX:鼠标位置相对于用户屏幕水平偏移量，而screenY也就是垂直方向的，此时的参照点也就是原点是屏幕的左上角。
        // clientX:跟screenX相比就是将参照点改成了浏览器内容区域的左上角，该参照点会随之滚动条的移动而移动。
        // pageX：参照点也是浏览器内容区域的左上角，但它不会随着滚动条而变动
      }.bind(this), false)
      // 绘制中
      this.canvas.addEventListener("touchmove", function (e) {
        this.cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        this.cxt.stroke() // stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色
      }.bind(this), false)
      // 结束绘制
      this.canvas.addEventListener("touchend", function () {
        this.cxt.closePath()
        typeof touchEndCallBack === 'function' && touchEndCallBack()
      }.bind(this), false)
      // 清除画布
      this.clearEl.addEventListener("click", function () {
        // clearRect() 方法清空给定矩形内的指定像素。
        // context.clearRect(x,y,width,height); (要清除的矩形左上角的 x 坐标,要清除的矩形左上角的 y 坐标,要清除的矩形的宽度，以像素计,要清除的矩形的高度，以像素计)
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }.bind(this), false)
      // 保存图片，直接转base64
      this.saveEl.addEventListener("click", function () {
        var imgBase64 = this.canvas.toDataURL()
        //          var base64 = $canvas[0].toDataURL('image/jpeg', 0.5);
        //          console.log(imgBase64)
        typeof saveElCallBack === 'function' && saveElCallBack(imgBase64)
      }.bind(this), false)
    },
    /**
     * 清除签名
     * */
    clearCanvasClick () {
      this.touchEndNum = 0
      document.getElementById("clearCanvas").click()
    },
    sureSignature () {
      //        document.getElementById("saveCanvas").click()
    }
  },
  computed: {},
  filters: {},
  watch: {},
  destroyed () {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./ts-canvas-sign.scss"></style>

    
    