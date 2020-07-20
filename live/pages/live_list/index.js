var _live = require("../../../api/live.js"), _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var template = require("../../../common/template/template.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "",
            color: !0,
            loading: !1,
            loadend: !1,
            loadTitle: "加载更多",
            class: "red"
        },
        examineKeywords: {},
        banners: [],
        categories: [],
        loading: !1,
        loadend: !1,
        page: 1,
        limit: 10,
        lives: [],
        currentTab: 0,
        isScorll: !1,
        navH: 0
    },
    onPageScroll: function(e) {
        150 < e.scrollTop ? this.setData({
            isScorll: !0
        }) : this.setData({
            isScorll: !1
        });
    },
    onLoad: function(e) {
        e.spid && (app.globalData.spid = e.spid), e.scene && (app.globalData.code = decodeURIComponent(e.scene)), 
        template.tabbar("tabBar", 1, this), this.getCatetory(), this.getExamineKeywords();
    },
    getCatetory: function() {
        var t = this;
        (0, _live.getCatetory)().then(function(e) {
            t.setData({
                banners: e.data.banners,
                currentTab: e.data.currentTab,
                categories: e.data.lists,
                limit: e.data.limit,
                lives: e.data.lives
            });
        });
    },
    getExamineKeywords: function() {
        var t = this;
        (0, _common.getExamineKeywords)().then(function(e) {
            t.setData({
                examineKeywords: e.data,
                "parameter.title": e.data.keywords_live
            }), _wxParse2.default.wxParse("page_content", "html", e.data.page_content, t, 0);
        }).catch(function(e) {});
    },
    goRoom: function(e) {
        var t = e.currentTarget.dataset.liveid;
        1 == e.currentTarget.dataset.livestatus ? wx.redirectTo({
            url: "/live/pages/live_nostart/index?live_id=" + t
        }) : wx.redirectTo({
            url: "/live/pages/live_room3/index?live_id=" + t
        });
    },
    clickTab: function(e) {
        if (this.data.currentTab === e.target.dataset.current) return !1;
        this.setData({
            currentTab: e.target.dataset.current,
            page: 1,
            loadend: !1,
            lives: []
        }), this.getCatetoryLives();
    },
    getCatetoryLives: function() {
        var i = this;
        i.data.loadend || i.data.loading || (i.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _live.getCatetoryLives)({
            id: i.data.currentTab,
            page: i.data.page
        }).then(function(e) {
            var t = e.data.lives || [], a = t.length < i.data.limit;
            i.data.lives = app.SplitArray(t, i.data.lives), i.setData({
                lives: i.data.lives,
                limit: i.data.limit,
                loadend: a,
                loading: !1,
                loadTitle: a ? "拉到底了哦" : "加载更多",
                page: i.data.page + 1
            });
        }));
    },
    onReady: function() {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    onShow: function() {},
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getCatetoryLives();
    },
    onShareAppMessage: function() {
        return {
            title: this.data.examineKeywords.keywords_live + "购物新体验，万千好货等你选",
            path: "/live/pages/live_list/index?spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    }
});