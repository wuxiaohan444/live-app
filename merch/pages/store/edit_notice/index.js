var _store = require("../../../../api/plugin/merch/store.js"), app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            navbar: "1",
            return: "1",
            title: "店铺公告"
        }
    },
    onLoad: function(n) {},
    onLoadFun: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    formSubmit: function(n) {
        var o = n.detail.value;
        (0, _store.storeNotice)(o).then(function(n) {
            wx.navigateBack({});
        }).catch(function(n) {
            wx.hideLoading(), wx.showToast({
                title: n,
                icon: "none",
                duration: 2e3
            });
        });
    }
});