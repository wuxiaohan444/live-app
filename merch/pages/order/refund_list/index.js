var _order = require("../../../../api/plugin/merch/order.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "退货/款",
            color: "black",
            class: "white"
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        orderList: [],
        orderStatus: 0,
        page: 1,
        limit: 10,
        isClose: !1,
        isAuto: !0,
        iShidden: !0,
        pay_close: !1
    },
    onLoadFun: function() {
        this.getOrderList();
    },
    onChangeFun: function(t) {
        t.detail;
    },
    getUserInfo: function(t) {
        function a() {
            return t.apply(this, arguments);
        }
        return a.toString = function() {
            return t.toString();
        }, a;
    }(function() {
        var e = this;
        getUserInfo().then(function(t) {
            var a = t.data;
            e.setData({
                userInfo: a
            });
        });
    }),
    onLoad: function(t) {
        this.setData({
            orderStatus: -3
        });
    },
    getOrderList: function() {
        var n = this;
        n.data.loadend || n.data.loading || (n.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _order.getOrderList)({
            status: n.data.orderStatus,
            page: n.data.page,
            limit: n.data.limit
        }).then(function(t) {
            var a = t.data || [], e = a.length < n.data.limit;
            n.data.orderList = app.SplitArray(a, n.data.orderList), n.setData({
                orderList: n.data.orderList,
                loadend: e,
                loading: !1,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: n.data.page + 1
            });
        }).catch(function(t) {
            n.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            loadend: !1,
            page: 1,
            orderList: []
        }), this.getOrderList();
    },
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getOrderList();
    },
    cancelOrderPop: function(t) {
        var a = t.currentTarget.dataset.order_id;
        this.setData({
            showCancelReason: !0,
            order_id: a
        });
    },
    cancelOrder: function(t) {
        var a = this, e = this.data.order_id, n = this.data.reasonIndex, i = this.data.cancelReason[n];
        wx.showLoading(), (0, _order.cancelOrder)(e, {
            reason: i
        }).then(function(t) {
            wx.hideLoading(), a.showCancelReason(), a.onShow();
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    },
    showCancelReason: function() {
        this.setData({
            showCancelReason: !this.data.showCancelReason
        });
    },
    onChangeCancelReason: function(t) {
        this.setData({
            reasonIndex: t.detail
        });
    },
    goOrderDetails: function(t) {
        var a = t.currentTarget.dataset.order_id;
        if (!a) return app.Tips({
            title: "缺少订单号无法查看订单详情"
        });
        wx.navigateTo({
            url: "/merch/pages/order/detail/index?order_id=" + a
        });
    }
});