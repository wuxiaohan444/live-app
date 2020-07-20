var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _common = require("../../api/common.js"), _util = require("../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Component({
    properties: {
        parameter: {
            type: Object,
            value: {
                class: "0"
            }
        }
    },
    data: {
        navH: ""
    },
    ready: function() {
        var a = this;
        this.setClass();
        var t = this.data.siteinfo, i = "site_info";
        "object" !== (void 0 === t ? "undefined" : _typeof(t)) ? "object" !== (void 0 === (t = _util2.default.getCache(i)) ? "undefined" : _typeof(t)) && (0, 
        _common.getSiteInfo)().then(function(t) {
            var e = t.data;
            _util2.default.setCache(i, e, 86400), e.site_name && !a.data.parameter.title && a.setData({
                "parameter.title": e.site_name
            });
        }) : t.site_name && !a.data.parameter.title && a.setData({
            "parameter.title": t.site_name
        });
    },
    attached: function() {
        this.getSiteInfo(), this.setData({
            navH: app.globalData.navHeight
        });
    },
    methods: {
        return: function() {
            if (getCurrentPages().length <= 1) {
                wx.navigateTo({
                    url: "/common/pages/loading/loading"
                });
            } else wx.navigateBack();
        },
        setClass: function() {
            var t = "";
            switch (this.data.parameter.class) {
              case "0":
              case "on":
                t = "on";
                break;

              case "1":
              case "black":
                t = "black";
                break;

              case "2":
              case "gray":
                t = "gray";
                break;

              case "3":
              case "red":
                t = "red";
            }
            this.setData({
                "parameter.class": t
            });
        },
        getSiteInfo: function() {
            var a = this, i = "site_info", t = _util2.default.getCache(i);
            return t ? a.setData({
                siteinfo: t
            }) : (0, _common.getSiteInfo)().then(function(t) {
                var e = t.data;
                _util2.default.setCache(i, e, 86400), a.setData({
                    siteinfo: e
                });
            }), t;
        }
    }
});