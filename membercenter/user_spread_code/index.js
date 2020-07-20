var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "分销海报"
        },
        imgUrls: [],
        indicatorDots: !1,
        circular: !1,
        autoplay: !1,
        interval: 3e3,
        duration: 500,
        swiperIndex: 0,
        spreadList: [],
        userInfo: {},
        poster: ""
    },
    onLoadFun: function(t) {
        this.setData({
            userInfo: t.detail
        }), this.userSpreadBannerList();
    },
    onLoad: function(t) {},
    bindchange: function(t) {
        var e = this.data.spreadList;
        this.setData({
            swiperIndex: t.detail.current,
            poster: e[t.detail.current].poster
        });
    },
    onReady: function() {},
    onShow: function() {
        this.data.isClone && this.userSpreadBannerList();
    },
    setDomain: function(t) {
        return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
    },
    savePosterPath: function() {
        wx.downloadFile({
            url: this.setDomain(this.data.poster),
            success: function(e) {
                if (200 !== e.statusCode) return app.Tips({
                    title: e.errMsg
                });
                wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                            filePath: e.tempFilePath,
                            success: function(t) {
                                return app.Tips({
                                    title: "保存成功"
                                });
                            },
                            fail: function(t) {
                                return app.Tips({
                                    title: t.errMsg
                                });
                            },
                            complete: function(t) {}
                        }) : wx.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                wx.saveImageToPhotosAlbum({
                                    filePath: e.tempFilePath,
                                    success: function(t) {
                                        return app.Tips({
                                            title: "保存成功"
                                        });
                                    },
                                    fail: function(t) {
                                        return app.Tips({
                                            title: t.errMsg
                                        });
                                    },
                                    complete: function(t) {}
                                });
                            },
                            fail: function() {
                                wx.showModal({
                                    title: "您已拒绝获取相册权限",
                                    content: "是否进入权限管理，调整授权？",
                                    success: function(t) {
                                        if (t.confirm) wx.openSetting({
                                            success: function(t) {
                                                console.log(t.authSetting);
                                            }
                                        }); else if (t.cancel) return app.Tips({
                                            title: "已取消！"
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function(t) {}
                });
            },
            fail: function(t) {
                return app.Tips({
                    title: t.errMsg
                });
            }
        });
    },
    userSpreadBannerList: function() {
        var e = this;
        wx.showLoading({
            title: "获取中",
            mask: !0
        }), (0, _user.getSpreadPic)().then(function(t) {
            wx.hideLoading(), e.setData({
                spreadList: t.data,
                poster: t.data[0].poster
            });
        }).catch(function(t) {
            wx.hideLoading();
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
    onShareAppMessage: function() {
        return (0, _user.userShare)(), {
            title: this.data.userInfo.nickname + "-分销海报",
            imageUrl: this.data.spreadList[0],
            path: "/common/pages/loading/loading?spid=" + this.data.userInfo.uid
        };
    }
});