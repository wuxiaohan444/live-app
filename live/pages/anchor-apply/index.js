var _store = require("../../../api/plugin/merch/store.js"), _live = require("../../../api/live.js"),
    _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "申请主播",
            color: !0,
            class: "red"
        },
        imgUrls: [],
        bastList: [],
        name: "",
        icon: "",
        applyIntro: {},
        diyformValue: {},
        intro: "",
        orderKey: '',
        protocolContent: "",
        type: 0,
        status: 0,
        toProtocolView: 0,
        showDiyForm: !1,
        applyProtocolCheck: !1,
        showApplyProtocol: !1,
        statusBarHeight: app.globalData.statusBarHeight,
        protocolHidden: true
    },
    onLoad: function (t) {
    },
    onLoadFun: function () {
        var o = this, e = this;
        (0, _live.getApplyInfo)().then(function (t) {
            o.setData({
                applyIntro: t.data.applyInfo,
                orderKey: t.data.orderKey
            }), _wxParse2.default.wxParse("intro", "html", t.data.intro, e, 0), _wxParse2.default.wxParse("protocolContent", "html", t.data.applyInfo.apply_protocol_content, e, 0),
                wx.stopPullDownRefresh();
            if (t.data.applyInfo.apply_status == -2) {
                o.setData({
                    showDiyForm: !0
                })
            }
            if (t.data.applyInfo.apply_status == -1) {
                o.setData({
                    showDiyForm: !0
                })
            }
            if (t.data.applyInfo.apply_status == -3) {
                o.setData({
                    showDiyForm: !0
                })
            }
            if (t.data.applyInfo.apply_status == 1) {
                return wx.hideLoading(), app.Tips({
                    title: '审核通过'
                }, {
                    tab: 5,
                    url: "/common/pages/user/user"
                });
            }

        }).catch(function (t) {
            return wx.hideLoading(), app.Tips({
                title: t
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        this.onLoadFun();
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    },
    onApplyProtocolCheck: function (t) {
        this.setData({
            applyProtocolCheck: !this.data.applyProtocolCheck
        });
    },
    onShowProtocol: function () {
        this.setData({
            showApplyProtocol: !this.data.showApplyProtocol
        });
    },
    doApplyCondition: function () {
        switch (this.data.applyIntro.apply_limit) {
            case "2":
                this.doApplyPay();
                break;
            case "3":
                wx.reLaunch({
                    url: "/common/pages/loading/loading"
                });
        }
    },
    onCloseDiyForm: function () {
        this.setData({
            showDiyForm: !1
        });
    },
    doApplyPay: function () {
        for (var t = this.data.diyformValue, e = this.data.applyIntro, o = t.extends, a = 0; a < o.length; a++) if (o[a].err_msg) return app.Tips({
            title: o[a].err_msg
        });
        var b = this;
        wx.showLoading({
            title: "支付中..."
        }), (0, _live.applyAnchorPay)(this.data.orderKey, a).then(function (t) {
            wx.hideLoading();
            var a = (t.data.result.orderId, t.data.result.jsConfig);
            wx.requestPayment({
                timeStamp: a.timestamp,
                nonceStr: a.nonceStr,
                package: a.package,
                signType: a.signType,
                paySign: a.paySign,
                success: function (e) {
                    wx.hideLoading(), wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        duration: 2e3
                    }), setTimeout(function () {
                        b.doApplyDiyFormSubmit()
                    }, 2e3);
                },
                fail: function (e) {
                    return wx.hideLoading(), app.Tips({
                        title: "取消支付"
                    }, {
                        tab: 5,
                        url: goPages + "&status=2"
                    });
                },
                complete: function (e) {
                    if (wx.hideLoading(), "requestPayment:cancel" == t.errMsg) return app.Tips({
                        title: "取消支付"
                    }, {
                        tab: 5,
                        url: goPages + "&status=2"
                    });
                }
            });
        }).catch(function (e) {
            return wx.hideLoading(), app.Tips({
                title: e
            });
        });
    },
    doApply: function () {
        this.setData({
            showDiyForm: !0
        });

        // else {
        //     wx.showLoading({
        //         title: "申请中..."
        //     });
        //     var e = "/common/pages/user/user";
        //     wx.hideLoading(), (0, _store.apply)({}).then(function(o) {
        //         wx.requestSubscribeMessage({
        //             tmplIds: t.tmplIds,
        //             success: function(t) {
        //                 return app.Tips({
        //                     title: o.msg
        //                 }, {
        //                     tab: 5,
        //                     url: e
        //                 });
        //             },
        //             fail: function(t) {
        //                 return wx.hideLoading(), app.Tips({
        //                     title: o.msg
        //                 }, {
        //                     tab: 5,
        //                     url: e
        //                 });
        //             }
        //         });
        //     }).catch(function(t) {
        //         wx.hideLoading(), wx.showToast({
        //             title: t,
        //             icon: "none",
        //             duration: 2e3
        //         });
        //     });
        // }
    },
    getDiyFormData: function (t) {
        this.setData({
            diyformValue: t.detail
        });
    },
    doApplyDiyFormSubmit: function () {
        for (var t = this.data.diyformValue, e = this.data.applyIntro, o = t.extends, a = 0; a < o.length; a++) if (o[a].err_msg) return app.Tips({
            title: o[a].err_msg
        });
        wx.showLoading({
            title: "申请中..."
        });
        var n = "/common/pages/user/user";
        wx.hideLoading(), (0, _live.applyFormAnchor)({
            diyform: o
        }).then(function (o) {
            wx.requestSubscribeMessage({
                tmplIds: e.tmplIds,
                success: function (t) {
                    return app.Tips({
                        title: o.msg
                    }, {
                        tab: 5,
                        url: n
                    });
                },
                fail: function (t) {
                    return wx.hideLoading(), app.Tips({
                        title: o.msg
                    }, {
                        tab: 5,
                        url: n
                    });
                }
            });
        }).catch(function (t) {
            if (t == '你还没有开通店铺或者店铺资料未完善') {
                wx.showModal({
                    title: '你还没有开通店铺或者店铺资料未完善',
                    content: '是否开通店铺',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '/merch/pages/apply/index'
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }else {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 2e3
                });
            }

        });
    },
    lookprotocol() {
        this.setData({
            protocolHidden: false
        })
    }
});