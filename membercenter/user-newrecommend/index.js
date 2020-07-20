var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            navbar: "1",
            return: "0",
            title: "我的推荐人"
        },
        has_parent: !1,
        parent_uid: 0,
        parent: {}
    },
    onLoad: function(n) {},
    getCode: function(n) {
        this.setData({
            parent_uid: n.detail.value
        });
    },
    quxiao: function() {
        this.setData({
            shopDialog: !1
        });
    },
    onBang: function() {
        var t = this;
        this.data.parent_uid ? (0, _user.getParentInfo)(this.data.parent_uid, {
            noBind: 1
        }).then(function(n) {
            t.setData({
                userinfo: n.data.userinfo,
                shopDialog: !0
            });
        }).catch(function(n) {
            wx.hideLoading(), wx.showToast({
                title: n,
                icon: "none",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "请输入正确的上级ID",
            icon: "none",
            duration: 2e3
        });
    },
    onLoadFun: function() {
        var t = this;
        wx.showLoading(), (0, _user.getParentUid)({
            noBind: 1
        }).then(function(n) {
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
        (0, _user.storeParentUid)({
            noBind: 1,
            parent_uid: this.data.parent_uid
        }).then(function(n) {
            wx.reLaunch({
                url: "/common/pages/loading/loading"
            });
        }).catch(function(n) {
            wx.showToast({
                title: n,
                icon: "none",
                duration: 2e3
            });
        });
    }
});