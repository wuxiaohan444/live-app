var _store = require("../../../api/plugin/merch/store.js"), _wxParse = require("../../../lib/wxParse/wxParse.js"),
    _wxParse2 = _interopRequireDefault(_wxParse);

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
            title: "我要开店",
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
        protocolContent: "",
        type: 0,
        status: 0,
        toProtocolView: 0,
        showDiyForm: !1,
        applyProtocolCheck: !1,
        showApplyProtocol: !1,
        statusBarHeight: app.globalData.statusBarHeight,
        protocolHidden: true,
        enterArr: [{name: '经销商门店', id: 0}, {name: '企业', id: 1}, {name: '官方展会', id: 2}, {name: '主播招聘', id: 3}],
        enterIndex: '',
        classArr: '',
        classIndex: 0,
        style_config: '',
    },
    onLoad: function (t) {
    },
    onLoadFun: function () {
        var o = this, e = this;
        (0, _store.getApplyIntro)().then(function (t) {
            o.setData({
                applyIntro: t.data,
                style_config: t.data.style_config,
            }), _wxParse2.default.wxParse("intro", "html", t.data.intro, e, 0), _wxParse2.default.wxParse("protocolContent", "html", t.data.apply_protocol_content, e, 0),
                wx.stopPullDownRefresh();
            if (t.data.can_apply) {
                o.setData({
                    showDiyForm: !0,
                })
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
        var a = this;
        wx.showLoading({
            title: "支付中..."
        }), (0, _store.applyPay)().then(function (t) {
            wx.hideLoading();
            var o = t.data.status, e = (t.data.result.orderId, t.data.result.jsConfig);
            switch (o) {
                case "ORDER_EXIST":
                case "EXTEND_ORDER":
                case "PAY_ERROR":
                    return wx.hideLoading(), app.Tips({
                        title: t.msg
                    }, {
                        tab: 5,
                        url: "/common/pages/user/user"
                    });

                case "WECHAT_PAY":
                    wx.requestPayment({
                        timeStamp: e.timestamp,
                        nonceStr: e.nonceStr,
                        package: e.package,
                        signType: e.signType,
                        paySign: e.paySign,
                        success: function (t) {
                            wx.hideLoading(), wx.showToast({
                                title: "支付成功",
                                icon: "success",
                                duration: 2e3
                            }), setTimeout(function () {
                                a.doApplyDiyFormSubmit()
                            }, 2e3);
                        },
                        fail: function (t) {
                            wx.hideLoading(), wx.showToast({
                                title: "取消支付",
                                icon: "none",
                                duration: 2e3
                            });
                        },
                        complete: function (t) {
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
        }).catch(function (t) {
            console.log(t);
            if (t == '已支付!') {
                a.doApplyDiyFormSubmit()
            } else {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    doApply: function () {
        var t = this.data.applyIntro;
        // if (1 == t.open_protocol && !this.data.applyProtocolCheck) return wx.showToast({
        //     title: "请同意并仔细阅读入驻协议",
        //     icon: "none",
        //     duration: 2e3
        // }), void wx.createSelectorQuery().select(".apply-protocol-content").boundingClientRect(function (t) {
        //     wx.pageScrollTo({
        //         scrollTop: t.top + t.bottom
        //     });
        // }).exec();
        if (1 == t.is_apply_diyform && t.apply_diyform) this.setData({
            showDiyForm: !0
        }); else {
            wx.showLoading({
                title: "申请中..."
            });
            var e = "/common/pages/user/user";
            wx.hideLoading(), (0, _store.apply)({}).then(function (o) {
                wx.requestSubscribeMessage({
                    tmplIds: t.tmplIds,
                    success: function (t) {
                        return app.Tips({
                            title: o.msg
                        }, {
                            tab: 5,
                            url: e
                        });
                    },
                    fail: function (t) {
                        return wx.hideLoading(), app.Tips({
                            title: o.msg
                        }, {
                            tab: 5,
                            url: e
                        });
                    }
                });
            }).catch(function (t) {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
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
        let channel_type = this.data.enterArr[this.data.enterIndex].id;
        let category_id = this.data.classArr[this.data.classIndex].id;

        wx.hideLoading(), (0, _store.apply)({
            category_id: category_id,
            channel_type: channel_type,
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
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    },
    lookprotocol() {
        this.setData({
            protocolHidden: false
        })
    },
    bindPickerChangeEnter(e) {
        let type = e.detail.value;
        for (let i = 0; i < this.data.style_config.length; i++) {
            if (type == this.data.style_config[i].type) {
                this.data.classArr = this.data.style_config[i].cate
            }
        }
        this.setData({
            enterIndex: type,
            classArr: this.data.classArr,
            classIndex: 0
        })

    },
    bindPickerChangeClass(e) {
        this.setData({
            classIndex: e.detail.value
        })
    },
});