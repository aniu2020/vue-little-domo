// 工具类方法
let toolsFn = {}
/**
 * cookie操作
 * @param {String} name     必填，字段名，当参数仅有一个name时，为读取cookie
 * @param {String} value    选填，字段值，当value值为null时为删除cookie
 * @param {Object} options  选填，cookie详细设置：
 *  {Number|Date}   expires     有效期(number类型:天，Date类型：有效期结束时刻毫秒单位)，缺省：不设置
 *  {String}        domain      有效域，缺省：当前域
 *  {String}        path        有效目录，缺省：当前目录
 *  {Boolean}       secure      secure值为true时，在http模式中不会向服务回发Cookie的验证信息；在https模式中会认为是安全的，会回发数据。
 */
toolsFn.cookie = (name, value, options) => {
  // console.log(value !== undefined)
  if (value !== undefined) {
    options = options || {}
    if (value === null) {
      value = ''
      options.path = '/'
      options.domain = options.domain || ''
      options.expires = options.expires || -1000
    }
    let expires = ''
    if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
      let date
      if (typeof options.expires === 'number') {
        date = new Date()
        date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000))
      } else {
        date = options.expires
      }
      expires = '; expires=' + date.toUTCString()
    }
    let path = options.path ? '; path=' + (options.path) : ''
    let domain = options.domain ? '; domain=' + (options.domain) : ''
    let secure = options.secure ? '; secure' : ''
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
    // document.cookie = [name, '=', (value), expires, path, domain, secure].join('');
  } else {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, '')
        if (cookie.substring(0, name.length + 1) === (name) + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }
}
/**
 * 获取浏览器参数
 * @param name 参数名
 * @param hash 是否在hash里面取参数
 */
toolsFn.getQueryString = (name, hash) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  let r = ''
  let locationHash = window.location.hash
  if (hash && locationHash && locationHash.indexOf('?') !== -1) {
    r = locationHash.split('?')[1].match(reg)
  } else {
    r = window.location.search.substr(1).match(reg)
  }
  if (r !== null) return (r[2])
  return null
}

toolsFn.callMap = () => {
  return new Promise((resolve, reject) => {
    let mapCall = () => {
      if (typeof (window.AMap) !== 'object') {
        return
      }
      if (window.AMap.Map) {
        // 高德地图官网api：定位 https://lbs.amap.com/api/javascript-api/reference/location/
        // 通过浏览器获取经纬度及城市信息（百度地图&高德地图JavaScript API） https://www.jianshu.com/p/e751e84bfbe8
        let mapObj = new window.AMap.Map('iCenter')
        mapObj.plugin('AMap.Geolocation', () => {
          let geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 3000, // 超过1秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          // ===方法1 getCurrentPosition获取用户当前的精确位置信息===
          geolocation.getCurrentPosition() // 获取用户当前的精确位置信息
          window.AMap.event.addListener(geolocation, 'complete', function (res) {
            // console.log(res, 'map-complete');
            // test
            /*     let resTest = {
                  "type": "complete",
                  "info": "SUCCESS",
                  "status": 1,
                  "lda": "jsonp_554854_",
                  "position": {"Q": 22.52627, "O": 114.03606000000002, "lng": 114.03606, "lat": 22.52627},
                  "message": "Get ipLocation success.Get address success.",
                  "location_type": "ip",
                  "accuracy": null,
                  "isConverted": true,
                  "addressComponent": {
                    "citycode": "0755",
                    "adcode": "440304",
                    "businessAreas": [{
                      "name": "沙头",
                      "id": "440304",
                      "location": {"Q": 22.524474899999998, "O": 114.0369567714286, "lng": 114.036957, "lat": 22.524475}
                    }, {
                      "name": "车公庙",
                      "id": "440304",
                      "location": {"Q": 22.53406877874184, "O": 114.02819883080275, "lng": 114.028199, "lat": 22.534069}
                    }, {
                      "name": "上沙",
                      "id": "440304",
                      "location": {"Q": 22.524220386961073, "O": 114.03096289274424, "lng": 114.030963, "lat": 22.52422}
                    }],
                    "neighborhoodType": "体育休闲服务;运动场馆;综合体育馆",
                    "neighborhood": "福田区人民体育场",
                    "building": "",
                    "buildingType": "",
                    "street": "福强路",
                    "streetNumber": "30号",
                    "province": "广东省",
                    "city": "深圳市",
                    "district": "福田区",
                    "township": "沙头街道"
                  },
                  "formattedAddress": "广东省深圳市福田区沙头街道福田区人民体育场福田体育公园",
                  "roads": [],
                  "crosses": [],
                  "pois": []
                }  */
            console.log(res, '高德地图(浏览器)：map-suc')
            resolve(res)
          })
          window.AMap.event.addListener(geolocation, 'error', function (res) {
            // console.log(JSON.stringify(res), 'map-error')
            // test
            // let resTest2 = {"type": "error", "message": "Geolocation permission denied.", "info": "FAILED", "status": 0}
            console.log(res, '高德地图(浏览器)：map-error')
            reject(res)
          })
          // === 方法二：getCityInfo进行IP城市查询===
          // geolocation.getCityInfo(function (status, result) { // 进行IP城市查询
          //   console.log(status, result, 'map-getCityInfo-res')
          //   if (status === 'complete') { // status为complete的时候表示查询成功，result包含省、市、adcode、citycode、城市中心点center等信息；status为error的时候表示查询失败
          //     resolve(result)
          //   } else {
          //     reject(result)
          //   }
          // })
        })
      }
    }
    if (typeof (window.AMap) !== 'object') {
      let head = document.getElementsByTagName('head')[0]
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://webapi.amap.com/maps?v=1.4.1&key=8b129b05e2b28d481ddea20304e08262&plugin=AMap.Geolocation,AMap.Geocoder'
      head.appendChild(script)
      script.onload = () => {
        mapCall()
      }
    } else {
      mapCall()
    }
  })
}

toolsFn.callMapIp = () => {
  return new Promise((resolve, reject) => {
    let mapCall = () => {
      if (typeof (window.AMap) !== 'object') {
        return
      }
      if (window.AMap.Map) {
        // 高德地图官网api：定位 https://lbs.amap.com/api/javascript-api/reference/location/
        // 通过浏览器获取经纬度及城市信息（百度地图&高德地图JavaScript API） https://www.jianshu.com/p/e751e84bfbe8
        let mapObj = new window.AMap.Map('iCenter')
        mapObj.plugin('AMap.Geolocation', () => {
          let geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 3000, // 超过1秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          // ===方法1 getCurrentPosition获取用户当前的精确位置信息===
          // === 方法二：getCityInfo进行IP城市查询===
          geolocation.getCityInfo(function (status, result) { // 进行IP城市查询
            if (status === 'complete') { // status为complete的时候表示查询成功，result包含省、市、adcode、citycode、城市中心点center等信息；status为error的时候表示查询失败
              console.log(status, result, '高德地图ip:map-suc')
              resolve(result)
            } else {
              console.log(status, result, '高德地图ip：map-err')
              reject(result)
            }
          })
        })
      }
    }
    if (typeof (window.AMap) !== 'object') {
      let head = document.getElementsByTagName('head')[0]
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://webapi.amap.com/maps?v=1.4.1&key=8b129b05e2b28d481ddea20304e08262&plugin=AMap.Geolocation,AMap.Geocoder'
      head.appendChild(script)
      script.onload = () => {
        mapCall()
      }
    } else {
      mapCall()
    }
  })
}
export default toolsFn
