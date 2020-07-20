var _live = require("../../../api/live"), _common = require("../../../api/common"),
    _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util),
    _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "",
            color: !0,
            class: "red"
        },
        deviceType: "iPhone-X",
        goods: [],
        templates: [],
        posterbackgd: "/images/posterbackgd.png",
        startedAt: "",
        loading: !1,
        loadend: !1,
        page: 1,
        limit: 10,
        live: {},
        userInfo: {},
        PromotionCode: "",
        wantLook: 0,
        isSubscribedCurrentLive: !1,
        is_follow: !1,
        examineKeywords: {}
    },
    getLiveDetail: function (t) {
        var e = this;
        (0, _live.noticeLiveInfo)(t).then(function (t) {
            e.setData({
                userInfo: t.data.userInfo,
                live: t.data.live,
                is_follow: t.data.is_follow,
                wantLook: t.data.wantLook,
                templates: t.data.templates,
                startedAt: t.data.start_at,
                isSubscribedCurrentLive: t.data.is_subscribe
            }), console.log(111111, t.data.start_at), e.downloadFilestoreImage();
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    setDomain: function (t) {
        return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
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
    follow: function () {
        var e = this;
        (0, _live.followLive)(e.data.live_id, 1).then(function (t) {
            e.setData({
                is_follow: t.data.is_follow
            });
        });
    },
    onLoad: function (t) {
        if (t.scene) {
            console.log(t.scene);
            var e = _util2.default.getUrlParams(decodeURIComponent(t.scene));
            e.live_id && (t.live_id = e.live_id), e.spid && (app.globalData.spid = e.spid);
        }
        if (!t.live_id) return app.Tips({
            title: "缺少参数无法查看"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            live_id: t.live_id
        }), t.spid && (app.globalData.spid = t.spid);
    },
    onLoadFun: function (t) {
        this.getLiveDetail(this.data.live_id), this.downloadFilePromotionCode(), this.getLiveGoods(),
            this.getExamineKeywords();
    },
    getExamineKeywords: function () {
        var e = this;
        (0, _common.getExamineKeywords)().then(function (t) {
            e.setData({
                examineKeywords: t.data,
                "parameter.title": t.data.keywords_live + t.data.keywords_live_notice
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, e, 0);
        }).catch(function (t) {
        });
    },
    goLivePages: function () {
        wx.redirectTo({
            url: "/live/pages/live_room3/index?live_id=" + this.data.live_id
        });
    },
    downloadFilePromotionCode: function (e) {
        var i = this;
        (0, _live.getLiveQrcode)(this.data.live_id, {
            type: 1
        }).then(function (t) {
            wx.downloadFile({
                url: t.data.code,
                success: function (t) {
                    console.log(t);
                    "function" == typeof e ? e && e(t.tempFilePath) : i.setData({
                        PromotionCode: t.tempFilePath
                    });
                },
                fail: function (t) {
                    i.setData({
                        PromotionCode: ""
                    });
                }
            });
        }).catch(function (t) {
            i.setData({
                PromotionCode: ""
            });
        });
    },
    posterImageClose: function () {
        this.setData({
            posterImageStatus: !1
        });
    },
    goPoster: function () {
        var e = this;
        e.setData({
            canvasStatus: !0
        });
        var i = [e.data.posterbackgd, e.data.storeImage, e.data.PromotionCode];
        console.log(11111, i), wx.getImageInfo({
            src: e.data.PromotionCode,
            fail: function (t) {
                return app.Tips({
                    title: "小程序二维码需要发布正式版后才能获取到"
                });
            },
            success: function () {
                console.log(444444, e.data.live), "" == i[2] ? e.downloadFilePromotionCode(function (t) {
                    if (i[2] = t, "" == i[2]) return app.Tips({
                        title: "海报二维码生成失败！"
                    });
                    _util2.default.PosterCanvas(i, e.data.live.title, "", function (t) {
                        e.setData({
                            posterImage: t,
                            posterImageStatus: !0,
                            canvasStatus: !1,
                            actionSheetHidden: !e.data.actionSheetHidden
                        });
                    });
                }) : _util2.default.PosterCanvas(i, e.data.live.title, "", function (t) {
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
    getLiveGoods: function () {
        var a = this;
        a.data.loadend || a.data.loading || (a.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _live.getLiveGoods)(a.data.live_id, {
            page: a.data.page
        }).then(function (t) {
            var e = t.data.goods || [], i = e.length < t.data.limit;
            a.data.goods = app.SplitArray(e, a.data.goods), a.setData({
                goods: a.data.goods,
                limit: t.data.limit,
                loadend: i,
                loading: !1,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: a.data.page + 1
            });
        }));
    },
    onReachBottom: function () {
        this.getLiveGoods();
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
    },
    subscribeLive: function () {
        var e = this;
        console.log(e.data.live_id);
        (0, _live.liveSubscribe)(e.data.live_id,{spid:app.globalData.spid}).then(function (t) {
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
        // wx.requestSubscribeMessage({
        //     tmplIds: e.data.templates,
        //     success: function(t) {
        //
        //     },
        //     fail: function(t) {
        //         return app.Tips({
        //             title: "订阅失败"
        //         });
        //     }
        // });
    },
    unSubscribeLive: function () {
        var e = this;
        (0, _live.liveUnSubscribe)(e.data.live_id).then(function (t) {
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
    toggleSubscribe: function (t) {
        1 == this.data.isSubscribedCurrentLive ? this.unSubscribeLive() : this.subscribeLive();
    },
    openHome: function () {
        wx.redirectTo({
            url: "/common/pages/loading/loading"
        });
    },
    openPlayBack: function () {
        wx.redirectTo({
            url: "/live/pages/live_room3/index?live_id=" + this.data.live_id
        });
    },
    onShareAppMessage: function () {
        return {
            title: this.data.live.title || "",
            path: "/live/pages/live_room3/index?live_id=" + this.data.live_id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    }
});