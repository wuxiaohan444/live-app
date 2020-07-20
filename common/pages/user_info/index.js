var _user = require("../../../api/user.js"), _api = require("../../../api/api.js"), _autuLogin = require("../../../lib/utils/autuLogin.js"), _autuLogin2 = _interopRequireDefault(_autuLogin), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

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
            title: "个人资料",
            color: !0,
            class: "0"
        },
        userInfo: {},
        loginType: "h5",
        userIndex: 0,
        switchUserInfo: []
    },
    Setting: function() {
        wx.openSetting({
            success: function(t) {
                console.log(t.authSetting);
            }
        });
    },
    switchAccounts: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.switchUserInfo[e], i = this;
        return i.setData({
            userIndex: e
        }), i.data.switchUserInfo.length <= 1 || (void 0 === a ? app.Tips({
            title: "切换的账号不存在"
        }) : void ("h5" === a.user_type ? (wx.showLoading({
            title: "正在切换中"
        }), (0, _api.switchH5Login)().then(function(t) {
            wx.hideLoading(), app.globalData.token = t.data.token, app.globalData.expires_time = t.data.time, 
            app.globalData.loginType = "h5", app.globalData.userInfo = t.data.userInfo, i.getUserInfo();
        }).catch(function(t) {
            return wx.hideLoading(), app.Tips({
                title: t
            });
        })) : (wx.showLoading({
            title: "正在切换中"
        }), (0, _autuLogin2.default)("routine").then(function(t) {
            i.getUserInfo(), wx.hideLoading();
        }).catch(function(t) {
            return wx.hideLoading(), app.Tips({
                title: t
            });
        }))));
    },
    onLoadFun: function() {
        this.getUserInfo();
    },
    outLogin: function() {
        if ("h5" == this.data.loginType) return app.globalData.token = "", app.globalData.isLog = !1, 
        app.globalData.userInfo = {}, app.globalData.expiresTime = 0, wx.showLoading({
            title: "正在退出登录"
        }), wx.reLaunch({
            url: "/common/pages/index/index",
            success: function() {
                wx.hideLoading();
            }
        });
    },
    onLoad: function(t) {},
    getPhoneNumber: function(t) {
        var e = t.detail, a = wx.getStorageSync("cache_key");
        if ("getPhoneNumber:ok" == e.errMsg) {
            if (!a) return app.globalData.token = "", app.globalData.isLog = !1;
        } else app.Tips({
            title: "取消授权"
        });
    },
    getUserInfo: function() {
        var a = this;
        (0, _user.getUserInfo)().then(function(t) {
            a.setData({
                userInfo: t.data,
                switchUserInfo: t.data.switchUserInfo || []
            });
            for (var e = 0; e < a.data.switchUserInfo.length; e++) a.data.switchUserInfo[e].uid === a.data.userInfo.uid && a.setData({
                userIndex: e
            });
        });
    },
    uploadpic: function() {
        var a = this;
        _util2.default.uploadImageOne("upload/image", function(t) {
            var e = a.data.switchUserInfo[a.data.userIndex];
            void 0 !== e && (e.avatar = t.data.url), a.data.switchUserInfo[a.data.userIndex] = e, 
            a.setData({
                switchUserInfo: a.data.switchUserInfo
            });
        });
    },
    formSubmit: function(t) {
        var e = t.detail.value, a = t.detail.formId;
        this.data.switchUserInfo[this.data.userIndex];
        if (!e.realname) return app.Tips({
            title: "用户姓名不能为空"
        });
        (0, _api.setFormId)(a), (0, _user.userEdit)(e).then(function(t) {
            return app.Tips({
                title: t.msg,
                icon: "success"
            }, {
                tab: 3,
                url: 1
            });
        }).catch(function(t) {
            return app.Tips({
                title: t || "保存失败，您并没有修改"
            }, {
                tab: 3,
                url: 1
            });
        });
    }
});