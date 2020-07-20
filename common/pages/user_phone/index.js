var _api = require("../../../api/api.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "绑定手机号",
            color: !0,
            class: "0"
        },
        disabled: !1,
        active: !1,
        timetext: "获取验证码",
        userInfo: {},
        phone: ""
    },
    inputgetName: function(t) {
        var a = this, e = t.currentTarget.dataset.name, i = {};
        if (-1 != e.indexOf(".")) {
            var n = e.split(".");
            a.data[n[0]] ? i[n[0]] = a.data[n[0]] : i[n[0]] = {}, i[n[0]][n[1]] = t.detail.value;
        } else i[e] = t.detail.value;
        a.setData(i);
    },
    onLoadFun: function() {},
    editPwd: function() {
        var a = this;
        return this.data.phone ? /^1[3456789]\d{9}$/.test(this.data.phone) ? this.data.captcha ? void (0, 
        _api.bindingPhone)({
            phone: this.data.phone,
            captcha: this.data.captcha
        }).then(function(t) {
            if (void 0 === t.data || !t.data.is_bind) return app.Tips({
                title: "绑定成功！",
                icon: "success"
            }, {
                tab: 5,
                url: "/common/pages/user_info/index"
            });
            wx.showModal({
                title: "是否绑定账号",
                content: t.msg,
                confirmText: "绑定",
                success: function(t) {
                    if (t.confirm) (0, _api.bindingPhone)({
                        phone: a.data.phone,
                        captcha: a.data.captcha,
                        step: 1
                    }).then(function(t) {
                        return app.Tips({
                            title: t.msg,
                            icon: "success"
                        }, {
                            tab: 5,
                            url: "/common/pages/user_info/index"
                        });
                    }).catch(function(t) {
                        return app.Tips({
                            title: t
                        });
                    }); else if (t.cancel) return app.Tips({
                        title: "您已取消绑定！"
                    }, {
                        tab: 5,
                        url: "/common/pages/user_info/index"
                    });
                }
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        }) : app.Tips({
            title: "请填写验证码"
        }) : app.Tips({
            title: "请输入正确的手机号码！"
        }) : app.Tips({
            title: "请填写手机号码！"
        });
    },
    code: function() {
        var i = this;
        return this.data.phone ? /^1[3456789]\d{9}$/.test(i.data.phone) ? void (0, _api.registerVerify)(this.data.phone).then(function(t) {
            i.setData({
                disabled: !0,
                active: !0
            });
            var a = 60, e = setInterval(function() {
                --a < 0 ? (clearInterval(e), i.setData({
                    disabled: !1,
                    active: !1,
                    timetext: "重新获取"
                })) : i.setData({
                    timetext: "剩余 " + a + "s"
                });
            }, 1e3);
            return app.Tips({
                title: "发送成功",
                icon: "success"
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        }) : app.Tips({
            title: "请输入正确的手机号码！"
        }) : app.Tips({
            title: "请填写手机号码！"
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});