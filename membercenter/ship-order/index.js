var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的发货订单",
            color: !0,
            class: "0"
        },
        orderCount: 0,
        orderLists: [],
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        limit: 20,
        page: 1
    },
    onLoadFun: function(a) {
        this.commissionGoodsOrder();
    },
    commissionGoodsOrder: function() {
        var o = this;
        o.data.loadend || o.data.loading || (o.setData({
            loading: !0,
            loadTitle: ""
        }), wx.showLoading(), (0, _user.commissionGoodsOrder)({
            page: o.data.page
        }).then(function(a) {
            var t = a.data.orderLists || [], e = t.length < a.data.limit;
            o.data.orderLists = app.SplitArray(t, o.data.orderLists), o.setData({
                orderCount: a.data.orderCount,
                orderLists: o.data.orderLists,
                loadend: e,
                limit: a.data.limit,
                loading: !1,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: o.data.page + 1
            }), wx.hideLoading();
        }).catch(function(a) {
            return app.Tips({
                title: a
            }, {
                tab: 5,
                url: "/membercenter/user_spread_user/index"
            });
        }));
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});