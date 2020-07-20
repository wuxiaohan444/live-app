var _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util), _common = require("../../../api/common.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var P = require("../../../lib/wxpage"), app = getApp(), template = require("../../template/template.js");

Page({
    data: {
        themeColor: app.globalData.themeColor,
        sitepath: app.getDomain(),
        imgUrls: [],
        itemNew: [],
        activityList: [],
        menus: [],
        bastBanner: [],
        lives: [],
        bastInfo: "",
        bastList: [],
        fastInfo: "",
        fastList: [],
        firstInfo: "",
        firstList: [],
        salesInfo: "",
        likeInfo: [],
        lovelyBanner: {},
        shareInfo: {},
        benefit: [],
        indicatorDots: !1,
        circular: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        parameter: {
            title: "首页",
            navbar: "1",
            return: "0",
            bgcolor: app.globalData.themeColor.themeColor,
            textColor: app.globalData.themeColor.text
        },
        searchInfo: {
            bgcolor: app.globalData.themeColor.themeColor,
            textColor: app.globalData.themeColor.text,
            placeholder: "请输入搜索内容",
            isList: !0
        },
        searchList: [],
        couponList: [],
        window: !1,
        topShow: !1,
        swiperCurrent: 0
    },
    onLoad: function(t) {
        var e;
        t.spid && (app.globalData.spid = t.spid), t.scene && (app.globalData.code = decodeURIComponent(t.scene)), 
        template.tabbar("tabBar", 0, this), this.setData((_defineProperty(e = {
            themeColor: app.globalData.themeColor
        }, "parameter.bgcolor", app.globalData.themeColor.themeColor), _defineProperty(e, "parameter.textColor", app.globalData.themeColor.text), 
        _defineProperty(e, "searchInfo.bgcolor", app.globalData.themeColor.themeColor), 
        _defineProperty(e, "searchInfo.textColor", app.globalData.themeColor.text), e));
    },
    setGoodsSearch: function() {
        wx.navigateTo({
            url: "/goods/pages/goods_search/index"
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    catchTouchMove: function(t) {
        return !1;
    },
    onColse: function() {
        this.setData({
            window: !1
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getIndexConfig(), app.globalData.isLog && app.globalData.token;
    },
    get_issue_coupon_list: function() {
        var e = this;
        getCoupons({
            page: 1,
            limit: 3
        }).then(function(t) {
            e.setData({
                couponList: t.data
            }), t.data.length || e.setData({
                window: !1
            });
        });
    },
    getIndexConfig: function() {
        var e = this;
        (0, _common.getIndexData)().then(function(t) {
            e.setData({
                follow_weixin: t.data.follow_weixin,
                top_titles: t.data.top_titles,
                banners: t.data.banners,
                categorys: t.data.categorys,
                news: t.data.news,
                vip_banner: t.data.vip_banner,
                vip_goods: t.data.vip_goods,
                ad_pic: t.data.ad_pic,
                lives: t.data.lives,
                new_goods: t.data.new_goods,
                sale_goods: t.data.sale_goods,
                tags: t.data.tags,
                shareInfo: t.data.shareInfo
            }), t.data.site_name && e.setData({
                "parameter.title": t.data.site_name
            }), wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userInfo"] ? e.setData({
                        window: !1
                    }) : e.setData({
                        window: !!e.data.couponList.length
                    });
                }
            });
        }).catch(function(t) {});
    },
    onHide: function() {
        this.setData({
            window: !1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getIndexConfig(), app.globalData.isLog && app.globalData.token && this.get_issue_coupon_list(), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.shareInfo.share_title ? this.data.shareInfo.share_title : "快来看看这个小程序，甄选商品等你挑。",
            imageUrl: this.data.shareInfo.share_image,
            path: "/common/pages/index/index?spid=" + getApp().globalData.userInfo.id,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    onPageScroll: function(t) {
        t.scrollTop > app.globalData.winHeight - 100 ? this.setData({
            topShow: !0
        }) : this.setData({
            topShow: !1
        });
    }
});