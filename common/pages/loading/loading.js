var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, _common = require("../../../api/common.js"), _util = require("../../../lib/utils/util.js"),
    _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var P = require("../../../lib/wxpage"), app = getApp();

P("loading", {
    data: {
        logo: "",
        name: "",
        url: ""
    },
    onLoad: function (e) {
        console.log('loading');
        e.referer;
        var t = "/common/pages/index/index";
        wx.showLoading({
            title: "加载中..."
        });
        var o = "bottom_tabbar", a = _util2.default.getCache(o);
        if ((0, _common.getConfig)(1).then(function (e) {
                app.globalData.themeColor.themeColor = e.data.style.color,
                app.globalData.themeColor.text = e.data.style.font_color,
                app.globalData.themeColor.gradientB = e.data.style.shadow_start_color,
                app.globalData.themeColor.gradientE = e.data.style.shadow_end_color;
        }), "object" !== (void 0 === a ? "undefined" : _typeof(a)) || 0 === Object.keys(a).length) (0,
            _common.getTabbar)().then(function (e) {
            console.log('123456');
            if (a = e.data) {
                _util2.default.setCache(o, a, 86400);
                var t = a.list[Object.keys(a.list)[0]].link;
                wx.reLaunch({
                    url: decodeURIComponent(t)
                });
            } else wx.reLaunch({
                url: decodeURIComponent(t)
            });
        }); else {
            console.log('123');
            t = a.list[Object.keys(a.list)[0]].link;
            wx.reLaunch({
                url: decodeURIComponent(t)
            });
        }
    }
});