var _goods = require("../../../api/goods.js"), _user = require("../../../api/user.js"), app = getApp();

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
        recharge_switch: 0,
        balance_withdraw: 0
    },
    onLoadFun: function() {
        this.getUserInfo(), this.get_hot_goods();
    },
    onLoad: function(t) {},
    getUserInfo: function() {
        var o = this;
        (0, _user.getUserInfo)().then(function(t) {
            o.setData({
                userInfo: t.data,
                recharge_switch: t.data.recharge_switch,
                balance_withdraw: t.data.balance_withdraw
            });
        });
    },
    get_activity: function() {
        var o = this;
        userActivity().then(function(t) {
            o.setData({
                activity: t.data
            });
        });
    },
    get_hot_goods: function() {
        var o = this;
        (0, _goods.getHotGoods)().then(function(t) {
            o.setData({
                host_product: t.data
            });
        });
    },
    onShow: function() {},
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    onReachBottom: function() {
        this.get_hot_goods(), this.selectComponent("#recommend").getHostProduct();
    }
});