var _live = require("../../../api/live"), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util), _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse), _live2 = require("../../../api/plugin/viewing_rewards/live");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Page({
    data: {
        videoList: [],
        playerType: "video",
        fitType: "contain",
        live_id: 0,
        live: {},
        animation: "",
        shopIocn: !0,
        needInitChat: !1,
        canvasStatus: !1,
        examineKeywords: {},
        msgHeight: ""
    },
    onLoadFun: function(e) {
        this.getLiveDetail(this.data.live_id), this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var t = this;
        (0, _common.getExamineKeywords)().then(function(e) {
            t.setData({
                examineKeywords: e.data
            }), _wxParse2.default.wxParse("page_content", "html", e.data.page_content, t, 0);
        }).catch(function(e) {});
    },
    getLiveDetail: function(e) {
        var a = this, n = this;
        (0, _live.getLiveDetail)(e).then(function(e) {
            var t = [];
            t.push({
                live: e.data
            });
            var i = a.controlVideoPlayer(t, 0);
            n.setData({
                videoList: i,
                live: e.data.live,
                liveLimit: e.data.liveLimit
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    getLivePlayerLives: function(i) {
        var a = this, n = this;
        (0, _live.getLivePlayerLives)(i).then(function(e) {
            var t = a.controlVideoPlayer(e.data.lives, i);
            console.log(555555, t), n.setData({
                videoList: t
            });
        });
    },
    controlVideoPlayer: function(e, i) {
        return 0 === e.length ? [] : (e.forEach(function(e, t) {
            e.video_is_player = i === t;
        }), e);
    },
    onHide: function() {
        this.setData({
            needInitChat: !0
        }), this.selectComponent("#scrollvideo").leaveRoom();
    },
    onShow: function() {
        1 == this.data.needInitChat && (this.setData({
            needInitChat: !1
        }), this.selectComponent("#scrollvideo").intoRoom());
    },
    onUnload: function() {
        this.selectComponent("#scrollvideo").leaveRoom();
    },
    onReady: function() {
        this.videoDom = this.selectComponent("#scrollvideo");
    },
    onLoad: function(e) {
        if (e.scene) {
            var t = _util2.default.getUrlParams(decodeURIComponent(e.scene));
            t.live_id && (e.live_id = t.live_id), t.spid && (app.globalData.spid = t.spid);
        }
        if (!e.live_id) return app.Tips({
            title: "缺少参数无法查看"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            live_id: e.live_id
        }), e.spid && (app.globalData.spid = e.spid);
    },
    swipeUpper: function(e) {
        var t = this;
        (0, _live.getNextLiveId)(this.data.live_id).then(function(e) {
            t.selectComponent("#scrollvideo").leaveRoom(), t.setData({
                live_id: e.data.live_id
            }), t.getLiveDetail(e.data.live_id);
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    swipeDown: function(e) {
        var t = this;
        (0, _live.getPreLiveId)(this.data.live_id).then(function(e) {
            t.selectComponent("#scrollvideo").leaveRoom(), t.setData({
                live_id: e.data.live_id
            }), t.getLiveDetail(e.data.live_id);
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    swipeToEnd: function(e) {
        var t = this;
        (0, _live.getPreLiveId)(this.data.live_id).then(function(e) {
            t.selectComponent("#scrollvideo").leaveRoom(), t.setData({
                live_id: e.data.live_id
            }), t.getLiveDetail(e.data.live_id);
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    swipeToStart: function(e) {
        var t = this;
        (0, _live.getNextLiveId)(this.data.live_id).then(function(e) {
            t.selectComponent("#scrollvideo").leaveRoom(), t.setData({
                live_id: e.data.live_id
            }), t.getLiveDetail(e.data.live_id);
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    sharePoster: function(e) {
        this.setData({
            canvasStatus: e.detail.canvasStatus
        });
    },
    onShopMsg: function() {
        var e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        e.translateY(0).step(), this.setData({
            animation: e.export()
        }), this.moreMsg();
    },
    onHideMsg: function() {
        var e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        e.translateY(1e3).step(), this.setData({
            animation: e.export(),
            shopIocn: !0
        });
    },
    moreMsg: function() {
        this.setData({
            msgList: this.data.msgList.concat(this.data.msgList),
            shopIocn: !1
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
    },
    onShareAppMessage: function() {
        return {
            title: this.data.live.title || "",
            imageUrl: this.data.live.cover,
            path: "/live/pages/live_room2/index?live_id=" + this.data.live_id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    }
});