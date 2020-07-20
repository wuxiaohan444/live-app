var _user = require("../../../../api/user.js"), _common = require("../../../../api/common"), _store = require("../../../../api/plugin/merch/store.js"), app = getApp();

Page({
    data: {
        parameter: {
            title: "提现申请",
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
        userInfo: [],
        rule: [],
        config: "",
        onClickLoading: !1,
        showConfirm: !1,
        isClone: !1
    },
    onLoadFun: function() {
        this.getInfo(), this.getConfig(), this.getTmplIds(), this.getUserExtractBank();
    },
    getTmplIds: function() {
        var a = this;
        (0, _common.getTplByKeys)({
            key: 1482
        }).then(function(t) {
            a.setData({
                tmplIds: t.data
            });
        });
    },
    getConfig: function() {
        var r = this, s = this;
        (0, _store.getConfig)("base").then(function(t) {
            var a = t.data;
            s.setData({
                config: a
            });
            var n = [];
            0 < a.withdraw_limit && n.push("最低提现" + a.withdraw_limit + "元");
            var e = r.data.navList, i = "";
            1 == a.withdraw_bank && (e.bank = {
                name: "银行卡",
                icon: "icon-yinhangqia"
            }, i = "bank"), 1 == a.withdraw_weixin && (e.weixin = {
                name: "微信",
                icon: "icon-weixin2"
            }, i || (i = "weixin")), 1 == a.withdraw_alipay && (e.alipay = {
                name: "支付宝",
                icon: "icon-icon34"
            }, i || (i = "alipay")), s.setData({
                rule: n,
                navList: e,
                currentTab: i
            });
        });
    },
    onLoad: function(t) {},
    getUserExtractBank: function() {
        var n = this;
        (0, _user.extractBank)().then(function(t) {
            var a = t.data.bank;
            a.unshift("请选择银行"), n.setData({
                array: a,
                minPrice: t.data.minPrice
            });
        });
    },
    getInfo: function() {
        var a = this;
        (0, _store.getInfo)().then(function(t) {
            a.setData({
                store: t.data
            });
        }).catch(function(t) {
            return app.Tips({
                title: t,
                icon: "none"
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
    },
    swichNav: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.current
        });
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    doConfirmSubmit: function(t) {
        var a = this, n = (t.detail.value, this.data.store), e = this.data.form, i = this.data.config, r = this.data.currentTab;
        if (this.data.onClickLoading) return app.Tips({
            title: "申请中，请勿重复提交"
        });
        if ("bank" == r) {
            if (!e.name || 0 == e.name.length) return app.Tips({
                title: "请填写持卡人姓名"
            });
            if (!e.cardnum || 0 == e.cardnum.length) return app.Tips({
                title: "请填写银行卡号"
            });
            if (!e.bank || 0 == e.bank) return app.Tips({
                title: "请选择银行"
            });
            e.extract_type = "bank", e.bankname = a.data.array[a.data.index];
        } else if ("weixin" == r) {
            if (!e.name || 0 == e.name.length) return app.Tips({
                title: "请填写微信号"
            });
            e.extract_type = "weixin", e.weixin = e.name;
        } else if ("alipay" == r) {
            if (!e.name || 0 == e.name.length) return app.Tips({
                title: "请填写支付宝账号"
            });
            e.extract_type = "alipay", e.alipay_code = e.name;
        }
        if (!e.money || e.money <= 0) return app.Tips({
            title: "请填写提现金额"
        });
        e.money = parseFloat(e.money);
        var s = parseFloat(i.withdraw_limit);
        if (0 < s && e.money < s) return app.Tips({
            title: "提现金额不能低于" + s
        });
        var o = n.balance_money;
        if (e.money > o) return app.Tips({
            title: "超过可提现金额"
        });
        this.setData({
            onClickLoading: !0
        }), (0, _store.extractBalance)(e).then(function(t) {
            wx.requestSubscribeMessage({
                tmplIds: a.data.tmplIds,
                success: function(t) {
                    return a.setData({
                        onClickLoading: !1
                    }), app.Tips({
                        title: "申请成功",
                        icon: "success"
                    }, {
                        tab: 5,
                        url: "/merch/pages/store/center/index"
                    });
                },
                fail: function(t) {
                    return a.setData({
                        onClickLoading: !1
                    }), app.Tips({
                        title: "申请成功",
                        icon: "success"
                    }, {
                        tab: 5,
                        url: "/merch/pages/store/center/index"
                    });
                }
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
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
    bindKeyChange: function(t) {
        var a = t.detail.value, n = t.currentTarget.dataset.column, e = this.data.form;
        "bank" == n && this.setData({
            index: a
        }), e[n] = a, this.setData({
            form: e
        });
    },
    onShareAppMessage: function() {}
});