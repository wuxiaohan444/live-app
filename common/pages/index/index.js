var _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util),
    _user = require("../../../api/user.js"),
    _live = require("../../../api/live.js"), _common = require("../../../api/common.js")
_common = require("../../../api/common.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var P = require("../../../lib/wxpage"), app = getApp(), template = require("../../template/template.js");

Page({
    data: {
        isGoIndex: !1,
        iShidden: !0,
        isAuto: !1,
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
            color: !0,
            class: "red"
        },
        searchInfo: {
            class: "red",
            isList: !0
        },
        searchList: [],
        couponList: [],
        window: !1,
        topShow: !1,
        themeColor: app.globalData.themeColor.text,
        searchKeywords: '',
        lat: 0,
        lng: 0,
        newLivesList: '',
        is_member: '',
        check_status:''
    },
    onLoad: function (t) {
        t.spid && (app.globalData.spid = t.spid), t.scene && (app.globalData.code = decodeURIComponent(t.scene)),
            template.tabbar("tabBar", 0, this);

        var e, v = this;
        v.getLocation(), v.getCatetoryNames(), v.getExamineKeywords()
    },
    onLoadFun: function () {
        this.getUserInfo()
    },
    getUserInfo: function () {
        var t = this;
        (0, _user.getUserInfo)().then(function (e) {
            t.setData({
                is_member: e.data.is_member
            })
        }).catch(function (e) {
            return app.Tips({
                title: e
            });
        });
    },
    getExamineKeywords: function () {
        var e = this;
        (0, _common.getExamineKeywords)().then(function (a) {
            e.setData({
                examineKeywords: a.data
            }), _wxParse2.default.wxParse("page_content", "html", a.data.page_content, e, 0);
        }).catch(function (a) {
        });
    },
    catchTouchMove: function (t) {
        return !1;
    },
    getCatetoryNames: function () {
        var e = this;
        (0, _live.getCatetoryNames)().then(function (a) {
            console.log(a.data), a.data && e.setData({
                college: e.data.college.concat(a.data.lists)
            });
        }).catch(function (a) {
        });
    },
    onColse: function () {
        this.setData({
            window: !1
        });
    },
    getLocation: function () {
        var i = this;
        wx.getLocation({
            type: "wgs84",
            success: function (a) {
                var e = a.latitude, t = a.longitude;
                i.setData({
                    lat: e,
                    lng: t,
                    loadend: !1,
                    loading: !1
                }), i.waterfallNearLiveLists();
            },
            fail: function (a) {
            }
        });
    },
    onReady: function () {
    },
    onShow: function () {
        this.getIndexConfig(), app.globalData.isLog && app.globalData.token;
    },
    get_issue_coupon_list: function () {
        var a = this;
        getCoupons({
            page: 1,
            limit: 3
        }).then(function (t) {
            a.setData({
                couponList: t.data
            }), t.data.length || a.setData({
                window: !1
            });
        });
    },
    getIndexConfig: function () {
        console.log('111');
        var a = this;
        (0, _common.getIndexData)().then(function (t) {
            console.log(t);
            a.setData({
                check_status:t.data.check_status,
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
            }), t.data.site_name && a.setData({
                "parameter.title": t.data.site_name
            }), wx.getSetting({
                success: function (t) {
                    t.authSetting["scope.userInfo"] ? a.setData({
                        window: !1
                    }) : a.setData({
                        window: !!a.data.couponList.length
                    });
                }
            });
            console.log(a.data.banners);
        }).catch(function (t) {
        });
    },
    onHide: function () {
        this.setData({
            window: !1
        });
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        this.getIndexConfig(), app.globalData.isLog && app.globalData.token && this.get_issue_coupon_list(),
            wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
        return {
            title: this.data.shareInfo.share_title ? this.data.shareInfo.share_title : "快来看看这个小程序，甄选商品等你挑。",
            imageUrl: this.data.shareInfo.share_image,
            path: "/common/pages/index/index?spid=" + getApp().globalData.userInfo.id,
            success: function (t) {
            },
            fail: function (t) {
            }
        };
    },
    onPageScroll: function (t) {
        t.scrollTop > app.globalData.winHeight - 100 ? this.setData({
            topShow: !0
        }) : this.setData({
            topShow: !1
        });
    },
    waterfallNearLiveLists: function () {
        var i = this;
        i.data.loadend || i.data.loading || (i.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _live.waterfallLiveLists)({
            channel_type: 1,
            page: 1,
        }).then(function (a) {
            let newLivesList = a.data.lists;
            var e = a.data.lists || [], t = e.length < a.data.limit;
            i.data.newLivesList = app.SplitArray(e, i.data.newLivesList), i.setData({
                newLivesList: newLivesList,
                loadend: t,
                loading: !0,
            });
            if (newLivesList.length === 0) {
                console.log(1);
                i.setData({
                    loading: false,
                });
            }
        }).catch(function (a) {
            i.setData({
                loading: false,
                loadTitle: "加载更多"
            });
        }));

    },

    skip(e) {
        let name = e.currentTarget.dataset.name;
        let id = e.currentTarget.dataset.id;
        if (!this.data.is_member) {
            if (name === '品牌套系' || name === '实木单品' || name === '软体类') {
                return app.Tips({
                    title: '请开通店铺后查看'
                });
            } else {
                if (name === '展会官方') {
                    wx.navigateTo({
                        url: '/live/pages/live_list5/index?id=' + id + '&name=' + name,
                    })
                } else {
                    wx.navigateTo({
                        url: '/live/pages/live_list4/index?id=' + id + '&name=' + name,
                    })
                }
            }
        } else {
            if (name === '主播聘请' || name === '展会官方') {
                wx.navigateTo({
                    url: '/live/pages/live_list5/index?id=' + id + '&name=' + name,
                })
            } else {
                wx.navigateTo({
                    url: '/live/pages/live_list4/index?id=' + id + '&name=' + name,
                })
            }

        }

    }
});