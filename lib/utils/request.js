Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = request;

var _util = require("./util.js"), _util2 = _interopRequireDefault(_util), _md = require("md5"), _md2 = _interopRequireDefault(_md), _autuLogin = require("./autuLogin.js"), _autuLogin2 = _interopRequireDefault(_autuLogin);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var config = require("./../../siteinfo.js");

function request(n, r, o, e) {
    var t = e.noAuth, u = void 0 !== t && t, a = e.noVerify, d = void 0 !== a && a, l = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, s = getApp().getDomain() + "addons/shimmer_liveshop/api/" + config.uniacid + "/2", f = {
        "content-type": "application/json"
    };
    return u || _util2.default.checkLogin() ? (getApp().globalData.token && (f["Authori-zation"] = "Bearer " + getApp().globalData.token),
    l = l || 0, new Promise(function(t, u) {
        var e = s + "/" + n;
        if (o = o || {}, 0 < l) {
            var a = e + JSON.stringify(o);
            a = (0, _md2.default)(a);
            var i = _util2.default.getCache(a);
            if (i) return t(i.data, i);
        }
        wx.request({
            url: e,
            method: r || "GET",
            header: f,
            data: o,
            success: function(e) {
                d ? t(e.data, e) : 200 == e.data.status ? (0 < l && _util2.default.setCache(a, e, l), 
                t(e.data, e)) : 40001 == e.data.status ? wx.reLaunch({
                    url: "/membercenter/user-newrecommend/index"
                }) : ("" + e.data.status).includes(4e4) ? (_util2.default.logout(), _util2.default.checkLogin()) : u(e.data.msg || "系统错误");
            },
            fail: function(e) {
                u("请求失败");
            }
        });
    })) : (0, _autuLogin2.default)().then(function(e) {
        return request(n, r, o, {
            noAuth: u,
            noVerify: d
        }, l);
    });
}

[ "options", "get", "post", "put", "head", "delete", "trace", "connect" ].forEach(function(i) {
    request[i] = function(e, t, u, a) {
        return request(e, i, t, u || {}, a || 0);
    };
});