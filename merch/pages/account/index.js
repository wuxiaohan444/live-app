var _store = require("../../../api/plugin/merch/store.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "账户提现",
            color: !0,
            class: "0"
        },
        loading: !1,
        loadend: !1,
        store: {}
    },
    onLoadFun: function() {
        this.getInfo();
    },
    getInfo: function() {
        var o = this;
        (0, _store.getInfo)().then(function(n) {
            o.setData({
                store: n.data
            });
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});