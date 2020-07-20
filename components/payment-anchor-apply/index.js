var _live = require("../../api/live"), app = getApp();

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
        payMode: [ {
            name: "微信支付",
            icon: "icon-weixinzhifu",
            value: "weixin",
            title: "微信快捷支付"
        } ]
    },
    attached: function() {},
    methods: {
        close: function() {
            this.setData({
                pay_close: !1
            });
        },
        goPay: function(e) {
            var i = this, t = e.currentTarget.dataset.value;
            if (!i.data.orderKey) return app.Tips({
                title: "请选择要购买的商品"
            }, {
                tab: 3,
                url: 1
            });
            var a = this.data.orderData;
            if (a.payType = t, "yue" == a.payType && parseFloat(i.data.userInfo.now_money) < parseFloat(i.data.totalPrice)) return app.Tips({
                title: "余额不足！"
            });
            wx.showLoading({
                title: "支付中..."
            }),
                (0, _live.applyAnchorPay)(this.data.orderKey, a).then(function(t) {
                wx.hideLoading();
                var e = t.data.status, a = (t.data.result.orderId, t.data.result.jsConfig);
                switch (e) {
                  case "ORDER_EXIST":
                  case "EXTEND_ORDER":
                  case "PAY_ERROR":
                    return wx.hideLoading(), app.Tips({
                        title: t.msg
                    }, {
                        tab: 5,
                        url: goPages
                    });

                  case "SUCCESS":
                    return wx.hideLoading(), void i.triggerEvent("doPaySuccess", {
                        res: t
                    });

                  case "WECHAT_PAY":
                    i.setData({
                        toPay: !0
                    }), wx.requestPayment({
                        timeStamp: a.timestamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: a.signType,
                        paySign: a.paySign,
                        success: function(e) {
                            wx.hideLoading(), i.triggerEvent("doPaySuccess", {
                                res: e
                            });
                        },
                        fail: function(e) {
                            return wx.hideLoading(), app.Tips({
                                title: "取消支付"
                            }, {
                                tab: 5,
                                url: goPages + "&status=2"
                            });
                        },
                        complete: function(e) {
                            if (wx.hideLoading(), "requestPayment:cancel" == t.errMsg) return app.Tips({
                                title: "取消支付"
                            }, {
                                tab: 5,
                                url: goPages + "&status=2"
                            });
                        }
                    });
                    break;

                  case "PAY_DEFICIENCY":
                    return wx.hideLoading(), app.Tips({
                        title: t.msg
                    }, {
                        tab: 5,
                        url: goPages + "&status=1"
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