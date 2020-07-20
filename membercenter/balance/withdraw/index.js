var _user = require("../../../api/user.js"), _common = require("../../../api/common"), app = getApp();

Page({
    data: {
        parameter: {
            title: "余额提现",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        navList: {},
        form: {},
        tmplIds: "",
        currentTab: 0,
        index: 0,
        array: [],
        commission: 0,
        money: 0,
        userInfo: [],
        rule: [],
        config: "",
        showConfirm: !1,
        onClickLoading: !1,
        isClone: !1
    },
    onLoadFun: function() {
        this.getUserInfo(), this.getConfig(), this.getTmplIds(), this.getUserExtractBank();
    },
    getTmplIds: function() {
        var t = this;
        (0, _common.getTplByKeys)({
            key: 1482
        }).then(function(a) {
            t.setData({
                tmplIds: a.data
            });
        });
    },
    getConfig: function() {
        var r = this, o = this;
        (0, _common.getConfig)(13).then(function(a) {
            var t = a.data;
            if (t.balance) {
                o.setData({
                    config: t
                }), t.balance.balance_text && o.setData({
                    balance_text: t.balance.balance_text,
                    "parameter.title": t.balance.balance_text + "提现"
                });
                var e = [];
                0 < t.balance.withdraw_limit && e.push("最低提现" + t.balance.withdraw_limit + "元"), 
                0 < t.balance.withdraw_commission && e.push("提现手续费" + t.balance.withdraw_commission + "%"), 
                0 < t.balance.withdraw_commission_free_max && e.push("免手续费区间" + t.balance.withdraw_commission_free_min + "—" + t.balance.withdraw_commission_free_max + "元");
                var n = r.data.navList, i = "";
                1 == t.balance.withdraw_bank && (n.bank = {
                    name: "银行卡",
                    icon: "icon-yinhangqia"
                }, i = "bank"), 1 == t.balance.withdraw_weixin && (n.weixin = {
                    name: "微信",
                    icon: "icon-weixin2"
                }, i || (i = "weixin")), 1 == t.balance.withdraw_alipay && (n.alipay = {
                    name: "支付宝",
                    icon: "icon-icon34"
                }, i || (i = "alipay")), o.setData({
                    rule: e,
                    navList: n,
                    currentTab: i
                });
            }
        });
    },
    onLoad: function(a) {},
    getUserExtractBank: function() {
        var e = this;
        (0, _user.extractBank)().then(function(a) {
            var t = a.data.bank;
            console.log(a);
            t.unshift("请选择银行"), e.setData({
                array: t,
                minPrice: a.data.minPrice
            });
        });
    },
    doConfirmSubmit: function() {
        var t = this;
        if (this.data.onClickLoading) return app.Tips({
            title: "申请中，请勿重复提交"
        });
        this.setData({
            onClickLoading: !0
        }), (0, _user.extractBalance)(this.data.form).then(function(a) {
            wx.requestSubscribeMessage({
                tmplIds: t.data.tmplIds,
                success: function(a) {
                    return t.setData({
                        onClickLoading: !1
                    }), app.Tips({
                        title: "申请成功",
                        icon: "success"
                    }, {
                        tab: 5,
                        url: "/membercenter/balance/center/index"
                    });
                },
                fail: function(a) {
                    return t.setData({
                        onClickLoading: !1
                    }), app.Tips({
                        title: "申请成功",
                        icon: "success"
                    }, {
                        tab: 5,
                        url: "/membercenter/balance/center/index"
                    });
                }
            });
        }).catch(function(a) {
            return app.Tips({
                title: a
            });
        });
    },
    getUserInfo: function() {
        var t = this;
        (0, _user.getUserInfo)().then(function(a) {
            t.setData({
                userInfo: a.data
            });
        });
    },
    swichNav: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.current
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            index: a.detail.value
        });
    },
    subCash: function(a) {
        a.detail.value;
        var t = this.data.userInfo, e = this.data.form, n = this.data.config, i = this.data.currentTab;
        e.money = parseFloat(e.money);
        var r = parseFloat(n.balance.withdraw_commission), o = parseFloat(n.balance.withdraw_commission_free_min), s = parseFloat(n.balance.withdraw_commission_free_max), c = e.money, l = 0;
        if (0 < r && (l = e.money * (r / 100)), 0 < s && e.money >= o && e.money <= s && (l = 0), 
        0 < l && t.brokerage_price - e.money <= l && (c -= l), "bank" == i) {
            if (!e.name || 0 == e.name.length) return app.Tips({
                title: "请填写持卡人姓名"
            });
            if (!e.cardnum || 0 == e.cardnum.length) return app.Tips({
                title: "请填写银行卡号"
            });
            if (!e.bank || 0 == e.bank) return app.Tips({
                title: "请选择银行"
            });
            e.extract_type = "bank", e.bankname = this.data.array[this.data.index];
        } else if ("weixin" == i) {
            if (!e.name || 0 == e.name.length) return app.Tips({
                title: "请填写微信号"
            });
            e.extract_type = "weixin", e.weixin = e.name;
        } else if ("alipay" == i) {
            if (!e.name || 0 == e.name.length) return app.Tips({
                title: "请填写支付宝账号"
            });
            e.extract_type = "alipay", e.alipay_code = e.name;
        }
        if (!e.money || e.money <= 0) return app.Tips({
            title: "请填写提现金额"
        });
        var m = parseFloat(n.balance.withdraw_limit);
        if (0 < m && e.money < m) return app.Tips({
            title: "提现金额不能低于" + m
        });
        var u = t.brokerage_price;
        if (e.money > u) return app.Tips({
            title: "超过可提现金额"
        });
        this.setData({
            money: c,
            commission: l,
            form: e,
            showConfirm: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        app.globalData.isLog && this.data.isClone && (this.getUserInfo(), this.getUserExtractBank());
    },
    onHide: function() {
        this.setData({
            isClone: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onCloseConfirm: function() {
        this.setData({
            showConfirm: !1
        });
    },
    onReachBottom: function() {},
    bindKeyChange: function(a) {
        var t = a.detail.value, e = a.currentTarget.dataset.column, n = this.data.form;
        "bank" == e && this.setData({
            index: t
        }), n[e] = t, this.setData({
            form: n
        });
    },
    onShareAppMessage: function() {}
});