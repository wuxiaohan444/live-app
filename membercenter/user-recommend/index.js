var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的推荐人"
        },
        has_parent: !0,
        parent: {}
    },
    onLoad: function(n) {},
    onLoadFun: function() {
        var t = this;
        wx.showLoading(), (0, _user.getParentUid)().then(function(n) {
            t.setData({
                has_parent: n.data.has_parent,
                parent: n.data.parent
            }), wx.hideLoading();
        }).catch(function(n) {
            wx.hideLoading(), wx.showToast({
                title: n,
                icon: "none",
                duration: 2e3
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    formSubmit: function(n) {
        var t = n.detail.value, a = this;
        (0, _user.storeParentUid)(t).then(function(n) {
            a.setData({
                has_parent: n.data.has_parent,
                parent: n.data.parent
            });
        }).catch(function(n) {
            wx.hideLoading(), wx.showToast({
                title: n,
                icon: "none",
                duration: 2e3
            });
        });
    }
});