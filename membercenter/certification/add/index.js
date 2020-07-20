var _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util), _user = require("../../../api/user.js"), _common = require("../../../api/common");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "实名认证"
        },
        imgUrls: [],
        bastList: [],
        name: "",
        icon: "",
        type: 0,
        status: 0,
        isChecked: 1,
        statusBarHeight: app.globalData.statusBarHeight,
        cancelidCardFront: !1,
        cancelidCardBehind: !1,
        realname: "",
        idcard: "",
        idCardFront: app.globalData.static_url + "user/front.png",
        idCardBehind: app.globalData.static_url + "user/behind.png",
        examineKeywords: {}
    },
    onLoad: function(a) {
        this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var t = this;
        (0, _common.getExamineKeywords)().then(function(a) {
            t.setData({
                examineKeywords: a.data
            });
        }).catch(function(a) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadIdCard: function(a) {
        var e = a.currentTarget.dataset.type, n = this;
        _util2.default.uploadImageOne("common/upload/image", function(a) {
            var t = {};
            t[e] = a.data.url, t["cancel" + e] = !0, n.setData(t);
        });
    },
    cancelIdCardPhoto: function(a) {
        var t = a.currentTarget.dataset.type, e = {};
        switch (t) {
          case "idCardFront":
            e[t] = app.globalData.static_url + "user/front.png", e.cancelidCardFront = !1;
            break;

          case "idCardBehind":
            e[t] = app.globalData.static_url + "user/behind.png", e.cancelidCardBehind = !1;
        }
        this.setData(e);
    },
    switchChange: function(a) {
        this.setData({
            isChecked: a.detail.value ? 1 : 0
        });
    },
    submit: function(a) {
        var t = {};
        t.realname = this.data.realname, t.idcard = this.data.idcard, t.idcard_front_photo = this.data.idCardFront, 
        t.idcard_behind_photo = this.data.idCardBehind, t.is_default = this.data.isChecked, 
        t.realname ? t.idcard && t.idcard ? _util2.default.isIdCardNo(t.idcard) ? this.data.cancelidCardFront ? this.data.cancelidCardBehind ? (0, 
        _user.addCertification)(t).then(function(a) {
            wx.requestSubscribeMessage({
                tmplIds: a.data.tmplIds,
                success: function(a) {
                    return app.Tips({
                        title: "认证信息已提交，请耐心等待审核",
                        icon: "success"
                    }, {
                        tab: 5,
                        url: "/common/pages/user/user"
                    });
                },
                fail: function(a) {
                    return app.Tips({
                        title: "认证信息已提交，请耐心等待审核",
                        icon: "success"
                    }, {
                        tab: 5,
                        url: "/common/pages/user/user"
                    });
                }
            });
        }).catch(function(a) {
            return app.Tips({
                title: a
            });
        }) : wx.showToast({
            title: "请上传身份证背面照！",
            icon: "none"
        }) : wx.showToast({
            title: "请上传身份证正面照！",
            icon: "none"
        }) : wx.showToast({
            title: "请输入正确的身份证号！",
            icon: "none"
        }) : wx.showToast({
            title: "请输入身份证号！",
            icon: "none"
        }) : wx.showToast({
            title: "请输入真实姓名！",
            icon: "none"
        });
    },
    bindKeyInput: function(a) {
        var t = {};
        t[a.currentTarget.dataset.column] = a.detail.value, this.setData(t);
    }
});