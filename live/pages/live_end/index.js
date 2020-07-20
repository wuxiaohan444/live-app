var _live = require("../../../api/live.js"), _user = require("../../../api/user"), _live2 = require("../../../api/live"), _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Page({
    data: {
        parameter: {},
        live_time: "",
        live_order: 0,
        live_gift: 0,
        live_follow: 0,
        live_shares: 0,
        live_likes: 0,
        examineKeywords: {}
    },
    goHome: function() {
        wx.reLaunch({
            url: "/common/pages/loading/loading"
        });
    },
    onLoadFun: function(e) {
        var a = this;
        this.getExamineKeywords(), (0, _live.liveEndCount)().then(function(e) {
            a.setData({
                live_time: e.data.live_time,
                live_order: e.data.live_order,
                live_gift: e.data.live_gift,
                live_follow: e.data.live_follow,
                live_likes: e.data.live_likes,
                live_shares: e.data.live_shares
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
    },
    onLoad: function(e) {},
    getExamineKeywords: function() {
        var a = this;
        (0, _common.getExamineKeywords)().then(function(e) {
            a.setData({
                examineKeywords: e.data
            }), _wxParse2.default.wxParse("page_content", "html", e.data.page_content, a, 0);
        }).catch(function(e) {});
    },
    onReady: function() {
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            winW: app.globalData.winWidth,
            screenTotalH: app.globalData.screenTotalH,
            bgsrc: app.globalData.static_url + "end-bg-min.jpg"
        });
    },
    onShow: function() {},
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {}
});