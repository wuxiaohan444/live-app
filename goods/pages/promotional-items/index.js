var _goods = require("../../../api/goods.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "热卖促销"
        }
    },
    onLoad: function(t) {
        var a = app.globalData.deviceType, n = app.globalData.statusBarHeight;
        this.setData({
            iphoneX: a,
            statusBarHeight: n
        }), this.getIndexGroomList();
    },
    getIndexGroomList: function() {
        var a = this;
        (0, _goods.getActivityGoods)(4).then(function(t) {
            a.setData({
                banners: t.data.banners,
                bastList: t.data.list
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});