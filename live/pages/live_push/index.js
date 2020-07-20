var _data, _live = require("../../../api/live.js"), _dialog = require("../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util), _live2 = require("../../../api/plugin/viewing_rewards/live"), _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var chatIm = require("../../../lib/chat/init.js"), app = getApp();

Page({
    data: (_data = {
        imgSrc: app.globalData.static_url,
        pocket_show:false,
        focus: !1,
        playing: !1,
        frontCamera: !0,
        mic: !0,
        ans: !0,
        cameraContext: {},
        pushUrl: "",
        random: "",
        showHDTips: !1,
        mode: "HD",
        muted: !1,
        enableCamera: !0,
        orientation: "vertical",
        beauty: 63,
        whiteness: 3,
        minBitrate: 200,
        maxBitrate: 1e3,
        backgroundMute: !1,
        hide: !1,
        debug: !1,
        scrollT: 0,
        operUser: {},
        liveOrders: [],
        userManager: [],
        liveGoods: [],
        msgs: [],
        bottom_scroll_top: 0,
        showAudience: !1,
        needInitChat: !1,
        audienceNum: 0,
        audiences: [],
        navH: 0,
        winH: 0,
        followNums: 0,
        screenTotalH: 0,
        isInput: !1,
        popPayShow: !1,
        prohibitShow: !1,
        addPayShow: !1,
        searchValue: "",
        chat_notice: "",
        toolShow: !1,
        pullBlackShow: !1,
        live: {},
        shutlist: [],
        blacklist: [],
        searchGoods: [],
        popOrderShow: !1,
        toolMore: !1,
        cameraChecked: !1,
        radio: "1",
        radioItems: [ {
            name: "SD",
            value: "标清"
        }, {
            name: "HD",
            value: "高清",
            checked: "true"
        }, {
            name: "FHD",
            value: "超清"
        }, {
            name: "RTC",
            value: "实时通话"
        } ],
        plugins: {},
        mikeChecked: !0,
        noiseChecked: !0,
        currentValue: 0,
        hongbaoKai: !1,
        currentWhiteValue: 0,
        currentBitrateValue: 20,
        examineKeywords: {},
        device: "front",
        goods_loading: !1,
        goods_loadend: !1,
        goods_loadTitle: "加载更多",
        goods_page: 1,
        goods_limit: 0,
        goodsPage: {
            loading: !1,
            loadend: !1,
            page: 1,
            limit: 10
        },
        hongType: !1,
        pay_type: !1,
        hongbaoForm: {
            pic: "",
            desc: " ",
            money: "",
            num: "",
            type: 1,
            pay_type: 2,
            order_id: 555
        }
    }, _defineProperty(_data, "pay_type", !1), _defineProperty(_data, "shopAmd", !1), 
    _defineProperty(_data, "hongbaoData", {}), _defineProperty(_data, "hongbaoKai2", !1), 
    _defineProperty(_data, "hongbaoWan2", !1), _defineProperty(_data, "hongbaoLing2", !1), 
    _defineProperty(_data, "userHongBaoList", []), _defineProperty(_data, "listShop", !1), 
    _data),
    onLoadFun: function(t) {
        var a = this, e = this;
        (0, _live.getPushLiveInfo)().then(function(t) {
            console.log(t);
            e.setData({
                pushUrl: t.data.pushUrl,
                plugins: t.data.plugins,
                live: t.data.live,
                userInfo: t.data.userInfo,
                chatConfig: t.data.chatConfig,
                chat_notice: t.data.chat_notice,
                followNums: t.data.followNums,
                pocket_show:t.data.pocket_show
            }), chatIm.init(t.data.userInfo, t.data.chatConfig, t.data.live.id, a), e.onPushClick(), 
            e.execPlugins(a.data.plugins, 1);
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    "commonHeadHeight.statusBarHeight": t.statusBarHeight - 4,
                    "commonHeadHeight.titleHeight": t.statusBarHeight + 50
                });
            }
        }), this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var a = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            a.setData({
                examineKeywords: t.data,
                "parameter.title": t.data.keywords_live
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, a, 0);
        }).catch(function(t) {});
    },
    execPlugins: function(t, a) {
        t.viewing_rewards.enable && (1 == a && this.recReward(t), 2 == a && this.pluginLiveStart(), 
        3 == a && this.pluginLiveEnd());
    },
    pluginLiveStart: function() {
        (0, _live2.viewingRewardsPlugLiveStart)().then(function(t) {});
    },
    pluginLiveEnd: function() {
        (0, _live2.viewingRewardsPlugLiveEnd)().then(function(t) {});
    },
    onHongbaoM: function(t) {
        this.setData(_defineProperty({}, "hongbaoForm.money", t.detail.value));
    },
    onHongbaoN: function(t) {
        this.setData(_defineProperty({}, "hongbaoForm.num", t.detail.value));
    },
    onHongType: function() {
        this.data.hongType ? this.setData(_defineProperty({}, "hongbaoForm.type", 1)) : this.setData(_defineProperty({}, "hongbaoForm.type", 2)), 
        this.setData({
            hongType: !this.data.hongType
        });
    },
    onShopSetEnvelope: function() {
        this.setData({
            shopAmd: !this.data.shopAmd,
            pay_type: !1
        });
    },
    post_pinshou_hongbaoSend: function() {
        this.setData({
            pay_type: !this.data.pay_type
        });
    },
    onPaytype: function(t) {
        var e = this, i = this;
        if (i.setData(_defineProperty({}, "hongbaoForm.pay_type", t.currentTarget.dataset.type)), 
        i.data.hongbaoForm.money <= 0) return app.Tips({
            title: "请输入金额"
        });
        if (i.data.hongbaoForm.num <= 0) return app.Tips({
            title: "请输入个数"
        });
        var a = {
            money: i.data.hongbaoForm.money,
            live_id: i.data.live.id
        };
        if (1 == t.currentTarget.dataset.type) (0, _live.hongbaoWxpay)(a).then(function(t) {
            var a = {
                pic: i.data.hongbaoForm.pic,
                desc: i.data.hongbaoForm.desc,
                money: i.data.hongbaoForm.money,
                num: i.data.hongbaoForm.num,
                type: i.data.hongbaoForm.type,
                pay_type: i.data.hongbaoForm.pay_type,
                order_id: t.data.order.order_id
            };
            wx.requestPayment({
                timeStamp: t.data.jssdk.timestamp,
                nonceStr: t.data.jssdk.nonceStr,
                package: t.data.jssdk.package,
                signType: t.data.jssdk.signType,
                paySign: t.data.jssdk.paySign,
                success: function(t) {
                    wx.hideLoading(), console.log(t), (0, _live.hongbaoSend)(i.data.live.id, a).then(function(t) {
                        i.setData({
                            pay_type: !1,
                            shopAmd: !1
                        });
                    }).catch(function(t) {
                        console.log(t);
                    });
                },
                fail: function(t) {
                    return wx.hideLoading(), app.Tips({
                        title: "取消支付"
                    });
                },
                complete: function(t) {
                    wx.hideLoading();
                }
            });
        }).catch(function(t) {
            console.log(t);
        }); else {
            var n = {
                pic: i.data.hongbaoForm.pic,
                desc: i.data.hongbaoForm.desc,
                money: i.data.hongbaoForm.money,
                num: i.data.hongbaoForm.num,
                type: i.data.hongbaoForm.type,
                pay_type: i.data.hongbaoForm.pay_type
            };
            (0, _live.hongbaoSend)(i.data.live.id, n).then(function(t) {
                i.setData({
                    pay_type: !1,
                    shopAmd: !1
                });
                var a = Math.round(4294967296 * Math.random());
                console.log(t);
                chatIm.sendMsg({
                    nickname: t.data.nickname,
                    avatar: t.data.avatar,
                    content: t.data.content,
                    relation_id: t.data.relation_id,
                    content_type: t.data.content_type,
                    id: t.data.id,
                    user_id: t.data.user_id,
                    random: a
                }, e.data.userInfo, e.data.chatConfig);
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    onShopHongbao2: function() {
        var a = this, t = {
            id: a.data.hongbaoData.relation_id
        };
        (0, _live.hongbaoReceive)(a.data.hongbaoData.relation_id, t).then(function(t) {
            "-1005" == t.status ? a.setData({
                hongbaoWan2: !0
            }) : "-1006" == t.status ? a.setData({
                hongbaoLing2: !0
            }) : a.setData({
                hongbaoKai2: !0,
                userHongBao: t.data
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    onHongbaoBang: function() {
        var a = this;
        (0, _live.hongbaoReceiveList)(a.data.hongbaoData.relation_id).then(function(t) {
            a.setData({
                userHongBaoList: t.data,
                listShop: !0
            }), console.log(a.data.listShop);
        }).catch(function(t) {
            console.log(t);
        });
    },
    onHideHongbaoBang2: function() {
        this.setData({
            listShop: !1
        });
    },
    onHideHongbaoKai2: function() {
        this.setData({
            hongbaoKai2: !1,
            hongbaoLing2: !1,
            hongbaoWan2: !1
        });
    },
    onShopHongbao: function() {
        this.setData({
            hongbaoKai: !0
        });
    },
    onHideHongbaoKai: function() {
        var i = this;
        i.setData({
            hongbaoKai: !1
        });
        var t = {
            log_id: this.data.plugins.viewing_rewards.data.log_id
        };
        (0, _live2.viewingRewardsPlugAnchorRecReward)(this.data.live.id, t).then(function(t) {
            if (i.setData({
                "plugins.viewing_rewards.data": t.data.data
            }), 1 == t.data.data.status && i.setData({
                hongbaoKai: !0
            }), 0 == t.data.data.status && 0 < t.data.data.time) {
                var a = new Date().getTime(), e = 1e3 * t.data.data.time;
                i.data.outTimeS = new Date(a + e).getTime(), i.daojishi();
            }
        });
    },
    recReward: function(t) {
        if (!t.viewing_rewards.enable) return !1;
        if (1 == t.viewing_rewards.data.status) return this.setData({
            hongbaoKai: !0
        }), !1;
        if (0 == t.viewing_rewards.data.status && 0 < t.viewing_rewards.data.time) {
            var a = new Date().getTime(), e = 1e3 * t.viewing_rewards.data.time;
            this.data.outTimeS = new Date(a + e).getTime(), this.daojishi();
        }
    },
    timeFormat: function(t) {
        return t < 10 ? "0" + t : "" + t;
    },
    daojishi: function() {
        var t = this, a = new Date().getTime(), e = t.data.outTimeS, i = [], n = null;
        if (0 < e - a) {
            var o = (e - a) / 1e3, s = parseInt(o / 86400), d = parseInt(o % 86400 / 3600), r = parseInt(o % 86400 % 3600 / 60), c = parseInt(o % 86400 % 3600 % 60);
            n = {
                day: t.timeFormat(s),
                hou: t.timeFormat(d),
                min: t.timeFormat(r),
                sec: t.timeFormat(c)
            };
        } else n = {
            day: "00",
            hou: "00",
            min: "00",
            sec: "00"
        };
        i.push(n), t.setData({
            countDownList: i
        }), t.data.outTime = setTimeout(t.daojishi.bind(this), 1e3), "00" === i[0].day && "00" === i[0].hou && "00" === i[0].min && "00" === i[0].sec && t.clearCountdown();
    },
    clearCountdown: function() {
        clearTimeout(this.data.outTime), this.setData({
            hongbaoKai: !0
        });
    },
    showToolPopup: function() {
        this.setData({
            toolMore: !0,
            toolShow: !1
        });
    },
    onToolClose: function() {
        this.setData({
            toolMore: !1
        });
    },
    onCameraChecked: function(t) {
        var a = t.detail;
        this.setData({
            cameraChecked: a
        }), a ? this.setData({
            device: "back"
        }) : this.setData({
            device: "front"
        }), this.onSwitchCameraClick();
    },
    onRadioChange: function(t) {
        this.setData({
            mode: t.detail.value
        });
    },
    onMikeChecked: function(t) {
        var a = t.detail;
        this.setData({
            mikeChecked: a,
            mic: a
        });
    },
    onNoiseChecked: function(t) {
        var a = t.detail;
        this.setData({
            noiseChecked: a,
            ans: a
        });
    },
    onDrag: function(t) {
        this.setData({
            beauty: t.detail.value
        });
    },
    onWhiteDrag: function(t) {
        this.setData({
            whiteness: t.detail.value
        });
    },
    onBitrateDrag: function(t) {
        this.setData({
            bitrate: t.detail.value,
            minBitrate: t.detail.value,
            maxBitrate: t.detail.value
        });
    },
    queryMultipleNodes: function() {
        var a = this;
        wx.nextTick(function() {
            wx.createSelectorQuery().in(a).select("#chatInfo").boundingClientRect(function(t) {
                t && a.setData({
                    scrollT: t.height
                });
            }).exec();
        });
    },
    receiveMsgs: function(t) {
        var a = chatIm.receiveMsgs(t, this.data.userInfo, this.data.chatConfig);
        if (console.log(a), a) {
            var e = this.data.msgs || [];
            this.data.random != a.random && a.live_id == this.data.live.id && (this.setData({
                "loginInfo.random": a.random
            }), 7 == a.content_type && this.setData({
                hongbaoData: a
            }), 99 == a.content_type && this.updateLiveNum(), 5 == a.content_type && this.setData({
                followNums: a.follower_num
            }), e.push(a), 100 < e.length && (e = e.slice(e.length - 100, e.length)), this.setData({
                msgs: e
            }), this.queryMultipleNodes());
        }
    },
    sendMsg: function(a) {
        var e = this, i = this;
        if ((a = a.detail.value).replace(/^\s*|\s*$/g, "")) {
            var n = Math.round(4294967296 * Math.random());
            this.setData({
                "loginInfo.random": n,
                "loginInfo.content_type": 1,
                isInput: !1
            }), (0, _live.getCommentsStore)(i.data.live.id, {
                content: a,
                content_type: 1
            }).then(function(t) {
                chatIm.sendMsg({
                    content: a,
                    content_type: 1,
                    nickname: i.data.userInfo.nickname,
                    user_id: i.data.userInfo.id,
                    random: n
                }, e.data.userInfo, e.data.chatConfig);
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }
    },
    onInputTap: function() {
        this.setData({
            focus: !0
        });
    },
    updateLiveNum: function() {
        var a = this;
        (0, _live.getLiveNum)(a.data.live.id).then(function(t) {
            a.setData({
                "live.fic_num": t.data
            });
        }).catch(function(t) {});
    },
    onInputChange: function(t) {
        this.setData({
            pushUrl: t.detail.value,
            playUrl: ""
        });
    },
    onPushClick: function() {
        0 == this.data.pushUrl.indexOf("rtmp://") ? (this.setData({
            playing: !this.data.playing
        }), this.data.playing ? (this.data.cameraContext.start(), this.execPlugins(this.data.plugins, 2)) : (this.data.cameraContext.stop(), 
        this.execPlugins(this.data.plugins, 3))) : wx.showModal({
            title: "提示",
            content: "推流地址不合法，请点击右上角+按钮先获取腾讯云推流地址",
            showCancel: !1
        });
    },
    onSwitchCameraClick: function() {
        this.data.frontCamera = !this.data.frontCamera, this.setData({
            frontCamera: this.data.frontCamera
        }), this.data.cameraContext.switchCamera();
    },
    onBeautyClick: function() {
        0 != this.data.beauty ? (this.data.beauty = 0, this.data.whiteness = 0) : (this.data.beauty = 6.3, 
        this.data.whiteness = 3), this.setData({
            beauty: this.data.beauty,
            whiteness: this.data.whiteness
        });
    },
    onOrientationClick: function() {
        "vertical" == this.data.orientation ? this.data.orientation = "horizontal" : this.data.orientation = "vertical", 
        this.setData({
            orientation: this.data.orientation
        });
    },
    onLogClick: function() {
        this.setData({
            debug: !this.data.debug
        });
    },
    onSwitchMode: function() {
        var t = !this.data.showHDTips;
        this.setData({
            showHDTips: t
        });
    },
    onModeClick: function(t) {
        var a = "SD";
        switch (t.target.dataset.mode) {
          case "SD":
            a = "SD";
            break;

          case "HD":
            a = "HD";
            break;

          case "FHD":
            a = "FHD";
        }
        this.setData({
            mode: a,
            showHDTips: !1
        });
    },
    onEnableCameraClick: function() {
        var t = this;
        this.setData({
            enableCamera: !this.data.enableCamera
        }), this.data.playing && (this.data.cameraContext.stop(), setTimeout(function() {
            t.data.cameraContext.start();
        }, 500));
    },
    onMuteClick: function() {
        this.setData({
            muted: !this.data.muted
        });
    },
    onPushEvent: function(t) {
        -1307 == t.detail.code && (this.stop(), wx.showToast({
            title: "推流多次失败"
        }));
    },
    stop: function() {
        this.setData({
            playing: !1,
            mode: "HD",
            muted: !1,
            enableCamera: !0,
            orientation: "vertical",
            beauty: 6.3,
            whiteness: 3,
            backgroundMute: !1,
            debug: !1
        }), this.data.cameraContext.stop();
    },
    createContext: function() {
        this.setData({
            cameraContext: wx.createLivePusherContext("camera-push")
        });
    },
    onLoad: function(t) {
        wx.createLivePlayerContext("live-player").stop();
        var a = wx.getSystemInfoSync().SDKVersion;
        if (_util2.default.compareVersion(a, "2.9.1") < 0) return wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }), void setTimeout(function() {
            wx.redirectTo({
                url: "/common/pages/loading/loading"
            });
        }, 5e3);
        console.log(this.data.hongbaoData);
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.live.title,
            imageUrl: this.data.live.cover,
            path: "/live/pages/live_room3/index?live_id=" + this.data.live.id,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    onReady: function() {
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            screenTotalH: app.globalData.screenTotalH
        }), this.createContext(), wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    },
    liveBack: function() {
        var a = this;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: "确定要结束" + this.data.examineKeywords.keywords_live + "吗?",
            cancelButtonText: "在播一会",
            confirmButtonText: "结束" + this.data.examineKeywords.keywords_live
        }).then(function() {
            (0, _live.liveEnd)({}).then(function(t) {
                chatIm.sendMsg({
                    content: "本次直播已经结束",
                    content_type: 9999,
                    nickname: a.data.userInfo.nickname,
                    user_id: a.data.userInfo.id,
                    random: Math.round(4294967296 * Math.random())
                }, a.data.userInfo, a.data.chatConfig), 200 == t.status ? wx.reLaunch({
                    url: "/live/pages/live_end/index"
                }) : wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            });
        }).catch(function() {});
    },
    getInput: function() {
        this.setData({
            isInput: !0
        });
    },
    closeInput: function() {
        this.setData({
            isInput: !1
        });
    },
    getPopPayShop: function() {
        this.setData({
            popPayShow: !0
        }), this.getPopPay();
    },
    getPopPay: function() {
        var i = this;
        i.data.goods_loadend || i.data.goods_loading || (i.setData({
            goods_loading: !0,
            goods_loadTitle: ""
        }), (0, _live.getAnchorLiveGoods)(i.data.live.id, {
            page: i.data.goods_page
        }).then(function(t) {
            var a = t.data.goods || [], e = a.length < t.data.limit;
            i.data.liveGoods = app.SplitArray(a, i.data.liveGoods), i.setData({
                liveGoods: i.data.liveGoods,
                goods_loadend: e,
                goods_limit: t.data.limit,
                goods_loading: !1,
                goods_loadTitle: e ? "拉到底了哦" : "加载更多",
                goods_page: i.data.goods_page + 1,
                popPayShow: !0
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        }));
    },
    delLiveGoods: function(t) {
        var a = this;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: "确定移除商品吗?",
            cancelButtonText: "算了",
            confirmButtonText: "移除商品"
        }).then(function() {
            var i = a, n = a.data.liveGoods, o = t.currentTarget.dataset.goodsid;
            (0, _live.delLiveGoods)(i.data.live.id, {
                goods_id: o
            }).then(function(t) {
                for (var a = 0; a < n.length; a++) n[a].id == o && n.splice(a, 1), i.setData({
                    liveGoods: n
                });
                var e = Math.round(4294967296 * Math.random());
                chatIm.sendMsg({
                    content: {
                        goods_id: o
                    },
                    content_type: 404,
                    nickname: i.data.userInfo.nickname,
                    user_id: i.data.userInfo.id,
                    random: e
                }, i.data.userInfo, i.data.chatConfig);
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function() {});
    },
    exposure: function(t) {
        var n = this, o = this.data.liveGoods, s = t.currentTarget.dataset.goodsid, d = t.currentTarget.dataset.status;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: 1 == d ? "确定曝光该商品吗?" : "确定要取消曝光该商品吗?",
            cancelButtonText: "在考虑下",
            confirmButtonText: 1 == d ? "曝光" : "取消曝光"
        }).then(function() {
            (0, _live.exposure)(n.data.live.id, {
                goods_id: s,
                status: d
            }).then(function(t) {
                for (var a = {}, e = 0; e < o.length; e++) o[e].id == s && (o[e].status = d, a = o[e]), 
                n.setData({
                    liveGoods: o
                });
                var i = Math.round(4294967296 * Math.random());
                chatIm.sendMsg({
                    content: a,
                    content_type: 300,
                    nickname: n.data.userInfo.nickname,
                    user_id: n.data.userInfo.id,
                    random: i
                }, n.data.userInfo, n.data.chatConfig);
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function() {});
    },
    changTop: function(t) {
        var e = this, i = this.data.liveGoods, n = t.currentTarget.dataset.goodsid, o = t.currentTarget.dataset.sort;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: 1 == o ? "确定置顶该商品吗?" : "确定要取消置顶该商品吗?",
            cancelButtonText: "在考虑下",
            confirmButtonText: 1 == o ? "置顶" : "取消置顶"
        }).then(function() {
            (0, _live.changTop)(e.data.live.id, {
                goods_id: n,
                sort: o
            }).then(function(t) {
                for (var a = 0; a < i.length; a++) i[a].id == n && (i[a].sort = o), e.setData({
                    liveGoods: i
                });
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function() {});
    },
    closePopPay: function() {
        this.setData({
            popPayShow: !1
        });
    },
    getPopOrder: function() {
        var a = this;
        (0, _live.liveOrders)(a.data.live.id).then(function(t) {
            a.setData({
                liveOrders: t.data.orders,
                popOrderShow: !0
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    closePopOrder: function() {
        this.setData({
            popOrderShow: !1
        });
    },
    getProhibit: function(t) {
        this.setData({
            "operUser.user_id": t.currentTarget.dataset.uid,
            "operUser.nickname": t.currentTarget.dataset.name,
            "operUser.avatar": t.currentTarget.dataset.avatar,
            prohibitShow: !0
        });
    },
    setShutup: function() {
        var e = this, i = this;
        (0, _live.setUserShutup)(this.data.live.id, {
            uid: this.data.operUser.user_id,
            type: 1
        }).then(function(t) {
            var a = Math.round(4294967296 * Math.random());
            chatIm.sendMsg({
                content: "系统消息：" + i.data.operUser.nickname + "用户被禁言",
                content_type: 400,
                nickname: i.data.operUser.nickname,
                user_id: i.data.operUser.user_id,
                random: a
            }, e.data.userInfo, e.data.chatConfig), i.setData({
                prohibitShow: !1
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    setBlack: function() {
        var e = this, i = this;
        (0, _live.setUserBlack)(this.data.live.id, {
            uid: this.data.operUser.user_id,
            type: 1
        }).then(function(t) {
            var a = Math.round(4294967296 * Math.random());
            chatIm.sendMsg({
                content: "系统消息：" + i.data.operUser.nickname + "用户被拉黑",
                content_type: 500,
                nickname: i.data.operUser.nickname,
                user_id: i.data.operUser.user_id,
                random: a
            }, e.data.userInfo, e.data.chatConfig), i.setData({
                prohibitShow: !1
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    cancelShut: function(i) {
        var n = this, o = this, s = this.data.shutlist;
        (0, _live.setUserShutup)(this.data.live.id, {
            uid: i.currentTarget.dataset.uid,
            type: 0
        }).then(function(t) {
            for (var a = 0; a < s.length; a++) s[a].uid == i.currentTarget.dataset.uid && s.splice(a, 1);
            var e = Math.round(4294967296 * Math.random());
            chatIm.sendMsg({
                content: "系统消息：" + i.currentTarget.dataset.nickname + "用户被解除禁言",
                content_type: 600,
                nickname: i.currentTarget.dataset.nickname,
                user_id: i.currentTarget.dataset.uid,
                random: e
            }, n.data.userInfo, n.data.chatConfig), o.setData({
                shutlist: s,
                prohibitShow: !1
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    cancelBlack: function(i) {
        var n = this, o = this, s = this.data.blacklist;
        (0, _live.setUserBlack)(this.data.live.id, {
            uid: i.currentTarget.dataset.uid,
            type: 0
        }).then(function(t) {
            for (var a = 0; a < s.length; a++) s[a].uid == i.currentTarget.dataset.uid && s.splice(a, 1);
            var e = Math.round(4294967296 * Math.random());
            chatIm.sendMsg({
                content: "系统消息：" + i.currentTarget.dataset.nickname + "用户被解除拉黑",
                content_type: 700,
                nickname: i.currentTarget.dataset.nickname,
                user_id: i.currentTarget.dataset.uid,
                random: e
            }, n.data.userInfo, n.data.chatConfig), o.setData({
                blacklist: s,
                prohibitShow: !1
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    searchGoods: function(t) {
        var a = t.detail.value;
        this.setData({
            keywords: a,
            searchGoods: [],
            goodsPage: {
                loading: !1,
                loadend: !1,
                page: 1
            }
        }), this.getCommissionGoods();
    },
    addliveGoods: function(t) {
        var e = t.currentTarget.dataset.goodsid, i = this, n = this.data.liveGoods;
        (0, _live.addLiveGoods)(this.data.live.id, {
            goods_id: e
        }).then(function(t) {
            n.push(t.data), i.setData({
                liveGoods: n
            });
            for (var a = 0; a < i.data.searchGoods.length; a++) i.data.searchGoods[a].id == e && (i.data.searchGoods[a].has_add = !0, 
            i.setData({
                searchGoods: i.data.searchGoods
            }));
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    closeProhibit: function() {
        this.setData({
            prohibitShow: !1
        });
    },
    getAddPay: function() {
        this.setData({
            goodsPage: {
                loading: !1,
                loadend: !1,
                page: 1
            },
            searchGoods: [],
            keywords: ""
        }), this.getCommissionGoods();
    },
    getCommissionGoods: function() {
        var i = this, n = this.data.goodsPage;
        n.loadend || n.loading || (n.loading = !0, n.loadTitle = "", i.setData({
            goodsPage: n
        }), (0, _live.getCommissionGoods)(this.data.live.id, {
            keywords: this.data.keywords,
            page: n.page
        }).then(function(t) {
            var a = t.data.goods || [], e = a.length < t.data.limit;
            i.data.searchGoods = app.SplitArray(a, i.data.searchGoods), n.loadend = e, n.limit = t.data.limit, 
            n.loading = !1, n.page = n.page + 1, n.loadTitle = e ? "拉到底了哦" : "加载更多", i.setData({
                // searchGoods: i.data.searchGoods,
                goodsPage: n,
                addPayShow: !0
            });
            var obj = {};
            i.data.searchGoods = i.data.searchGoods.reduce(function (item, next) {
                obj[next.id] ? '' : obj[next.id] = true && item.push(next);
                return item;
            }, []);
            i.setData({
                searchGoods: i.data.searchGoods
            })
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        }));
    },
    closeAddPay: function() {
        this.setData({
            addPayShow: !1
        });
    },
    getTool: function() {
        this.setData({
            toolShow: !0
        });
    },
    closeTool: function() {
        this.setData({
            toolShow: !1
        });
    },
    getForbidden: function() {
        var a = this;
        (0, _live.getShutupLists)(this.data.live.id).then(function(t) {
            a.setData({
                shutlist: t.data,
                forbiddenShow: !0
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    closeForbidden: function() {
        this.setData({
            forbiddenShow: !1
        });
    },
    getPullBlack: function() {
        var a = this;
        (0, _live.getBlackLists)(this.data.live.id).then(function(t) {
            a.setData({
                blacklist: t.data,
                pullBlackShow: !0
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    closePullBlack: function() {
        this.setData({
            pullBlackShow: !1
        });
    },
    searchValue: function(t) {
        this.setData({
            searchValue: t.detail.value
        });
    },
    onShow: function() {
        1 == this.data.needInitChat && (chatIm.init(this.data.userInfo, this.data.chatConfig, this.data.live.id, this), 
        this.setData({
            needInitChat: !1
        }), this.setData({
            playing: !0
        }), this.data.cameraContext.start()), wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    },
    onHide: function() {
        this.setData({
            needInitChat: !0
        }), wx.setKeepScreenOn({
            keepScreenOn: !1
        }), chatIm.logout(this.data.chatConfig);
    },
    onUnload: function() {
        this.setData({
            needInitChat: !1
        }), this.stop(), wx.setKeepScreenOn({
            keepScreenOn: !1
        }), chatIm.logout(this.data.chatConfig);
    },
    onPullDownRefresh: function() {},
    onGoodscroll: function() {
        this.getCommissionGoods();
    },
    onReachBottom: function() {},
    logoutIM: function() {
        chatIm.logout(this.data.chatConfig);
    },
    switchAudience: function() {
        this.setData({
            showAudience: !this.data.showAudience
        });
    },
    onBindscroll: function() {
        this.getPopPay();
    }
});