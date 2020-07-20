var _goods = require("../../../api/goods.js"), app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "标签商品"
        },
        imgUrls: [],
        bastList: [],
        name: "",
        icon: "",
        type: 0,
        status: 0
    },
    navigateBack: function() {
        wx.navigateBack();
    },
    onLoad: function(a) {
        var t = app.globalData.deviceType, n = app.globalData.statusBarHeight;
        this.setData({
            tag: a.tag,
            iphoneX: t,
            statusBarHeight: n
        });
    },
    onReady: function() {},
    onShow: function() {
        this.data.tag;
        this.getTagGoods();
    },
    getTagGoods: function() {
        var t = this, n = this, a = n.data.tag;
        (0, _goods.getTagGoods)(a).then(function(a) {
            t.setData({
                taginfo: a.data.tag_info
            }), n.setData({
                banners: a.data.banners,
                bastList: a.data.list
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});