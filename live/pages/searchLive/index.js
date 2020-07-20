var _live = require("../../../api/live.js"), _common = require("../../../api/common.js"),
    _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var template = require("../../../common/template/template.js"), app = getApp();

Page({
    data: _defineProperty({
        sitepath: app.getDomain(),
        parameter: {
            title: "搜索主播",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        loading: !1,
        loadend: !1,
        loadTitle: "",
        limit: 0,
        page: 1,
        lives: [],
        banners: [],
        isScorll: !1,
        navH: 0,
        deviceType: "iPhone-X",
        style: 1,
        indicatorDots: !1,
        circular: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        examineKeywords: {},
        searchroomNum: "",
        searchKeywords: ""
    }, "navH", ""),
    onPageScroll: function (e) {
        150 < e.scrollTop ? this.setData({
            isScorll: !0
        }) : this.setData({
            isScorll: !1
        });
    },
    onLoad: function (e) {
        this.getLocation()
        // e.spid && (app.globalData.spid = e.spid), e.scene && (app.globalData.code = decodeURIComponent(e.scene)),
        // template.tabbar("tabBar", 1, this), this.waterfallLiveLists(), this.getExamineKeywords(),
        // this.setData({
        //     navH: app.globalData.navHeight
        // });
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
                })
            },
            fail: function (a) {
            }
        });
    },
    searchRoom: function (e) {
        var a = e.detail.value;
        this.setData({
            lives: [],
            page: 1,
            loadend: !1,
            loading: !1,
            searchKeywords: a
        }), this.waterfallLiveLists();
    },
    getExamineKeywords: function () {
        var a = this;
        (0, _common.getExamineKeywords)().then(function (e) {
            a.setData({
                examineKeywords: e.data,
                "parameter.title": e
            }), _wxParse2.default.wxParse("page_content", "html", e.data.page_content, a, 0);
        }).catch(function (e) {
        });
    },
    waterfallLiveLists: function () {
        var i = this;
        i.data.loadend || i.data.loading || (i.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _live.searchLiveLists)({
            keywords: i.data.searchKeywords,
            lat: i.data.lat,
            lng: i.data.lng,
            navcat_id: 0,
        }).then(function (e) {
            var a = e.data.lists || [], t = a.length < e.data.limit;
            console.log(a);
            i.data.lives = app.SplitArray(a, i.data.lives), i.setData({
                lives: a,
                loadend: t,
                limit: e.data.limit,
                banners: e.data.banners,
                loading: !1,
                loadHidden: true
            });
            console.log(i.data.lives);
            if (i.data.lives.length === 0) {
                i.setData({
                    loadTitle: '没有搜索到',
                    loadHidden: false
                })

            }

        }).catch(function (e) {
            // i.setData({
            //     loading: !1,
            //     loadTitle: "加载更多"
            // });
        }));
    },
    onReachBottom: function () {
        this.waterfallLiveLists();
    },
    goRoom: function (e) {
        var a = e.currentTarget.dataset.liveid;
        1 == e.currentTarget.dataset.livestatus ? wx.redirectTo({
            url: "/live/pages/live_nostart/index?live_id=" + a
        }) : wx.redirectTo({
            url: "/live/pages/live_room3/index?live_id=" + a
        });
    },
    clickTab: function (e) {
        if (console.log(11111, e), this.data.currentTab === e.target.dataset.current) return !1;
        this.getCatetoryLives(e.target.dataset.current);
    },
    onReady: function () {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    onShow: function () {
    },
    onHide: function () {
        this.setData({
            isClose: !0
        });
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onShareAppMessage: function () {
        return {
            title: this.data.examineKeywords.keywords_live + "购物新体验，万千好货等你选",
            path: "/live/pages/live_list1/index?spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    }
});