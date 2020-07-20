var _utils = require("../../../api/utils"), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        page: {},
        test: "notice",
        navH: app.globalData.navHeight
    },
    onLoad: function(t) {
        var a = t.id;
        if (t.scene) {
            var n = _util2.default.getUrlParams(decodeURIComponent(t.scene));
            n.id && (a = n.live_id);
        }
        this.getPageData(a);
    },
    getPageData: function(t) {
        var n = this;
        (0, _utils.getDiyPage)(t).then(function(t) {
            var a = t.data.content;
            n.setData({
                page: t.data,
                content: a
            }), "#000000" == a.navigationBar.frontColor && wx.setNavigationBarColor({
                frontColor: a.navigationBar.frontColor,
                backgroundColor: a.navigationBar.backgroundColor
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = "/utils/pages/diypage/index?id=" + this.data.page.id + "&spid=" + app.globalData.userInfo.id + "&mid=" + app.globalData.userInfo.id;
        if (this.data.content.navigationBar.share_title && this.data.content.navigationBar.share_img) return {
            title: this.data.content.navigationBar.share_title,
            imageUrl: this.data.content.navigationBar.share_img,
            path: t,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    returnBack: function() {
        wx.navigateBack();
    }
});