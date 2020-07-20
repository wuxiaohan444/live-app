var _store = require("../../../../api/plugin/merch/store.js"), _wxParse = require("../../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "诚信商家保障",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        sharePath: "",
        config: {},
        visible: ""
    },
    onLoad: function(e) {},
    onLoadFun: function() {
        this.getConfig();
    },
    getConfig: function() {
        var n = this;
        (0, _store.getConfig)("base", "integrity").then(function(e) {
            var t = e.data;
            n.setData({
                config: t
            }), t.integrity_text && n.setData({
                "parameter.title": t.integrity_text + "保障"
            }), _wxParse2.default.wxParse("service", "html", e.data.service, n, 0);
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