var _user = require("../../api/user.js"), _common = require("../../api/common"), app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "实名认证",
            color: !0,
            class: "red"
        },
        imgUrls: [],
        bastList: [],
        name: "",
        icon: "",
        type: 0,
        status: 0,
        certification: {},
        examineKeywords: {},
        statusBarHeight: app.globalData.statusBarHeight
    },
    onLoad: function(t) {
        this.getExamineKeywords();
    },
    onLoadFun: function() {
        var a = this;
        (0, _user.getCertification)().then(function(t) {
            a.setData({
                certification: t.data
            });
        });
    },
    getExamineKeywords: function() {
        var a = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            a.setData({
                examineKeywords: t.data
            });
        }).catch(function(t) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});