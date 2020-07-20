var _store = require("../../../../api/plugin/merch/store.js"), _wxParse = require("../../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "诚信商家认证",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        sharePath: "",
        config: {},
        visible: ""
    },
    onLoad: function(e) {},
    onLoadFun: function() {
        this.getConfig();
    },
    getConfig: function() {
        var n = this;
        (0, _store.getConfig)("base", "integrity").then(function(e) {
            var t = e.data;
            n.setData({
                config: t
            }), t.integrity_text && n.setData({
                "parameter.title": t.integrity_text + "认证"
            }), _wxParse2.default.wxParse("approve", "html", e.data.approve, n, 0);
        });
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
        }), (0, _store.approveIntegrityPay)().then(function(e) {
            wx.hideLoading();
            var t = e.data.status, n = (e.data.result.orderId, e.data.result.jsConfig), a = "/merch/pages/shop/center/index";
            switch (t) {
              case "ORDER_EXIST":
              case "EXTEND_ORDER":
              case "PAY_ERROR":
                return wx.hideLoading(), app.Tips({
                    title: e.msg
                }, {
                    tab: 5,
                    url: a
                });

              case "WECHAT_PAY":
                wx.requestPayment({
                    timeStamp: n.timestamp,
                    nonceStr: n.nonceStr,
                    package: n.package,
                    signType: n.signType,
                    paySign: n.paySign,
                    success: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "认证成功",
                            icon: "success",
                            duration: 2e3
                        }), setTimeout(function() {
                            wx.navigateTo({
                                url: a
                            });
                        }, 2e3);
                    },
                    fail: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "取消支付",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    complete: function(e) {
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
        }).catch(function(e) {
            wx.hideLoading(), wx.showToast({
                title: e,
                icon: "none",
                duration: 2e3
            });
        });
    }
});