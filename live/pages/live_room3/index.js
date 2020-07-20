var _data, _common = require("../../../api/common"), _live = require("../../../api/live"),
    _live2 = require("../../../api/plugin/viewing_rewards/live"), _wxParse = require("../../../lib/wxParse/wxParse.js"),
    _wxParse2 = _interopRequireDefault(_wxParse), _goods = require("../../../api/goods"),
    _order = require("../../../api/order.js"), _util = require("../../../lib/utils/util"),
    _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var chatIm = require("../../../lib/chat/init.js"), app = getApp();

Page({
    data: (_data = {
        pictureMode: ["pop"],
        imgSrc: app.globalData.static_url,
        sliderValue: 0,
        updateState: !1,
        hongbaoHidden: true,
        live: {},
        userInfo: {},
        templates: {},
        siteInfo: {},
        viewers: [],
        comments: [],
        chatConfig: {},
        plugins: {},
        giftData: [],
        liveCard: [],
        gives: [],
        goods: [],
        storeImage: "",
        PromotionCode: "",
        posterbackgd: "/images/posterbackgd.png",
        chat_notice: "",
        is_follow: !1,
        timeOutGonggao: !0,
        gift_show: !1,
        goods_loading: !1,
        goods_loadend: !1,
        goods_loadTitle: "加载更多",
        goods_page: 1,
        goods_limit: 0,
        shopList: !1,
        shopBang: !1,
        benZhi: !1,
        inputShop: !1,
        guanZhu: !1,
        giftPorpShop: !1,
        nowNumShop: !1,
        hongbaoBang: !1,
        hongbaoKai: !1,
        hongbaoTan: !1,
        fenData: !1,
        glActive: 0,
        lwActive: 0,
        scrollT: 0,
        outTimeS: null,
        tiemOuter: null,
        nowNum: "1",
        sendMsgData: "",
        giftActive: "",
        giftNumData: "",
        countDownList: [],
        examineKeywords: {},
        zhuboData: {},
        shopListData: [],
        shopBangData: [],
        shopBangA: {},
        shopBangZ: {},
        shopBangGL: {},
        poll: '',
        qianghongbaoHidden: true,
        last_id: '',//最后红包id
        hongbao_id: '',
        qiangMoney: '',
        hongbaoList: '',
        qiang_id: '',//抢的id
        goodsPoll: '',
        goodsInfo: "",
        goodsHide: true,
        goods_id: '',
        index_id: ''
    }, _defineProperty(_data, "giftData", []), _defineProperty(_data, "originalGiftData", []),
        _defineProperty(_data, "myGiftData", []), _defineProperty(_data, "liwushujushang", {}),
        _defineProperty(_data, "socketGuankan", "20000"), _defineProperty(_data, "socketBangdan", {}),
        _defineProperty(_data, "socketGonggao", {
            text: "系统公告：利物直播提倡绿色直播， 内容包含低俗，暴露，政治等都将会 被封号，网警24小时在线巡查！同时 请警惕那些代充等业务.",
            fuli: "../../../../image/bg.png"
        }), _defineProperty(_data, "socketShoptui", {}), _defineProperty(_data, "socketBarrage", []),
        _defineProperty(_data, "socketGiftData", []), _defineProperty(_data, "socketNum", [{
        num: 1314,
        name: "一生一世"
    }, {
        num: 520,
        name: "我爱你"
    }, {
        num: 188,
        name: "要包包"
    }, {
        num: 66,
        name: "一切顺利"
    }, {
        num: 10,
        name: "十全十美"
    }, {
        num: 1,
        name: "一心一意"
    }]), _defineProperty(_data, "attribute", {
        cartAttr: !1
    }), _defineProperty(_data, "cart_num", 0), _defineProperty(_data, "productAttr", []),
        _defineProperty(_data, "productSelect", {}), _defineProperty(_data, "cameValue", ""),
        _defineProperty(_data, "kamiValueShop", !0), _data),
    onLoadFun: function (t) {
        this.getLiveDetail(this.data.live_id), this.getExamineKeywords();
    },
    getLiveDetail: function (a) {
        var i = this, n = this;
        (0, _live.getLiveDetail)(a).then(function (t) {
            console.log(t);
            n.setData({
                live: t.data.live,
                liveLimit: t.data.liveLimit,
                is_follow: t.data.is_follow,
                gift_show: t.data.gift_show,
                liveCard: t.data.liveCard,
                recommend_goods: t.data.recommend_goods,
                has_recommend: 0 < Object.keys(t.data.recommend_goods).length,
                chatConfig: t.data.chatConfig,
                userInfo: t.data.userInfo,
                viewers: t.data.viewers,
                templates: t.data.template,
                siteInfo: t.data.siteInfo,
                plugins: t.data.plugins,
                gives: t.data.gives,
                chat_notice: t.data.chat_notice
            }), chatIm.init(t.data.userInfo, t.data.chatConfig, a, i);
            var e = Math.round(4294967296 * Math.random());
            chatIm.sendMsg({
                content: n.data.userInfo.nickname + "来了",
                content_type: 6,
                nickname: n.data.userInfo.nickname,
                avatar: n.data.userInfo.avatar,
                fic_num: n.data.live.fic_num,
                user_id: n.data.userInfo.id,
                random: e
            }, n.data.userInfo, n.data.chatConfig), n.execPlugins(t.data.plugins), n.downloadFilestoreImage(),
                n.downloadFilePromotionCode(), n.getLiveCommentsLists(a), setTimeout(function () {
                n.setData({
                    timeOutGonggao: !1
                });
            }, 1e4);
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    downloadFilestoreImage: function () {
        var e = this;
        wx.downloadFile({
            url: e.setDomain(e.data.live.local_cover),
            success: function (t) {
                e.setData({
                    storeImage: t.tempFilePath
                });
            },
            fail: function () {
                e.setData({
                    storeImage: ""
                });
            }
        });
    },
    setDomain: function (t) {
        return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
    },
    downloadFilePromotionCode: function (e) {
        var a = this;
        (0, _live.getLiveQrcode)(this.data.live_id, {
            type: 4
        }).then(function (t) {
            wx.downloadFile({
                url: a.setDomain(t.data.code),
                success: function (t) {
                    "function" == typeof e ? e && e(t.tempFilePath) : a.setData({
                        PromotionCode: t.tempFilePath
                    });
                },
                fail: function (t) {
                    a.setData({
                        PromotionCode: ""
                    });
                }
            });
        }).catch(function (t) {
            a.setData({
                PromotionCode: ""
            });
        });
    },
    liveBack: function () {
        1 < getCurrentPages().length ? wx.navigateBack() : wx.reLaunch({
            url: "/common/pages/loading/loading"
        });
    },
    gopages: function (t) {
        t.target.dataset.url && wx.redirectTo({
            url: t.target.dataset.url
        });
    },
    follow: function (t) {
        var i = this, n = this;
        0 == this.data.is_follow && this.subscribeLive(), (0, _live.followLive)(this.data.live_id, 1).then(function (t) {
            console.log(t);
            var e = Math.round(4294967296 * Math.random());
            if (i.data.guanZhu) var a = n.data.userInfo.nickname + "取消了关注"; else a = n.data.userInfo.nickname + "点了关注";
            chatIm.sendMsg({
                content: a,
                content_type: 5,
                nickname: n.data.userInfo.nickname,
                user_id: n.data.userInfo.id,
                follower_num: t.data.follower_num,
                random: e
            }, n.data.userInfo, n.data.chatConfig), n.setData({
                is_follow: t.data.is_follow,
                "live.anchor.follower_num": t.data.follower_num,
                guanZhu: !i.data.guanZhu
            });
            console.log(t);
        });
    },
    subscribeLive: function () {
        var e = this;
        wx.requestSubscribeMessage({
            tmplIds: e.data.templates,
            success: function (t) {
                (0, _live.liveSubscribe)(e.data.live_id).then(function (t) {
                    console.log(t);
                    return e.setData({
                        isSubscribedCurrentLive: !e.data.isSubscribedCurrentLive
                    }), app.Tips({
                        title: t.msg
                    });
                }).catch(function (t) {
                    return app.Tips({
                        title: t
                    });
                });
            },
            // fail: function (t) {
            //     return app.Tips({
            //         title: "订阅失败"
            //     });
            // }
        });
    },
    execPlugins: function (t) {
        t.viewing_rewards.enable && this.viewingRewardsPlugintoRoom(this.data.live_id);
    },
    viewingRewardsPlugintoRoom: function (t) {
        var e = this;
        (0, _live2.viewingRewardsPlugintoRoom)(t).then(function (t) {
            e.recReward(e.data.plugins), console.log(e.data.plugins);
        });
    },
    recReward: function (t) {
        if (!t.viewing_rewards.enable) return !1;
        if (1 == t.viewing_rewards.data.status) return this.setData({
            hongbaoKai: !0
        }), !1;
        if (0 == t.viewing_rewards.data.status && 0 < t.viewing_rewards.data.time) {
            var e = new Date().getTime(), a = 1e3 * t.viewing_rewards.data.time;
            this.data.outTimeS = new Date(e + a).getTime(), this.daojishi();
        }
    },
    leaveRoom: function () {
        this.data.plugins.viewing_rewards.enable && (0, _live2.viewingRewardsPlugleaveRoom)(this.data.live_id).then(function (t) {
        }),
            chatIm.logout(this.data.chatConfig);
        clearInterval(this.data.poll);
        clearInterval(this.data.goodsPoll)
        console.log('离开');
    },
    intoRoom: function () {
        chatIm.init(this.data.userInfo, this.data.chatConfig, this.data.live_id, this);
    },
    getLiveCommentsLists: function (t) {
        console.log(t);
        var e = this;
        (0, _live.getLiveCommentsLists)(t).then(function (t) {
            e.setData({
                comments: t.data
            }), e.queryMultipleNodes();
        });
    },
    receiveMsgs: function (t) {
        var e = this, a = chatIm.receiveMsgs(t, this.data.userInfo, this.data.chatConfig);
        if (a) {
            var i = this.data.comments || [];
            if (this.data.random != a.random && a.live_id == this.data.live_id) {
                if (this.setData({
                    "loginInfo.random": a.random
                }), 99 == a.content_type) return this.setData({
                    welcome: a.nickname,
                    showNotice: !0
                }), void setTimeout(function () {
                    e.setData({
                        showNotice: !1
                    });
                }, 2e3);
                if (9999 != a.content_type) {
                    if (300 == a.content_type) return 0 == (s = a.content).status && this.setData({
                        recommend_goods: {},
                        has_recommend: !1
                    }), void (1 == s.status && this.setData({
                        recommend_goods: s,
                        has_recommend: !0
                    }));
                    if (404 != a.content_type) if (a.user_id != this.data.userInfo.id || 400 != a.content_type && 600 != a.content_type || (i.push(a),
                        this.setData({
                            comments: i
                        }), this.queryMultipleNodes()), 2 == a.content_type && this.data.userInfo.id == a.user_id && this.onRewardInfo(a),
                    4 == a.content_type && this.onSendGift(a), 6 != a.content_type) 5 != a.content_type ? 1 == a.content_type && (i.push(a),
                    100 < i.length && (i = i.slice(i.length - 100, i.length)), this.setData({
                        comments: i
                    }), this.queryMultipleNodes()) : this.setData({
                        "live.anchor.follower_num": a.follower_num
                    }); else {
                        this.setData({
                            "live.fic_num": a.fic_num
                        });
                        var n = this.data.viewers || [], o = {
                            uid: a.user_id,
                            user: {
                                avatar: a.avatar
                            }
                        };
                        for (d = 0; d < n.length; d++) {
                            if (0 == d && n[d].uid == a.user_id) return !0;
                            n[d].uid == a.user_id && n.splice(d, 1);
                        }
                        3 < n.length && n.unshift(o);
                    } else {
                        var s = a.content, r = this.data.recommend_goods;
                        if (0 < r.length) for (var d = 0; d < r.length; d++) r[d].id == s.goods_id && r.splice(d, 1);
                        this.setData({
                            recommend_goods: r
                        });
                    }
                } else this.endLiveTips(a.content);
            }
        }
    },
    endLiveTips: function (t) {
        console.log("用户点击取消"), wx.showModal({
            title: "提示",
            content: t,
            cancelText: "再看看",
            confirmText: "离开",
            success: function (t) {
                t.confirm ? wx.reLaunch({
                    url: "/common/pages/loading/loading"
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    queryMultipleNodes: function () {
        var e = this;
        wx.nextTick(function () {
            wx.createSelectorQuery().in(e).select("#chatInfo").boundingClientRect(function (t) {
                t && e.setData({
                    scrollT: t.height,
                    socketBarrage: e.data.comments
                });
            }).exec();
        });
    },
    showLiveGoods: function () {
        this.setData({
            goods_loading: !1,
            goods_loadend: !1,
            goods_loadTitle: "加载更多",
            goods_page: 1,
            goods: [],
            goods_limit: 20
        }), this.getLiveGoods();
    },
    getLiveGoods: function () {
        var i = this, t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY(0).step(), i.setData({
            animation: t.export(),
            shopList: !i.data.shopList
        }), i.data.goods_loadend || i.data.goods_loading || (i.setData({
            goods_loading: !0,
            goods_loadTitle: ""
        }), (0, _live.getLiveGoods)(i.data.live_id, {
            page: i.data.goods_page
        }).then(function (t) {
            var e = t.data.goods || [], a = e.length < t.data.limit;
            i.data.goods = app.SplitArray(e, i.data.goods), i.setData({
                goods: i.data.goods,
                goods_loadend: a,
                goods_limit: t.data.limit,
                goods_loading: !1,
                goods_loadTitle: a ? "拉到底了哦" : "加载更多",
                goods_page: i.data.goods_page + 1
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        }));
    },
    onWeekRank: function () {
        var e = this;
        (0, _live.giftRank)(this.data.live_id, "week").then(function (t) {
            e.setData({
                rankLists: t.data.rankLists,
                benZhi: !e.data.benZhi
            });
        });
    },
    onTotalRank: function () {
        var e = this;
        (0, _live.giftRank)(this.data.live_id, "total").then(function (t) {
            e.setData({
                rankLists: t.data.rankLists,
                benZhi: !e.data.benZhi
            });
        });
    },
    onGlActive: function (t) {
        1 == t.currentTarget.dataset.active ? this.setData({
            glActive: t.currentTarget.dataset.active,
            shopBangData: this.data.shopBangGL
        }) : this.setData({
            glActive: t.currentTarget.dataset.active,
            shopBangData: this.data.shopBangA
        });
    },
    pagechange: function (t) {
        this.setData({
            lwActive: t.detail.current
        });
    },
    onGiftPorpShop: function () {
        var s = this;
        (0, _live.getLiveGifts)(this.data.live_id).then(function (t) {
            for (var e = t.data.gifts, a = [], i = 0, n = e.length; i < n; i += 8) a.push(e.slice(i, i + 8));
            s.setData({
                giftData: a,
                originalGiftData: t.data.gifts
            });
            var o = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            o.translateY(0).step(), s.setData({
                animation4: o.export(),
                giftPorpShop: !0
            });
        });
    },
    onNowSendGift: function () {
        if ("" === this.data.giftActive || null === this.data.giftActive) return wx.showToast({
            title: "选择礼物",
            duration: 1500
        }), !1;
        if (null === this.data.nowNum || "" === this.data.nowNum) this.setData({
            nowNumShop: !0
        }); else {
            var i = this, t = {
                gift_id: this.data.nowGift.id,
                gift_num: this.data.nowNum,
                payType: "yue"
            };
            (0, _live.payGift)(this.data.live_id, t).then(function (t) {
                i.setData({
                    "userInfo.total_balance": t.data.total_balance
                });
                var e = "送了" + i.data.nowGift.name + "X" + i.data.nowNum, a = Math.round(4294967296 * Math.random());
                chatIm.sendMsg({
                    content: e,
                    content_type: 4,
                    nickname: i.data.userInfo.nickname,
                    avatar: i.data.userInfo.avatar,
                    gift_id: i.data.nowGift.id,
                    gift_img: i.data.nowGift.image,
                    gift_num: i.data.nowNum,
                    user_id: i.data.userInfo.id,
                    random: a
                }, i.data.userInfo, i.data.chatConfig);
            }).catch(function (t) {
                return app.Tips({
                    title: t
                });
            });
        }
    },
    onLoad: function (t) {
        var e = this;
        wx.getStorage({
            key: 'last_id',
            success(res) {
                e.setData({
                    last_id: res.data
                })
            }
        });
        this.pollhongbao();

        if (wx.getSystemInfo({
            success: function (t) {
                e.setData({
                    "commonHeadHeight.statusBarHeight": t.statusBarHeight - 4,
                    "commonHeadHeight.titleHeight": t.statusBarHeight + 50
                });
            }
        }), wx.nextTick(function () {
            wx.createSelectorQuery().in(e).select("#chatInfo").boundingClientRect(function (t) {
                t && e.setData({
                    scrollT: t.height
                });
            }).exec();
        }), t.scene) {
            var a = _util2.default.getUrlParams(decodeURIComponent(t.scene));
            a.live_id && (t.live_id = a.live_id), a.spid && (app.globalData.spid = a.spid);
        }
        if (!t.live_id) return app.Tips({
            title: "缺少参数无法查看"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            live_id: t.live_id
        }), t.spid && (app.globalData.spid = t.spid), this.getExamineKeywords();
        this.goodsPlay()
    },
    getExamineKeywords: function () {
        var e = this;
        (0, _common.getExamineKeywords)().then(function (t) {
            e.setData({
                examineKeywords: t.data
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, e, 0);
        }).catch(function (t) {
        });
    },
    onReady: function () {
        this.videoContext = wx.createVideoContext("videoplayer"), this.setData({
            updateState: !0
        });
    },
    videoUpdate: function (t) {
        if (this.data.updateState) {
            var e = t.detail.currentTime / t.detail.duration * 100, a = new Date().getTime(),
                i = t.detail.duration / 60 * 1e3, n = (new Date(a + 60 * i).getTime() - a) / 1e3,
                o = parseInt(n / 86400), s = parseInt(n % 86400 / 3600), r = parseInt(n % 86400 % 3600 / 60),
                d = parseInt(n % 86400 % 3600 % 60), u = {
                    day: this.timeFormat(o),
                    hou: this.timeFormat(s),
                    min: this.timeFormat(r),
                    sec: this.timeFormat(d)
                }, c = t.detail.currentTime / 60 * 1e3, l = (new Date(a + 60 * c).getTime() - a) / 1e3,
                h = parseInt(l / 86400), p = parseInt(l % 86400 / 3600), m = parseInt(l % 86400 % 3600 / 60),
                f = parseInt(l % 86400 % 3600 % 60), g = {
                    day: this.timeFormat(h),
                    hou: this.timeFormat(p),
                    min: this.timeFormat(m),
                    sec: this.timeFormat(f)
                };
            this.setData({
                sliderValue: e,
                duration: t.detail.duration,
                videoLenght: u,
                videoNow: g
            });
        }
    },
    sliderChanging: function (t) {
        this.setData({
            updateState: !1
        });
    },
    sliderChange: function (t) {
        this.data.duration && (this.videoContext.seek(t.detail.value / 100 * this.data.duration),
            this.setData({
                sliderValue: t.detail.value,
                updateState: !0
            }));
    },
    onShow: function () {
        1 == this.data.needInitChat && (this.setData({
            needInitChat: !1
        }), this.intoRoom());
        console.log(getApp().globalData.userInfo.id);
    },
    onTouchLike: function () {
        var a = this;
        this.setData({
            hoverLike: !0,
            dataLike: 1
        });
        var t = function () {
            var t = a.selectComponent("#bubble"), e = a.data.dataLike;
            a.setData({
                dataLike: e + 1
            }), t.showBubble();
        };
        t(), clearInterval(a.longTapBubbleTimer), a.longTapBubbleTimer = setInterval(t, 150);
    },
    onCancelTouchLike: function () {
        this.setData({
            hoverLike: !1
        }), clearInterval(this.longTapBubbleTimer);
    },
    timeFormat: function (t) {
        return t < 10 ? "0" + t : "" + t;
    },
    daojishi: function () {
        var t = this, e = new Date().getTime(), a = t.data.outTimeS, i = [], n = null;
        if (0 < a - e) {
            var o = (a - e) / 1e3, s = parseInt(o / 86400), r = parseInt(o % 86400 / 3600),
                d = parseInt(o % 86400 % 3600 / 60), u = parseInt(o % 86400 % 3600 % 60);
            n = {
                day: t.timeFormat(s),
                hou: t.timeFormat(r),
                min: t.timeFormat(d),
                sec: t.timeFormat(u)
            };
        } else n = {
            day: "00",
            hou: "00",
            min: "00",
            sec: "00"
        };
        i.push(n), t.setData({
            countDownList: i
        }), t.data.outTime = setTimeout(t.daojishi, 1e3), "00" === i[0].day && "00" === i[0].hou && "00" === i[0].min && "00" === i[0].sec && t.clearCountdown();
    },
    clearCountdown: function () {
        clearTimeout(this.data.outTime), this.setData({
            hongbaoKai: !0
        });
    },
    onHideShopList: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("100%").step(), this.setData({
            animation: t.export(),
            shopList: !1
        });
    },
    onShopBang: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY(0).step(), this.setData({
            animation2: t.export(),
            shopBang: !0
        });
        this.onWeekRank()
    },
    nowNumShopNum: function () {
        this.setData({
            nowNumShop: !this.data.nowNumShop
        });
    },
    onHideShopBang: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("100%").step(), this.setData({
            animation2: t.export(),
            shopBang: !1
        });
    },
    onInputShop: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY(0).step(), this.setData({
            animation3: t.export(),
            inputShop: !0
        });
    },
    onHideInputShop: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("100%").step(), this.setData({
            animation3: t.export(),
            inputShop: !1,
            sendMsgData: ""
        });
    },
    onHideGiftPorpShop: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("100%").step(), this.setData({
            animation4: t.export(),
            giftPorpShop: !1
        });
    },
    sendInput: function (t) {
        this.setData({
            sendMsgData: t.detail.value
        });
    },
    sendMsg: function () {
        var e = this, t = e.data.comments || [], a = e.data.sendMsgData;
        if (10 < t.length && (t = t.slice(1)), a.replace(/^\s*|\s*$/g, "")) {
            this.onHideInputShop();
            var i = Math.round(4294967296 * Math.random());
            this.setData({
                "loginInfo.random": i,
                "loginInfo.content_type": 1
            }), (0, _live.filterContent)(e.data.live_id, {
                content: a,
                content_type: 1
            }).then(function (t) {
                chatIm.sendMsg({
                    content: a,
                    content_type: 1,
                    nickname: e.data.userInfo.nickname,
                    user_id: e.data.userInfo.id,
                    random: i
                }, e.data.userInfo, e.data.chatConfig), (0, _live.getCommentsStore)(e.data.live_id, {
                    content: a,
                    content_type: 1
                }).then(function (t) {
                });
            }).catch(function (t) {
                return app.Tips({
                    title: t
                });
            });
        }
    },
    onSendGift: function (t) {
        for (var e = this, a = this.data.socketGiftData, i = 0; i < a.length; i++) a[i].gift_id == t.gift_id && (t.gift_num = parseInt(t.gift_num) + parseInt(a[i].gift_num),
            a.splice(i, 1));
        a.push(t), 2 < a.length && (a = a.slice(1));
        var n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        n.translateX(0).step(), this.setData({
            animation5: n.export(),
            socketGiftData: a
        }), this.data.tiemOuter && clearTimeout(this.data.tiemOuter), this.data.tiemOuter = setTimeout(function () {
            e.onHideGift(), e.setData({
                socketGiftData: []
            });
        }, 3e3);
    },
    onHideGift: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateX("-100%").step(), this.setData({
            animation5: t.export()
        });
    },
    onClickGift: function (e) {
        var t = this.data.originalGiftData.find(function (t) {
            return t.id == e.currentTarget.dataset.id;
        });
        console.log(t), this.setData({
            giftActive: e.currentTarget.dataset.id,
            nowGift: t
        });
    },
    onNowNumShop: function (t) {
        this.setData({
            nowNum: t.currentTarget.dataset.item.num,
            nowNumShop: !1
        });
    },
    onNumClick: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY(0).step(), this.setData({
            animation7: t.export(),
            nowNumShop: !this.data.nowNumShop
        });
    },
    onNumInput: function (t) {
        this.setData({
            nowNum: t.detail.value
        });
    },
    onNumInputClick: function (t) {
        this.setData({
            nowNum: this.data.nowNum
        }), this.onHideNumGiftShop();
    },
    onHideNumGiftShop: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("100%").step(), this.setData({
            animation7: t.export(),
            giftNumData: ""
        });
    },
    // 红包
    onHideHongbao: function () {
        this.setData({
            hongbaoTan: !1
        });
    },
    onShopHongbaoKai: function () {
        this.setData({
            hongbaoKai: !0,
            hongbaoTan: !1
        });
    },
    onHideHongbaoKai: function () {
        var i = this;
        this.setData({
            hongbaoKai: !1,
            hongbaoHidden: true
        });
        // var t = {
        //     log_id: this.data.plugins.viewing_rewards.data.log_id
        // };
        // (0, _live2.viewingRewardsPlugRecReward)(this.data.live_id, t).then(function(t) {
        //     if (i.setData({
        //         "plugins.viewing_rewards.data": t.data.data
        //     }), 1 == t.data.data.status && i.setData({
        //         hongbaoKai: !0
        //     }), 0 == t.data.data.status && 0 < t.data.data.time) {
        //         var e = new Date().getTime(), a = 1e3 * t.data.data.time;
        //         i.data.outTimeS = new Date(e + a).getTime(), i.daojishi();
        //     }
        // });
    },
    onHideHongbaoBang: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("110%").step(), this.setData({
            animation6: t.export(),
            hongbaoHidden: true
        });
    },
    onShopFen: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY(0).step(), this.setData({
            animation8: t.export(),
            fenData: !0
        });
    },
    onHideFen: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY("100%").step(), this.setData({
            animation8: t.export(),
            fenData: !1
        });
    },
    getPopPay: function () {
        this.getLiveGoods();
    },
    onMyEvent: function (t) {
        this.setData({
            "attribute.cartAttr": t.detail.window,
            isOpen: !1
        });
    },
    closePopPay: function () {
        this.setData({
            popPayShow: !1
        });
    },
    joinCart: function (t) {
        var e = t.currentTarget.dataset.goodsid;
        this.getGoodsDetails(e), this.setData({
            "attribute.cartAttr": !0,
            isOpen: !0
        }), this.onHideShopList(), this.closePopPay();
    },
    closePopCart: function () {
        this.setData({
            "attribute.cartAttr": !1,
            isOpen: !1
        }), this.getPopPay();
    },
    goCat: function (t) {
        var e = this, a = t.currentTarget.dataset.ispay, i = this.data.productValue[this.data.attrValue];
        return this.data.attrValue ? (this.setData({
            "attribute.cartAttr": !this.data.isOpen
        }), this.data.attribute.cartAttr ? this.closePopPay() : this.getPopPay()) : this.data.isOpen ? (this.setData({
            "attribute.cartAttr": !0
        }), this.closePopPay()) : (this.setData({
            "attribute.cartAttr": !this.data.attribute.cartAttr
        }), this.data.attribute.cartAttr ? this.closePopPay() : this.getPopPay()), !0 === this.data.attribute.cartAttr && 0 == this.data.isOpen ? this.setData({
            isOpen: !0
        }) : this.data.productAttr.length && void 0 === i && 1 == this.data.isOpen ? app.Tips({
            title: "请选择属性"
        }) : void (0, _order.postCartAdd)({
            productId: e.data.goods_id,
            relation_type: 1,
            relation_id: e.data.live_id,
            cartNum: e.data.cart_num,
            uniqueId: void 0 !== i ? i.unique : "",
            new: 0 === a ? 0 : 1
        }).then(function (t) {
            e.setData({
                isOpen: !1,
                "attribute.cartAttr": !1
            }), e.getPopPay(), a ? wx.redirectTo({
                url: "/order/pages/order_confirm/index?cartId=" + t.data.cartId
            }) : app.Tips({
                title: "添加购物车成功",
                icon: "success"
            }, function () {
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    getGoodsDetails: function (a) {
        var i = this;
        (0, _goods.getGoodsDetail)(a).then(function (t) {
            var e = t.data.storeInfo;
            i.setData({
                storeInfo: e,
                goods_id: a,
                productAttr: t.data.productAttr,
                productValue: t.data.productValue,
                productSelect:e
            }), i.DefaultSelect(), _wxParse2.default.wxParse("description", "html", i.data.description, i, 0);
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    DefaultSelect: function () {
        for (var t = this.data.productAttr, e = this.data.storeInfo, a = 0, i = t.length; a < i; a++) t[a].attr_value[0] && (t[a].checked = t[a].attr_value[0].attr);
        var n, o, s = this.data.productAttr.map(function (t) {
            return t.checked;
        }), r = this.data.productValue[s.sort().join(",")];
        r ? this.setData((_defineProperty(n = {}, "productSelect.store_name", e.store_name),
            _defineProperty(n, "productSelect.image", r.image), _defineProperty(n, "productSelect.price", r.price),
            _defineProperty(n, "productSelect.stock", r.stock), _defineProperty(n, "productSelect.unique", r.unique),
            _defineProperty(n, "productSelect.cart_num", 1), _defineProperty(n, "attrValue", s),
            _defineProperty(n, "attr", "已选择"), n)) : this.setData((_defineProperty(o = {}, "productSelect.store_name", e.store_name),
            _defineProperty(o, "productSelect.image", e.image), _defineProperty(o, "productSelect.price", e.price),
            _defineProperty(o, "productSelect.stock", this.data.productAttr.length ? 0 : e.stock),
            _defineProperty(o, "productSelect.unique", ""), _defineProperty(o, "productSelect.cart_num", this.data.productAttr.length ? 0 : 1),
            _defineProperty(o, "attrValue", ""), _defineProperty(o, "attr", "请选择"), o));
        this.setData({
            productAttr: t
        });
    },
    ChangeAttr: function (t) {
        var e, a, i = t.detail, n = this.data.productValue[i], o = this.data.storeInfo;
        n ? this.setData((_defineProperty(e = {}, "productSelect.image", n.image), _defineProperty(e, "productSelect.price", n.price),
            _defineProperty(e, "productSelect.stock", n.stock), _defineProperty(e, "productSelect.unique", n.unique),
            _defineProperty(e, "productSelect.cart_num", 1), _defineProperty(e, "attrValue", i),
            _defineProperty(e, "attr", "已选择"), e)) : this.setData((_defineProperty(a = {}, "productSelect.image", o.image),
            _defineProperty(a, "productSelect.price", o.price), _defineProperty(a, "productSelect.stock", 0),
            _defineProperty(a, "productSelect.unique", ""), _defineProperty(a, "productSelect.cart_num", 0),
            _defineProperty(a, "attrValue", ""), _defineProperty(a, "attr", "请选择"), a));
    },
    ChangeCartNum: function (t) {
        var e = t.detail, a = this.data.productValue[this.data.attrValue];
        if (void 0 !== a || this.data.productAttr.length || (a = this.data.productSelect),
        void 0 !== a) {
            var i, n, o = a.stock || 0;
            if (null == a.cart_num && (a.cart_num = 1), e) a.cart_num++, a.cart_num > o && (a.cart_num = o),
            a.cart_num < 1 && (a.cart_num = 1), this.setData((_defineProperty(i = {}, "productSelect.cart_num", a.cart_num),
                _defineProperty(i, "cart_num", a.cart_num), i)); else a.cart_num--, a.cart_num < 1 && (a.cart_num = 1),
                this.setData((_defineProperty(n = {}, "productSelect.cart_num", a.cart_num), _defineProperty(n, "cart_num", a.cart_num),
                    n));
        }
    },
    onBindscroll: function (t) {
        this.getLiveGoods();
    },
    onHide: function () {
        this.setData({
            needInitChat: !0
        }), this.leaveRoom();
    },
    onUnload: function () {
        this.leaveRoom();
    },
    sharePoster: function () {
        var e = this;
        this.onHideFen(), this.setData({
            canvasStatus: !0
        });
        var a = [e.data.posterbackgd, e.data.storeImage, e.data.PromotionCode];
        wx.getImageInfo({
            src: e.data.PromotionCode,
            fail: function (t) {
                return app.Tips({
                    title: "小程序二维码需要发布正式版后才能获取到"
                });
            },
            success: function () {
                "" == a[2] ? e.downloadFilePromotionCode(function (t) {
                    if (a[2] = t, "" == a[2]) return app.Tips({
                        title: "海报二维码生成失败！"
                    });
                    _util2.default.PosterCanvas(a, e.data.live.title, "", function (t) {
                        e.setData({
                            posterImage: t,
                            posterImageStatus: !0,
                            canvasStatus: !1,
                            actionSheetHidden: !e.data.actionSheetHidden
                        });
                    });
                }) : _util2.default.PosterCanvas(a, e.data.live.title, "", function (t) {
                    e.setData({
                        posterImage: t,
                        posterImageStatus: !0,
                        canvasStatus: !1,
                        actionSheetHidden: !e.data.actionSheetHidden
                    });
                });
            }
        });
    },
    posterImageClose: function () {
        this.setData({
            posterImageStatus: !1
        });
    },
    savePosterPath: function () {
        var e = this;
        wx.getSetting({
            success: function (t) {
                t.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                    filePath: e.data.posterImage,
                    success: function (t) {
                        e.posterImageClose(), app.Tips({
                            title: "保存成功",
                            icon: "success"
                        });
                    },
                    fail: function (t) {
                        app.Tips({
                            title: "保存失败"
                        });
                    }
                }) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function () {
                        wx.saveImageToPhotosAlbum({
                            filePath: e.data.posterImage,
                            success: function (t) {
                                e.posterImageClose(), app.Tips({
                                    title: "保存成功",
                                    icon: "success"
                                });
                            },
                            fail: function (t) {
                                app.Tips({
                                    title: "保存失败"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function () {
        return {
            title: this.data.live.title || "",
            imageUrl: this.data.live.cover,
            path: "/live/pages/live_room3/index?live_id=" + this.data.live_id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    },
    onSubmitCame: function (t) {
        var e = this.data.cameValue, a = this;
        if (!e) return this.setData({
            "liveLimit.has_permission": !1
        }), app.Tips({
            title: "请输入卡密"
        });
        (0, _live.liveVerifyCame)(this.data.live_id, e).then(function (t) {
            a.setData({
                cameValue: "",
                "liveLimit.has_permission": !0
            });
        }).catch(function (t) {
            return a.setData({
                "liveLimit.has_permission": !1,
                cameValue: ""
            }), app.Tips({
                title: t
            });
        });
    },
    onInputCame: function (t) {
        this.setData({
            cameValue: t.detail.value
        });
    },
    // 点击抢红包
    hongbaoShow() {
        let that = this;
        (0, _live.qiangHongbao)({id: this.data.hongbao_id}).then(function (e) {
            that.setData({
                qiangMoney: e.data.extend.money,
                hongbaoHidden: false,
                last_id: that.data.hongbao_id,
                qiang_id: that.data.hongbao_id
            });
            wx.setStorage({key: 'last_id', data: that.data.last_id})
        }).catch(function (e) {
            app.Tips({
                title: e
            });
        })
    },
    // 轮询有没有红包
    pollhongbao() {
        let count = 1;
        let that = this;
        this.data.poll = setInterval(() => {
            (0, _live.getHongbao)({last_id: this.data.last_id, live_id: this.data.live_id}).then(function (e) {
                if (e.data.id) {
                    that.setData({
                        hongbao_id: e.data.id,
                        qianghongbaoHidden: false
                    })
                } else {
                    that.setData({
                        qianghongbaoHidden: true
                    })
                }
            }).catch(function (e) {
                that.setData({
                    qianghongbaoHidden: true
                })
            })
        }, 3000)
    },
    onHongbaoBang: function () {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.translateY(0).step(), this.setData({
            animation6: t.export()
        });
        let that = this;
        (0, _live.hongbaoList)({id: this.data.qiang_id}).then(function (e) {
            that.setData({
                hongbaoList: e.data.receive_list
            })
        }).catch(function (e) {
            console.log(e);
        })

    },
    goodsPlay: function () {
        let that = this;
        this.data.goodsPoll = setInterval(() => {
            (0, _live.getGoodsList)({
                live_id: this.data.live_id,
                goods_id: '',
                index_id: this.data.index_id
            }).then(function (e) {
                if (e.data.list.length > 0) {
                    that.setData({
                        index_id: e.data.index_id,
                        goodsInfo: e.data.list[0],
                        goodsHide: false
                    });
                    var t = wx.createAnimation({
                        duration: 2000,
                        timingFunction: "ease",
                    });
                    t.translateY("-200%").step(), t.opacity(1).step(), that.setData({
                        animation6: t.export()
                    });
                } else {
                    that.setData({
                        goodsHide: true
                    });
                }

            }).catch(function (e) {
                console.log(e);
            })
        }, 2000)
    },
    animationend: function () {
        clearInterval(this.data.goodsPoll);
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease",
        });
        t.translateY("0").step(), t.opacity(1).step(), this.setData({
            animation6: t.export(),
        });
        this.setData({
            goodsHide: true
        });
        this.goodsPlay();
    }
});