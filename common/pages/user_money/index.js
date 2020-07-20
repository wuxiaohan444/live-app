var _user = require("../../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的账户",
            color: !1
        },
        userInfo: {},
        host_product: [],
        isClose: !1,
        recharge_switch: 0
    },
    onLoadFun: function() {
        this.getUserInfo(), this.get_host_product(), this.get_activity();
    },
    onLoad: function(t) {},
    getUserInfo: function() {
        var e = this;
        (0, _user.getUserInfo)().then(function(t) {
            e.setData({
                userInfo: t.data,
                recharge_switch: t.data.recharge_switch
            });
        });
    },
    get_activity: function() {
        var e = this;
        (0, _user.userActivity)().then(function(t) {
            e.setData({
                activity: t.data
            });
        });
    },
    get_host_product: function() {
        var e = this;
        getProductHot().then(function(t) {
            e.setData({
                host_product: t.data
            });
        });
    },
    onShow: function() {
        app.globalData.isLog && this.data.isClose && (this.getUserInfo(), this.get_host_product(), 
        this.get_activity());
    },
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    onReachBottom: function() {
        this.selectComponent("#recommend").getHostProduct();
    }
});