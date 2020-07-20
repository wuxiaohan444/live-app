var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的推广",
            color: !0,
            class: "0"
        },
        userInfo: [],
        commission: [],
        yesterdayPrice: 0,
        isClone: !1
    },
    onLoadFun: function() {
        this.getUserInfo();
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        app.globalData.isLog && this.data.isClone && this.getUserInfo();
    },
    getUserInfo: function() {
        var o = this;
        (0, _user.getUserCommissionInfo)().then(function(n) {
            o.setData({
                userInfo: n.data.user,
                commission: n.data.commission
            });
        });
    },
    goPages: function(n) {
        wx.navigateTo({
            url: n.currentTarget.dataset.url
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
    onShareAppMessage: function() {}
});