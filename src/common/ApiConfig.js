var req_config = {
	login: {//例子
		url: "/user/login/{userName}/{pwd}",//请求地址
		method: "POST",//请求方式
		emulateJSON: true,//是否转化为传统方式，即 a=1&b=2&c=3
		contentType: "application/x-www-form-urlencoded",//类型
		loadingTime: 1000,//显示‘菊花’的延迟时间，单位ms，不配置为1000ms
	},
	query: {//例子
		url: "/user/query/{page}/{pageSize}"
	},
	getCollectGoods: {//获取收藏夹商品
		url: "/api/mall/collect/getCollectGoods"
	},
  getAdverts: {//获取广告信息
    url: "/api/mall/advert/getAdverts"
  },
  getTopNews: {//获取最新资讯
    url: "/api/mall/broadcastMsg/getTopNews",
    // method: "GET",//请求方式
  },
  getGoodsPromotionClassList: {//获取商品推广分类列表接口
    url: "/api/mall/good/getGoodsPromotionClassList",
  },
  getGoodsPromotionList: {//获取商品推广列表接口
    url: "/api/mall/good/getGoodsPromotionList",
  },
  getCatePosts: {//获取分类下的文章
    url: "/wp-json/wp/v2/posts",
    method: "GET",//请求方式
  },
};
// 便于本地开发调用反向代理
const urlPrefix = process.env.NODE_ENV === 'development' ? '/blog-api' : ''
for (let i in req_config) {
  req_config[i].url = `${urlPrefix}${req_config[i].url}`
}
export default req_config;
