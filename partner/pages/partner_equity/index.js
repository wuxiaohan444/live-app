var t = require("../../../api/plugin/partner/partner"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../lib/wxParse/wxParse.js")), n = getApp();

Page({
    data: {
        sitepath: n.getDomain(),
        parameter: {
            title: "合伙人权益",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        sharePath: "",
        config: {},
        visible: "",
        equity: "",
        hasequity: !1
    },
    onLoad: function(t) {},
    onLoadFun: function() {
        this.partnerEquity();
    },
    partnerEquity: function() {
        var n = this;
        (0, t.partnerEquity)().then(function(t) {
            n.setData({
                hasequity: t.data.hasLevel
            }), e.default.wxParse("equity", "html", t.data.content, n, 0);
        }).catch(function(t) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    doApprove: function() {
        wx.showLoading({
            title: "支付中..."
        }), approveIntegrityPay().then(function(t) {
            wx.hideLoading();
            var e = t.data.status, a = (t.data.result.orderId, t.data.result.jsConfig), i = "/merch/pages/shop/center/index";
            switch (e) {
              case "ORDER_EXIST":
              case "EXTEND_ORDER":
              case "PAY_ERROR":
                return wx.hideLoading(), n.Tips({
                    title: t.msg
                }, {
                    tab: 5,
                    url: i
                });

              case "WECHAT_PAY":
                wx.requestPayment({
                    timeStamp: a.timestamp,
                    nonceStr: a.nonceStr,
                    package: a.package,
                    signType: a.signType,
                    paySign: a.paySign,
                    success: function(t) {
                        wx.hideLoading(), wx.showToast({
                            title: "认证成功",
                            icon: "success",
                            duration: 2e3
                        }), setTimeout(function() {
                            wx.navigateTo({
                                url: i
                            });
                        }, 2e3);
                    },
                    fail: function(t) {
                        wx.hideLoading(), wx.showToast({
                            title: "取消支付",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    complete: function(t) {
                        wx.hideLoading();
                    }
                });
                break;

              case "PAY_DEFICIENCY":
                return wx.hideLoading(), void wx.showToast({
                    title: "余额不足",
                    icon: "none",
                    duration: 2e3
                });
            }
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    }
});