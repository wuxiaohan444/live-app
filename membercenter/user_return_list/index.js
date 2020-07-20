var _order = require("../../api/order.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "退货列表",
            color: !1
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        orderList: [],
        orderStatus: -3,
        page: 1,
        limit: 10
    },
    onLoadFun: function() {
        this.getOrderList();
    },
    onLoad: function(t) {
        t.isT && this.setData({
            "parameter.return": 0
        });
    },
    goOrderDetails: function(t) {
        var a = t.currentTarget.dataset.order_id;
        if (!a) return app.Tips({
            title: "缺少订单号无法查看订单详情"
        });
        wx.navigateTo({
            url: "/order/pages/order_details/index?order_id=" + a + "&isReturen=1"
        });
    },
    getOrderList: function() {
        var r = this;
        r.data.loadend || r.data.loading || (r.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _order.getOrderList)({
            type: r.data.orderStatus,
            page: r.data.page,
            limit: r.data.limit
        }).then(function(t) {
            var a = t.data || [], e = a.length < r.data.limit;
            r.data.orderList = app.SplitArray(a, r.data.orderList), r.setData({
                orderList: r.data.orderList,
                loadend: e,
                loading: !1,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: r.data.page + 1
            });
        }).catch(function(t) {
            r.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getOrderList();
    }
});