var _order = require("../../api/order.js"), _common = require("../../api/common"), app = getApp();

Component({
    properties: {
        pay_close: {
            type: Boolean,
            value: !1
        },
        order_id: {
            type: String,
            value: ""
        },
        totalPrice: {
            type: String,
            value: "0"
        },
        userInfo: {
            type: Object,
            value: ""
        }
    },
    data: {
        payModes: {
            1: {
                name: "微信支付",
                icon: "icon-weixinzhifu",
                value: "weixin",
                title: "微信快捷支付"
            },
            2: {
                name: "余额支付",
                icon: "icon-yuezhifu",
                value: "yue",
                title: "可用余额:",
                number: 0
            }
        },
        payMode: []
    },
    attached: function() {
        this.getConfig();
    },
    methods: {
        close: function() {
            this.triggerEvent("onChangeFun", {
                action: "pay_close"
            });
        },
        getConfig: function() {
            var i = this, o = this.data.payModes, r = this.data.payMode;
            (0, _common.getConfig)(13).then(function(e) {
                var t = e.data, a = t.balance;
                for (var n in t.pay_types) {
                    if (2 == t.pay_types[n]) {
                        if (!a || 1 != a.switch) continue;
                        o[t.pay_types[n]].number = i.data.userInfo.total_balance, a && a.balance_text && (o[t.pay_types[n]].name = a.balance_text + "支付", 
                        o[t.pay_types[n]].title = "可用" + a.balance_text);
                    }
                    r.push(o[t.pay_types[n]]);
                }
                i.setData({
                    payMode: r
                });
            });
        },
        goPay: function(e) {
            var a = this, n = e.currentTarget.dataset.value, t = e.currentTarget.dataset.number;
            return a.data.order_id ? "yue" == n && parseFloat(t) < parseFloat(a.data.totalPrice) ? app.Tips({
                title: "余额不足！"
            }) : (wx.showLoading({
                title: "支付中"
            }), void (0, _order.orderPay)({
                uni: a.data.order_id,
                paytype: n,
                from: "routine"
            }).then(function(e) {
                switch (n) {
                  case "weixin":
                    if (void 0 === e.data.result) return app.Tips({
                        title: "缺少支付参数"
                    });
                    var t = e.data.result.jsConfig;
                    wx.requestPayment({
                        timeStamp: t.timestamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: t.signType,
                        paySign: t.paySign,
                        success: function(e) {
                            return wx.hideLoading(), app.Tips({
                                title: e.msg,
                                icon: "success"
                            }, function() {
                                a.triggerEvent("onChangeFun", {
                                    action: "pay_complete"
                                });
                            });
                        },
                        fail: function(e) {
                            return wx.hideLoading(), app.Tips({
                                title: "取消支付"
                            }, function() {
                                a.triggerEvent("onChangeFun", {
                                    action: "pay_fail"
                                });
                            });
                        },
                        complete: function(e) {
                            if (wx.hideLoading(), "requestPayment:cancel" == e.errMsg) return app.Tips({
                                title: "取消支付"
                            }, function() {
                                a.triggerEvent("onChangeFun", {
                                    action: "pay_fail"
                                });
                            });
                        }
                    });
                    break;

                  case "yue":
                  case "offline":
                    return wx.hideLoading(), app.Tips({
                        title: e.msg,
                        icon: "success"
                    }, function() {
                        a.triggerEvent("onChangeFun", {
                            action: "pay_complete"
                        });
                    });
                }
            }).catch(function(e) {
                return wx.hideLoading(), app.Tips({
                    title: e
                }, function() {
                    a.triggerEvent("onChangeFun", {
                        action: "pay_fail"
                    });
                });
            })) : app.Tips({
                title: "请选择要支付的订单"
            });
        }
    }
});