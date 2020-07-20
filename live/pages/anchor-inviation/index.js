var _live = require("../../../api/live.js"), _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

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
            title: "应邀榜",
            color: !0,
            class: "0"
        },
        show: !0,
        applyInfo: {},
        posterbackgd: "/images/posterbackgd.png",
        userInfo: [],
        examineKeywords: {},
        isClone: !1,
        fansList: []
    },
    // onLoadFun: function() {
    //     this.getAnchorInviation(), this.downloadFilePromotionCode(), this.getExamineKeywords();
    // },
    getExamineKeywords: function() {
        var e = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            e.setData({
                examineKeywords: t.data
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, e, 0);
        }).catch(function(t) {});
    },
    submit: function() {
        applyAnchor({}).then(function(t) {
            return 200 == t.status ? app.Tips({
                title: t.msg,
                icon: "success"
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            }) : app.Tips({
                title: t.msg,
                icon: "error"
            });
        });
    },
    onLoad: function(t) {
        let that = this;
        (0, _live.invitation)({}).then(function (a) {
            console.log(a);
            that.setData({
                fansList:a.data.list
            })
        }).catch(function (a) {
            return app.Tips({
                title: a
            })
        });
    },
    onReady: function() {},
    onShow: function() {
        app.globalData.isLog && this.data.isClone;
    },
    getAnchorInviation: function() {
        var e = this;
        wx.showLoading(), (0, _live.getAnchorInviation)().then(function(t) {
            e.setData({
                applyInfo: t.data.applyInfo,
                userInfo: t.data.userInfo
            }), _wxParse2.default.wxParse("invitation_text", "html", t.data.applyInfo.invitation_text, e, 0), 
            e.downloadFilestoreImage();
        });
    },
    onHide: function() {
        this.setData({
            isClone: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    goLogs: function() {
        wx.redirectTo({
            url: "/live/pages/anchor-inviation-logs/index"
        });
    },
    setDomain: function(t) {
        return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
    },
    downloadFilestoreImage: function() {
        var e = this;
        wx.downloadFile({
            url: e.setDomain(e.data.applyInfo.invitation_image),
            success: function(t) {
                e.setData({
                    storeImage: t.tempFilePath
                }), wx.hideLoading();
            },
            fail: function() {
                e.setData({
                    storeImage: ""
                });
            }
        });
    },
    downloadFilePromotionCode: function(e) {
        var o = this;
        (0, _live.getAnchorQrcode)().then(function(t) {
            console.log(111111, t.data.code), wx.downloadFile({
                url: t.data.code,
                success: function(t) {
                    "function" == typeof e ? e && e(t.tempFilePath) : o.setData({
                        PromotionCode: t.tempFilePath
                    });
                },
                fail: function(t) {
                    o.setData({
                        PromotionCode: ""
                    });
                }
            });
        }).catch(function(t) {
            o.setData({
                PromotionCode: ""
            });
        });
    },
    posterImageClose: function() {
        this.setData({
            posterImageStatus: !1
        });
    },
    goPoster: function() {
        var e = this;
        e.setData({
            canvasStatus: !0
        });
        var o = [ e.data.posterbackgd, e.data.storeImage, e.data.PromotionCode ];
        wx.getImageInfo({
            src: e.data.PromotionCode,
            fail: function(t) {
                return app.Tips({
                    title: t.errMsg
                });
            },
            success: function() {
                "" == o[2] ? e.downloadFilePromotionCode(function(t) {
                    if (o[2] = t, "" == o[2]) return app.Tips({
                        title: "海报二维码生成失败！"
                    });
                    _util2.default.PosterCanvas(o, e.data.applyInfo.code_invi_text, "", function(t) {
                        e.setData({
                            posterImage: t,
                            posterImageStatus: !0,
                            canvasStatus: !1,
                            actionSheetHidden: !e.data.actionSheetHidden
                        });
                    });
                }) : _util2.default.PosterCanvas(o, e.data.applyInfo.code_invi_text, "", function(t) {
                    console.log(222222, o, e.data.applyInfo.code_invi_text), e.setData({
                        posterImage: t,
                        posterImageStatus: !0,
                        canvasStatus: !1,
                        actionSheetHidden: !e.data.actionSheetHidden
                    });
                });
            }
        });
    },
    savePosterPath: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                    filePath: e.data.posterImage,
                    success: function(t) {
                        e.posterImageClose(), app.Tips({
                            title: "保存成功",
                            icon: "success"
                        });
                    },
                    fail: function(t) {
                        app.Tips({
                            title: "保存失败"
                        });
                    }
                }) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.saveImageToPhotosAlbum({
                            filePath: e.data.posterImage,
                            success: function(t) {
                                e.posterImageClose(), app.Tips({
                                    title: "保存成功",
                                    icon: "success"
                                });
                            },
                            fail: function(t) {
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
    onShareAppMessage: function() {}
});