Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = authLogin;

var _util = require("./util.js"), _util2 = _interopRequireDefault(_util), _user = require("./../../api/user.js"), _common = require("./../../api/common.js");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function authLogin(o) {
    return new Promise(function(t, a) {
        _util2.default.autoLogin().then(function(e) {
            void 0 !== o && (e.login_type = "routine"), (0, _user.login)(e).then(function(e) {
                getApp().globalData.token = e.data.token, getApp().globalData.userInfo = e.data.userInfo, 
                getApp().globalData.isLog = !0, getApp().globalData.expiresTime = e.data.expires_time, 
                e.data.cache_key && wx.setStorage({
                    key: "cache_key",
                    data: e.data.cache_key
                }), t();
            }).catch(function(e) {
                a();
            });
        }).catch(function(e) {
            a();
        });
    });
}