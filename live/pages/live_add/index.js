var _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse"),
    _wxParse2 = _interopRequireDefault(_wxParse), _live = require("../../../api/live.js"),
    _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        uploadImg: "",
        live_cover: "",
        limit_type: "0",
        placeholder: "好的标题能吸引更多粉丝哦！",
        title: "",
        isUpload: !1,
        textareaValue: "",
        lat: "",
        lng: "",
        examineKeywords: {},
        isInput: !1,
        channelShow: true,
        fee_days: '',
        feeShow: true,
        channelText: '选择频道 》',
        channel_type: '',
    },
    onLoadFun: function (t) {
        var i = this;
        wx.showLoading(), this.getExamineKeywords(), (0, _live.getAnchorLiveInfo)().then(function (t) {
            console.log(t);
            var date = i.getMyDate();
            if (date !== t.data.live.last_day && t.data.live.fee_days == 0) {
                i.setData({
                    feeShow: false
                })
            }
            1 == t.data.config.open_location && wx.getLocation({
                type: "wgs84",
                success: function (t) {
                    var e = t.latitude, a = t.longitude;
                    i.setData({
                        lat: e,
                        lng: a
                    });
                }
            }),

                i.setData({
                    fee_days: t.data.live.fee_days,
                    live_cover: t.data.live.cover,
                    title: t.data.live.title,
                    limit_type: t.data.live.limit_type + "",
                    placeholder: t.data.live.title
                }), t.data.live.title || i.setData({
                placeholder: "好的标题能吸引更多粉丝哦！"
            }),
                wx.hideLoading();
        }).catch(function (t) {
            return wx.hideLoading(), app.Tips({
                title: t
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
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
    onLoad: function () {
    },
    onReady: function () {
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            winW: app.globalData.winWidth,
            screenTotalH: app.globalData.screenTotalH
        });
    },
    onInputChange: function (t) {
        this.setData({
            placeholder: t.detail.value,
            title: t.detail.value
        });
    },
    getInput: function () {
        this.setData({
            isInput: !0
        });
    },
    closeInput: function () {
        this.setData({
            isInput: !1
        });
    },
    liveBack: function () {
        1 < getCurrentPages().length ? wx.navigateBack() : wx.reLaunch({
            url: "/common/pages/index/index"
        });
    },
    getShowNotice: function () {
        this.setData({
            showNotice: !this.data.showNotice
        });
    },
    onShow: function () {
    },
    uploadpic: function () {
        var e = this;
        _util2.default.uploadImageOne("common/upload/image", function (t) {
            console.log(t), t.data.url ? e.setData({
                isUpload: !0,
                live_cover: t.data.url
            }) : e.setData({
                isUpload: !1
            });
        });
    },
    goLivePush: function () {
        let that = this;
        that.data.live_cover ? that.data.title ? (0, _live.liveStart)({
            live_cover: that.data.live_cover,
            limit_type: that.data.limit_type,
            title: that.data.title,
            channel_type: that.data.channel_type,
            lat: that.data.lat,
            lng: that.data.lng
        }).then(function (t) {
            200 == t.status ? wx.showModal({
                title: '提示',
                content: '是否添加商品',
                success(res) {
                    if (res.confirm) {
                        wx.reLaunch({
                            url: "/live/pages/anchor-goods/index?add=1"
                        })
                    } else if (res.cancel) {
                        wx.reLaunch({
                            url: "/live/pages/live_push/index"
                        })
                    }
                }
            }) : wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
            });
        }).catch(function (t) {
            wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "请输入" + this.data.examineKeywords.keywords_live + "标题",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请上传封面",
            icon: "none",
            duration: 2e3
        });

    },
    textareaValue: function (t) {
        console.log(t), this.setData({
            title: t.detail.value
        });
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onChangeLimitType: function (t) {
        var e = t.detail;
        this.setData({
            limit_type: e
        });
    },
    // 获取日期
    getMyDate() {
        var date = new Date();
        var seperator1 = "_";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },

    closeChannel: function () {
        this.setData({
            channelShow: true
        })
    },
    chooseChannelShow: function () {
        this.setData({
            channelShow: false
        })
    },
    chooseChannel(e) {
        var text = e.currentTarget.dataset.text;
        var type = e.currentTarget.dataset.type;
        this.setData({
            channelShow: true,
            channelText: text,
            channel_type: type
        })
    },
    // 立即充值
    goRecharge() {
        wx.redirectTo({url: "/membercenter/balance/new-recharge/index"});
    }
});