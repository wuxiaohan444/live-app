var _live = require("../../../api/live.js"), _common = require("../../../api/common.js"), _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var template = require("../../../common/template/template.js"), app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "",
            navbar: "1",
            return: "0",
            color: !0,
            class: "red"
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        limit: 0,
        page: 1,
        navcat_id: 0,
        banners: [],
        viewers: [],
        live: [],
        swiperCurrent: 0,
        lives: [],
        currentIndex: 0,
        college: [ {
            name: "精选",
            id: -1
        }, {
            name: "附近",
            id: 0
        }, {
            name: "关注",
            id: -2
        } ],
        navH: app.globalData.navHeight,
        examineKeywords: {},
        shopsearch: !1,
        lat: 0,
        lng: 0
    },
    onLoadFun: function(a) {},
    onLoad: function(a) {
        var e = this;
        e.getLocation(), e.getCatetoryNames(), e.getExamineKeywords();
    },
    getLocation: function() {
        var i = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var e = a.latitude, t = a.longitude;
                i.setData({
                    lat: e,
                    lng: t,
                    loadend: !1,
                    loading: !1
                }), i.waterfallNearLiveLists();
            },
            fail: function(a) {}
        });
    },
    getExamineKeywords: function() {
        var e = this;
        (0, _common.getExamineKeywords)().then(function(a) {
            e.setData({
                examineKeywords: a.data
            }), _wxParse2.default.wxParse("page_content", "html", a.data.page_content, e, 0);
        }).catch(function(a) {});
    },
    onShow: function() {
        this.getIndexConfig(), app.globalData.isLog && app.globalData.token;
    },
    searchRoom: function(a) {
        var e = a.detail.value;
        this.setData({
            lives: [],
            page: 1,
            loadend: !1,
            loading: !1,
            searchKeywords: e,
            shopsearch: !0
        }), this.waterfallNearLiveLists();
    },
    getIndexConfig: function() {
        var e = this;
        (0, _live.getBannerData)().then(function(a) {
            e.setData({
                banners: a.data.banners
            }), a.data.site_name && e.setData({
                "parameter.title": a.data.site_name
            });
        }).catch(function(a) {});
    },
    getCatetoryNames: function() {
        var e = this;
        (0, _live.getCatetoryNames)().then(function(a) {
            console.log(a.data), a.data && e.setData({
                college: e.data.college.concat(a.data.lists)
            });
        }).catch(function(a) {});
    },
    waterfallNearLiveLists: function() {
        var i = this;
        i.data.loadend || i.data.loading || (i.setData({
            loading: !0,
            loadTitle: ""
        }), console.log("lat:" + i.data.lat), (0, _live.waterfallNearLiveLists)({
            page: i.data.page,
            keywords: i.data.searchKeywords,
            navcat_id: i.data.navcat_id,
            lat: i.data.lat,
            lng: i.data.lng
        }).then(function(a) {
            var e = a.data.lists || [], t = e.length < a.data.limit;
            i.data.lives = app.SplitArray(e, i.data.lives), i.setData({
                lives: i.data.lives,
                loadend: t,
                limit: a.data.limit,
                banners: a.data.banners,
                loading: !1,
                loadTitle: t ? "拉到底了哦" : "加载更多",
                page: i.data.page + 1
            });
        }).catch(function(a) {
            i.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    tabtapopt: function(a) {
        var e = this.data.college, t = a.detail.catid;
        if (0 == t) ; else {
            e.forEach(function(a, e) {
                t == a.id && a.name;
            });
        }
        this.setData({
            navcat_id: t,
            catid: a.detail.catid,
            page: 1,
            lives: [],
            loadend: !1,
            loading: !1,
            searchKeywords: ""
        }), this.waterfallNearLiveLists();
    },
    onReachBottom: function() {
        this.waterfallNearLiveLists();
    },
    onLive: function(a) {
        var e = a.currentTarget.dataset.liveid;
        1 == a.currentTarget.dataset.status ? wx.redirectTo({
            url: "/live/pages/live_nostart/index?live_id=" + e
        }) : wx.navigateTo({
            url: "/live/pages/live_room3/index?live_id=" + e
        });
    },
    onPageScroll: function(a) {
        150 <= a.scrollTop ? this.setData({
            shopsearch: !0,
            navbgcolor: "#fff"
        }) : this.setData({
            shopsearch: !1,
            navbgcolor: "transparent"
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.examineKeywords.keywords_live + "购物新体验，万千好货等你选",
            path: "/live/pages/live_list2/index?spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    }
});