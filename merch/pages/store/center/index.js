var _store = require("../../../../api/plugin/merch/store.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "商家中心",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        sharePath: "",
        store: {},
        ad: [],
        isGoIndex: !1,
        iShidden: !0,
        integrity_text: "诚信商家",
        visible: ""
    },
    onLoad: function(t) {},
    onLoadFun: function() {
        this.getConfig(), this.getInfo(), this.pageStoreCenter();
    },
    getInfo: function() {
        var e = this;
        (0, _store.getInfo)().then(function(t) {
            e.setData({
                store: t.data
            });
        }).catch(function(t) {
            return app.Tips({
                title: t,
                icon: "none"
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
    },
    getConfig: function() {
        var n = this;
        (0, _store.getConfig)("base", "integrity").then(function(t) {
            var e = t.data;
            n.setData({
                config: e
            }), e.integrity_text && n.setData({
                integrity_text: e.integrity_text
            });
        });
    },
    pageStoreCenter: function() {
        var n = this;
        (0, _store.getPageStoreCenter)().then(function(t) {
            if (1 == t.data.status) n.setData({
                store: t.data.store,
                menu: t.data.menu,
                ad: t.data.ad,
                stat: t.data.stat
            }); else {
                if (-3 == t.data.status) var e = "/merch/pages/store/edit_info/index"; else e = "/common/pages/user/user";
                _dialog2.default.alert({
                    message: t.data.msg
                }).then(function() {
                    wx.navigateTo({
                        url: e
                    });
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});