var _order = require("../../api/order.js"), _order2 = require("../../api/order"), _common = require("../../api/common"), app = getApp();

Component({
    properties: {
        pay_close: {
            type: Boolean,
            value: !1
        },
        orderKey: {
            type: String,
            value: ""
        },
        orderData: {
            type: Object,
            value: ""
        },
        userInfo: {
            type: Object,
            value: ""
        },
        totalPrice: {
            type: String,
            value: "0"
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
            this.setData({
                pay_close: !1
            });
        },
        getConfig: function() {
            var r = this, s = this.data.payModes, n = this.data.payMode;
            (0, _common.getConfig)(13).then(function(e) {
                var t = e.data, a = t.balance;
                for (var i in t.pay_types) {
                    if (2 == t.pay_types[i]) {
                        if (!a || 1 != a.switch) continue;
                        s[t.pay_types[i]].number = r.data.userInfo.total_balance, a && a.balance_text && (s[t.pay_types[i]].name = a.balance_text + "支付", 
                        s[t.pay_types[i]].title = "可用" + a.balance_text);
                    }
                    n.push(s[t.pay_types[i]]);
                }
                r.setData({
                    payMode: n
                });
            });
        },
        goPay: function(e) {
            var s = this, t = e.currentTarget.dataset.value;
            if (!s.data.orderKey) return app.Tips({
                title: "请选择要购买的商品"
            }, {
                tab: 3,
                url: 1
            });
            var a = this.data.orderData;
            if (a.payType = t, "yue" == a.payType && parseFloat(s.data.userInfo.total_balance) < parseFloat(s.data.totalPrice)) return app.Tips({
                title: "余额不足！"
            });
            wx.showLoading({
                title: "支付中..."
            }), (0, _order2.orderCreate)(this.data.orderKey, a).then(function(t) {
                wx.hideLoading();
                var e = t.data.status, a = t.data.result.orderId, i = t.data.result.jsConfig, r = "/order/pages/order_details/index?order_id=" + a + "&msg=" + t.msg;
                switch (e) {
                  case "ORDER_EXIST":
                  case "EXTEND_ORDER":
                  case "PAY_ERROR":
                    return wx.hideLoading(), app.Tips({
                        title: t.msg
                    }, {
                        tab: 5,
                        url: r
                    });

                  case "SUCCESS":
                    return wx.hideLoading(), s.data.BargainId || s.data.combinationId || s.data.pinkId || s.data.seckillId ? app.Tips({
                        title: t.msg,
                        icon: "success"
                    }, {
                        tab: 4,
                        url: r
                    }) : (s.triggerEvent("doOrderPay", {
                        res: t
                    }), t.data.result.is_group && (r = "/membercenter/order_list/index"), app.Tips({
                        title: t.msg,
                        icon: "success"
                    }, {
                        tab: 5,
                        url: r
                    }));

                  case "WECHAT_PAY":
                    s.setData({
                        toPay: !0
                    }), wx.requestPayment({
                        timeStamp: i.timestamp,
                        nonceStr: i.nonceStr,
                        package: i.package,
                        signType: i.signType,
                        paySign: i.paySign,
                        success: function(e) {
                            return wx.hideLoading(), s.data.BargainId || s.data.combinationId || s.data.pinkId || s.data.seckillId ? app.Tips({
                                title: "支付成功",
                                icon: "success"
                            }, {
                                tab: 4,
                                url: r
                            }) : t.data.result.is_group ? (r = "/membercenter/order_list/index", app.Tips({
                                title: "支付成功"
                            }, {
                                tab: 5,
                                url: r
                            })) : app.Tips({
                                title: "支付成功",
                                icon: "success"
                            }, {
                                tab: 5,
                                url: r
                            });
                        },
                        fail: function(e) {
                            return wx.hideLoading(), t.data.result.is_group ? (r = "/membercenter/order_list/index", 
                            app.Tips({
                                title: "取消支付"
                            }, {
                                tab: 5,
                                url: r
                            })) : app.Tips({
                                title: "取消支付"
                            }, {
                                tab: 5,
                                url: r + "&status=2"
                            });
                        },
                        complete: function(e) {
                            return wx.hideLoading(), t.data.result.is_group ? (r = "/membercenter/order_list/index", 
                            app.Tips({
                                title: "支付成功"
                            }, {
                                tab: 5,
                                url: r
                            })) : "requestPayment:cancel" == t.errMsg ? app.Tips({
                                title: "取消支付"
                            }, {
                                tab: 5,
                                url: r + "&status=2"
                            }) : void 0;
                        }
                    });
                    break;

                  case "PAY_DEFICIENCY":
                    return wx.hideLoading(), app.Tips({
                        title: t.msg
                    }, {
                        tab: 5,
                        url: r + "&status=1"
                    });
                }
            }).catch(function(e) {
                return wx.hideLoading(), app.Tips({
                    title: e
                });
            });
        }
    }
});