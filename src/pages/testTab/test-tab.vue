<script>
  import mixin from '@/mixin';
  export default {
    name: 'test-tab',
    template: require("./test-tab.tpl.html"),
    data() {
      return {

        titles: 'test-tab',//网页标题
        footerSet: {//脚部设置
          isHideFooter: true,//是否隐藏脚部
//          footerCur: 'test-fn-list'//当前页面
        },

        status: '',
        getGoodsPromotionClassList: [],
        goodspastoreid: this.$route.query.goodspastoreid || '',//店铺id
        goodsClass: [],
        goodsClassMap: {
//          "": {list: [], currentPage: 1, loadAll: false,name:"全部",classId:""}
        },
        nothing: require("../../assets/images/nothing.png"),
        loaded: false,//无数据提示
        loading: true,//加载条是否显示
        imgloading: require('../../assets/images/loading-bars.svg'),
      }
    },
    mixins: [mixin],
    props: [""],
    components: {},
    mounted() {
      //获取商品分类
      this.getCateList(this.getGoodsList);
      //存店铺id 供返回首页的时候取
      var goodspastoreid = this.$route.query.goodspastoreid;
      if (goodspastoreid) {
//        sessionStorage.setItem('goodspastoreid',goodspastoreid)
        localStorage.setItem('goodspastoreid', goodspastoreid)
      }
      console.log(this.goodsClassMap, 'this.goodsClassMap')
//      setTimeout(()=>{
//        this.$store.commit("setHeader", {
//          title: this.titie ? this.titie : "星美生活14",
//        });
//      },1000)

    },
    methods: {
      async init(){
        this.goodsClassMap[this.status] && (this.goodsClassMap[this.status].currentPage = 1);
        this.goodsClassMap[this.status] && (this.goodsClassMap[this.status].list = []);
        this.goodsClassMap[this.status] && (this.goodsClassMap[this.status].pageCount = 1);
        this.goodsClassMap[this.status] && this.getGoodsList(this.status);
      },
      /**
       * 获取商品分类
       * */
      async getCateList(callBack){
        try {

//          let res = await this.$_api.getGoodsPromotionClassList({
//            storeId: this.$route.query.goodspastoreid || ''
//          });

          let res = {};
          res.body = {
            "code": 1,
            "msg": "成功",
            "interfaceIdentity": null,
            "entity": [{"classId": "344", "className": "国内游"}, {
              "classId": "348",
              "className": "生活电器"
            }, {"classId": "349", "className": "智能健康"}]
          }
          this.goodsClass = res.body.entity || [];
//          this.titie = res.body.entity.storeName;
          this.setDocunmentTitle();
          //拼全部进去
          this.goodsClass.unshift({
            list: [], currentPage: 1, loadAll: false, className: "全部", classId: "", pageCount: 1
          });

          this.goodsClass.forEach((item, index) => {
            Vue.set(this.goodsClassMap, item.classId, {
              list: [], currentPage: 1, loadAll: false, className: item.className, classId: item.classId, pageCount: 1
            })
            //this.goodsClassMap[item.classId]={list: [], currentPage: 1, loadAll: false,name:item.className,classId:item.classId};
//          console.log(item.classId,this.goodsClassMap)
          });
          callBack && typeof callBack == 'function' && callBack()
        } catch (res) {
          console.log(res)
          this.$_showMsg(res.body.msg)
        }
      },
      /**
       * 获取商品列表
       * @returns {Promise.<void>}
       */
      async getGoodsList(statuss){
        //后台已经修改>总页数的时候 数据返回为空数组 这里不需要做限制
//        if (this.goodsClassMap[statuss] && (this.goodsClassMap[statuss].currentPage) > this.goodsClassMap[statuss].pageCount) {
//          console.log(this.goodsClassMap[statuss].currentPage, this.goodsClassMap[statuss].pageCount, 7878)
//          this.goodsClassMap[status] && (this.goodsClassMap[status].loadAll = true)
//          this.goodsClassMap[statuss].currentPage = this.goodsClassMap[statuss].pageCount
//          return;
//        }
        var status = statuss || ''
        this.loaded = false;
        let currentPage = this.goodsClassMap[status].currentPage;
        let pageSize = 10;
        try {
          this.loading = true;
//          let res = await this.$_api.getGoodsPromotionList(
//            {
//              classId: status,//分类Id,不传时默认查一级分类
//              storeId: this.$route.query.goodspastoreid || '',//店铺id
//              currentPage: currentPage,//当前页数, 默认为第一页
//              pageSize: pageSize,//每页数据条数，默认为10条
//            }
//          );
          let res = {};
          res.body = {
            "code": 1,
            "msg": "成功",
            "interfaceIdentity": null,
            "entity": {
              "goodsPromotion": [{
                "goodId": "10715",
                "goodName": "5555测试环境测试--3C店铺--rsh-8.15-000555",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/89ffbc65-7fdb-4c08-b879-f6f3454ca5b1.jpg",
                "goodPrice": "35.55",
                "goodsCurrentPrice": "30.51",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10715?promotionsource=wxgoodslist"
              }, {
                "goodId": "10714",
                "goodName": "4444测试环境测试--3C店铺--rsh-8.15-00000000004",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/08f4c926-29ea-468a-afac-6afa880a8ab0.jpg",
                "goodPrice": "41.99",
                "goodsCurrentPrice": "38.68",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10714?promotionsource=wxgoodslist"
              }, {
                "goodId": "10713",
                "goodName": "333测试环境测试--3C店铺--rsh-8.15-00000000003",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/c6405a44-136b-444c-8cfe-390f0a45baf0.jpg",
                "goodPrice": "32.59",
                "goodsCurrentPrice": "25.99",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10713?promotionsource=wxgoodslist"
              }, {
                "goodId": "10712",
                "goodName": "测试环境测试--3C店铺--rsh-8.15-00000000002",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/637f580d-a510-49f8-94e8-ea85d4cec8ec.png",
                "goodPrice": "59.99",
                "goodsCurrentPrice": "49.59",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10712?promotionsource=wxgoodslist"
              }, {
                "goodId": "10711",
                "goodName": "测试环境测试--3C店铺--rsh-8.15",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/bec347a7-8981-4a22-b7b1-4748da6b9e85.png",
                "goodPrice": "10.59",
                "goodsCurrentPrice": "9.99",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10711?promotionsource=wxgoodslist"
              }, {
                "goodId": "10710",
                "goodName": "test3C商城1",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/fc13bb9a-716e-4ec4-b2bf-59c989f8bf11.jpg",
                "goodPrice": "1000.00",
                "goodsCurrentPrice": "1100.00",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10710?promotionsource=wxgoodslist"
              }, {
                "goodId": "10709",
                "goodName": "test3C商城",
                "goodPicUrl": "http://192.168.68.21/upload/55036/store/392/c3c66186-0372-4599-a5df-11f1309d14c9.jpg",
                "goodPrice": "1000.00",
                "goodsCurrentPrice": "1200.00",
                "goodsDetailUrl": "http://testws.xingmeihui.com/smilife/#/GoodsDetails/10709?promotionsource=wxgoodslist"
              }], "currentPage": "1", "pageSize": "10", "totalCount": "7", "pageCount": "1"
            }
          }
          this.loading = false;
          res.body.entity.goodsPromotion = res.body.entity.goodsPromotion || [];
          this.goodsClassMap[status].list = [...this.goodsClassMap[status].list, ...res.body.entity.goodsPromotion];
//          this.goodsClassMap[status].pageCount = res.body.entity.pageCount;
          this.loaded = true;
//          if (currentPage > 1) {
//            setTimeout("scrollTo(0,scrollY+300);", 10)
//          }
          if (res.body.entity.goodsPromotion.length <= 0) {
            this.goodsClassMap[status].loadAll = true
          }
        } catch (res) {
          console.log(res)
          this.loading = true;
          this.loaded = true;
          this.$_showMsg(res.body.msg)
        }

      },
      loadmore() {
          console.log(55)
        this.goodsClassMap[this.status].currentPage++;
        this.getGoodsList(this.status);

      }
    },
    computed: {
      disabled(){
        return this.loading || this.goodsClassMap[this.status].loadAll;
      }
    },
    filters: {},
    watch: {
      status(newV, oldV){
        if (this.goodsClassMap[this.status].list.length <= 0) {
          this.getGoodsList(newV);
        }
      }
    },
    destroyed(){

    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./test-tab.scss"></style>
