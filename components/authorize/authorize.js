var _util = require("../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util), _common = require("../../api/common.js"), _user = require("../../api/user.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Component({
    properties: {
        iShidden: {
            type: Boolean,
            value: !0
        },
        isAuto: {
            type: Boolean,
            value: !0
        },
        isGoIndex: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        cloneIner: null,
        loading: !1,
        errorSum: 0,
        showAuthMobile: !1,
        errorNum: 3
    },
    attached: function() {
        this.get_logo_url(), this.setAuthStatus();
    },
    methods: {
        close: function() {
            var t = getCurrentPages(), e = t[t.length - 1];
            this.data.isGoIndex ? wx.reLaunch({
                url: "/common/pages/loading/loading"
            }) : (this.setData({
                iShidden: !0
            }), e && null != e.data.iShidden && e.setData({
                iShidden: !0
            }));
        },
        closeAuthMobile: function() {
            this.setData({
                showAuthMobile: !1
            });
        },
        get_logo_url: function() {
            var e = this;
            if (wx.getStorageSync("logo_url")) return this.setData({
                logo_url: wx.getStorageSync("logo_url")
            });
            (0, _common.getLogo)().then(function(t) {
                wx.setStorageSync("logo_url", t.data.logo_url), e.setData({
                    logo_url: t.data.logo_url
                });
            });
        },
        setAuthStatus: function() {
            var o = this;
            _util2.default.chekWxLogin().then(function(t) {
                var e = getCurrentPages(), a = e[e.length - 1];
                if (a && null != a.data.iShidden && a.setData({
                    iShidden: !0
                }), t.isLogin) {
                    if (!_util2.default.checkLogin()) return Promise.reject({
                        authSetting: !0,
                        msg: "用户token失效",
                        userInfo: t.userInfo
                    });
                    o.triggerEvent("onLoadFun", app.globalData.userInfo);
                } else wx.showLoading({
                    title: "加载中..."
                }), o.setUserInfo(t.userInfo, !0);
            }).catch(function(t) {
                if (!1 === t.authSetting) {
                    if (!1 === o.data.isAuto) return;
                    o.setData({
                        iShidden: !1
                    });
                } else t.authSetting && o.setUserInfo(t.userInfo);
            });
        },
        setUserInfo: function(t, e) {
            var a = this;
            wx.showLoading({
                title: "正在加载中..."
            }), e ? a.getWxUserInfo(t) : _util2.default.getCodeLogin(function(e) {
                _util2.default.wxgetUserInfo().then(function(t) {
                    t.code = e.code, a.getWxUserInfo(t);
                }).catch(function(t) {
                    wx.hideLoading();
                });
            });
        },
        setUserMobile: function(t) {
            var e = this;
            wx.showLoading({
                title: "正在加载中..."
            });
            var a = t.detail;
            _util2.default.getCodeLogin(function(t) {
                a.code = t.code, (0, _user.authMobile)(a).then(function(t) {
                    wx.hideLoading(), e.setData({
                        showAuthMobile: !1
                    });
                }).catch(function(t) {
                    wx.hideLoading(), e.data.errorSum++, e.setData({
                        errorSum: e.data.errorSum
                    }), e.data.errorSum >= e.data.errorNum && _util2.default.Tips({
                        title: t
                    });
                });
            });
        },
        getUserLocation: function() {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    var e = t.latitude, a = t.longitude;
                    (0, _user.getUserLocation)({
                        lat: e,
                        lng: a
                    }).then(function(t) {}).catch(function(t) {
                        _util2.default.Tips({
                            title: t
                        });
                    });
                }
            });
        },
        getWxUserInfo: function(e) {
            var a = this;
            e.spid = app.globalData.spid, e.spread_code = app.globalData.code, (0, _user.login)(e).then(function(t) {
                app.globalData.token = t.data.token, app.globalData.isLog = !0, app.globalData.userInfo = t.data.userInfo, 
                app.globalData.expiresTime = t.data.expires_time, t.data.cache_key && wx.setStorage({
                    key: "cache_key",
                    data: t.data.cache_key
                }), wx.hideLoading(), a.setData({
                    iShidden: !0,
                    errorSum: 0
                }), a.triggerEvent("onLoadFun", app.globalData.userInfo), t.data.auth_mobile && a.setData({
                    showAuthMobile: !0
                }), t.data.get_location && a.getUserLocation(), t.data.must_bind_relation && (console.log(11111, getCurrentPages().slice(0).pop().route), 
                wx.reLaunch({
                    url: "/membercenter/user-newrecommend/index"
                }));
            }).catch(function(t) {
                wx.hideLoading(), a.data.errorSum++, a.setData({
                    errorSum: a.data.errorSum
                }), a.data.errorSum >= a.data.errorNum ? _util2.default.Tips({
                    title: t
                }) : a.setUserInfo(e);
            });
        }
    }
});