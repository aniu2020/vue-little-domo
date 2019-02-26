<script>
import mixin from '@/mixin';
import toolsfn from '@/common/tools-fn';
export default {
  name: 'ts-amap',
  template: require("./ts-amap.tpl.html"),
  data () {
    return {
      footerSet: {//网站脚部信息
        footerCur: 'ts-amap',
        isHideFooter: false
      },
      headerSet: {//网站头部信息
        pageTitle: 'ts-amap',
        isHideHeader: false
      },
      callMapInfo: {},
      callMapInfoIp: {},
      callMapInfoBaidu: {},
      callMapInfoBaiduIp: {}
    }
  },
  props: [""],
  mixins: [mixin],
  components: {},
  mounted () {
    this.getMapLocation()
    this.getMapLocationIp()
    this.tsBmap()
    this.tsBmapIp()
  },
  methods: {
    init () {

    },
    /**
    * 获取地图定位浏览器
    * */
    async getMapLocation () {
      try {
        let callMapRes = await toolsfn.callMap()
        console.log('getMapLocation-res', callMapRes);
        this.callMapInfo = callMapRes
      } catch (err) {
        console.log('getMapLocationErr:', err)
      }
    },
    /**
    * 获取地图定位ip
    * */
    async getMapLocationIp () {
      try {
        let callMapRes = await toolsfn.callMapIp()
        // console.log('getMapLocation-res', callMapRes);
        this.callMapInfoIp = callMapRes
      } catch (err) {
        console.log('getMapLocationErr:', err)
      }
    },
    async  tsBmap () {
      if (typeof (window.BMap) !== 'object') {
        var head = document.getElementsByTagName('head')[0]
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://api.map.baidu.com/getscript?ak=g9d2DKhjVIgNC4wTGopiGZnH&services=&t=20150522093217'
        head.appendChild(script)
        script.onload = () => {
          let _this = this
          var geolocation = new BMap.Geolocation()
          geolocation.getCurrentPosition(function (r) {
            console.log(r, '百度地图getCurrentPosition', 1111)
            if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
              const myGeo = new BMap.Geocoder()
              myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
                console.log(data, '百度地图(浏览器)：map-res')
                if (data.addressComponents) {
                  const result = data.addressComponents
                  const location = {
                    creditLongitude: r.point.lat, // 经度
                    creditLatitude: r.point.lng, // 纬度
                    creditProvince: result.province || '', // 省
                    creditCity: result.city || '', // 市
                    creditArea: result.district || '', // 区
                    creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                  }
                  _this.callMapInfoBaidu = location
                }
              })
            }
          })
        }
      }
      // try {
      //   let res = await this.$_tools.callMapBMap()
      //   console.log('callMapBMap-res', res)
      // } catch (err) {
      //   console.log('tsBmap-Err', err)
      // }
    },
    async  tsBmapIp () {
      if (typeof (window.BMap) !== 'object') {
        var head = document.getElementsByTagName('head')[0]
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://api.map.baidu.com/getscript?ak=g9d2DKhjVIgNC4wTGopiGZnH&services=&t=20150522093217'
        head.appendChild(script)
        script.onload = () => {
          //   let map = new window.BMap.Map('allmap')
          //   let point = new window.BMap.Point(116.40387397, 39.91488908)
          //   map.centerAndZoom(point, 10)
          //   map.enableScrollWheelZoom(true)
          //   map.enableDoubleClickZoom(true)
          //   var geolocation = new window.BMap.Geolocation()
          //   console.log(111)
          //   geolocation.getCurrentPosition((r) => {
          //     console.log(r, 111)
          //     if (r.point) {
          //       this.center.lng = r.longitude
          //       this.center.lat = r.latitude
          //       let markers = new window.BMap.Marker(r.point)
          //       map.addOverlay(markers)
          //       map.panTo(r.point)
          //       map.centerAndZoom(r.point, 16)
          //     }
          //   }, { enableHighAccuracy: true })
          // }
          var myCity = new window.BMap.LocalCity()
          myCity.get((result) => {
            console.log(result, '百度地图(ip)：map-res')
            this.callMapInfoBaiduIp = result
          })
          // var map = new window.BMap.Map("allmap")
          // var point = new window.BMap.Point(116.331398, 39.897445)
          // map.centerAndZoom(point, 12)
          //   var geolocation = new window.BMap.Geolocation()
          //   console.log(111)
          //   geolocation.getCurrentPosition(function (r) {
          //     alert(JSON.stringify(r))
          //     console.log(r, 123)
          //     if (this.getStatus() === 'BMAP_STATUS_SUCCESS') {
          //       var mk = new window.BMap.Marker(r.point)
          //       map.addOverlay(mk)
          //       map.panTo(r.point)
          //       alert('您的位置：' + r.point.lng + ',' + r.point.lat)
          //     } else {
          //       alert('failed' + this.getStatus())
          //     }
          //   })
          // }

        }
      }
      // try {
      //   let res = await this.$_tools.callMapBMap()
      //   console.log('callMapBMap-res', res)
      // } catch (err) {
      //   console.log('tsBmap-Err', err)
      // }
    },
    refresh () {
      location.reload()
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
<style scoped lang="scss" src="./ts-amap.scss"></style>
    
    