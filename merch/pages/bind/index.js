var _store = require("../../../api/plugin/merch/store.js"), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "绑定店铺"
        },
        imgUrls: [],
        bastList: [],
        name: "",
        icon: "",
        applyIntro: {},
        diyformValue: {},
        intro: "",
        protocolContent: "",
        type: 0,
        status: 0,
        toProtocolView: 0,
        showDiyForm: !1,
        applyProtocolCheck: !1,
        showApplyProtocol: !1,
        statusBarHeight: app.globalData.statusBarHeight
    },
    onLoad: function(t) {},
    onLoadFun: function() {
        var t = _util2.default.getUrlParams(decodeURIComponent(this.options.scene));
        if (!t.id) return app.Tips({
            title: "绑定店铺参数错误"
        }, {
            tab: 5,
            url: "/common/pages/user/user"
        });
        (0, _store.userBindStore)(t.id).then(function(t) {
            return app.Tips({
                title: t.msg
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        }).catch(function(t) {
            return wx.hideLoading(), app.Tips({
                title: t
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {}
});