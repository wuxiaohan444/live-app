var _goods = require("../../../api/goods.js"), app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "抢先好货"
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
    onLoad: function(t) {
        var a = app.globalData.deviceType, n = app.globalData.statusBarHeight;
        this.setData({
            type: t.type,
            iphoneX: a,
            statusBarHeight: n
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this.data.type;
        1 == t ? this.setData({
            "parameter.title": "精选商品",
            name: "精选商品",
            icon: "icon-jingpintuijian"
        }) : 2 == t ? this.setData({
            "parameter.title": "热门榜单",
            name: "热门榜单",
            icon: "icon-remen",
            status: 1
        }) : 3 == t ? this.setData({
            "parameter.title": "抢先好货",
            name: "抢先好货",
            icon: "icon-xinpin"
        }) : 4 == t ? this.setData({
            "parameter.title": "热卖促销",
            name: "热卖促销",
            icon: "icon-cuxiaoguanli"
        }) : this.setData({
            "parameter.title": "抢先好货",
            name: "抢先好货",
            icon: "icon-xinpin"
        }), this.getIndexGroomList();
    },
    getIndexGroomList: function() {
        var a = this, t = a.data.type;
        (0, _goods.getActivityGoods)(t).then(function(t) {
            a.setData({
                banners: t.data.banners,
                bastList: t.data.list
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});