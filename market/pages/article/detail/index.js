var _market = require("../../../../api/market"), _wxParse = require("../../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "精选文章",
            color: !1
        },
        imgSrc: app.globalData.static_url,
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        page: 1,
        limit: 3,
        list: []
    },
    onLoad: function(t) {
        this.getArticleDetail(t.id);
    },
    getArticleDetail: function(t) {
        var a = this;
        (0, _market.getArticleDetail)(t).then(function(t) {
            a.setData({
                detail: t.data,
                "parameter.title": t.data.title
            }), _wxParse2.default.wxParse("content", "html", t.data.content, a, 0);
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onDetails: function() {
        wx.navigateTo({
            url: "../../component/pages/magazineDetails/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this, a = "/market/pages/article/detail/index?id=" + t.data.detail.id + "&spid=" + app.globalData.userInfo.id + "&mid=" + app.globalData.userInfo.id;
        return {
            title: t.data.detail.title,
            imageUrl: t.data.detail.cover_img,
            path: a,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    wxParseTagATap: function(t) {
        var a = t.currentTarget.dataset.src;
        wx.navigateTo({
            url: a
        });
    }
});