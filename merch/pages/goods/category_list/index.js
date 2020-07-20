var _user = require("../../../../api/plugin/merch/user.js"), app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "全部分类"
        },
        category: 0,
        from: "",
        list: []
    },
    onLoad: function(t) {
        var n = this, a = t.store_id;
        this.setData({
            store_id: a
        }), (0, _user.goodsCategoryList)(a).then(function(t) {
            n.setData({
                list: t.data
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