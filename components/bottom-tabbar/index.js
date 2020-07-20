var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _util = require("../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util), _common = require("../../api/common.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Component({
    properties: {},
    data: {
        deviceType: "",
        isshow: !0,
        activename: "",
        tabbar: {}
    },
    lifetimes: {
        attached: function() {
            this.getTabbar();
        }
    },
    pageLifetimes: {
        show: function() {
            var a = this, t = this.data.tabbar, e = getApp();
            (this.setData({
                deviceType: e.globalData.deviceType
            }), "object" !== (void 0 === t ? "undefined" : _typeof(t)) || 0 === Object.keys(t).length) ? "object" === (void 0 === (t = _util2.default.getCache("bottom_tabbar")) ? "undefined" : _typeof(t)) && 0 !== Object.keys(t).length || (0, 
            _common.getTabbar)().then(function(t) {
                var e = t.data;
                a.setTabbar(e);
            }) : a.setTabbar(t);
        }
    },
    methods: {
        getTabbar: function() {
            var a = this, i = "bottom_tabbar", t = _util2.default.getCache(i);
            return t ? a.setData({
                tabbar: t
            }) : (0, _common.getTabbar)().then(function(t) {
                var e = t.data;
                _util2.default.setCache(i, e, 86400), a.setData({
                    tabbar: e
                });
            }), t;
        },
        onChange: function(t) {
            var e = this.data.tabbar.list[t.detail];
            console.log(e.link);
            wx.redirectTo({
                url: e.link
            });
        },
        setTabbar: function(t) {
            var e = !1, a = "", i = "/" + _util2.default.getCurrentPageUrlWithArgs(), o = t.list, r = _util2.default.parseURL(i).path;
            for (var n in o) {
                _util2.default.parseURL(o[n].link).path == r && (e = !0, a = o[n].id);
            }
            this.setData({
                isshow: e,
                activename: a,
                tabbar: t
            });
        }
    }
});