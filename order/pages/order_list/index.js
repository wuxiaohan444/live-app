var _order = require("../../../api/order.js"), _user = require("../../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的订单",
            color: !0,
            class: "0"
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        orderList: [],
        orderData: {},
        orderStatus: 0,
        page: 1,
        limit: 10,
        isClose: !1,
        payMode: [ {
            name: "微信支付",
            icon: "icon-weixinzhifu",
            value: "weixin",
            title: "微信快捷支付"
        } ],
        pay_close: !1,
        pay_order_id: "",
        totalPrice: "0"
    },
    onLoadFun: function() {
        this.getOrderData(), this.getOrderList(), this.getUserInfo();
    },
    onChangeFun: function(t) {
        var a = t.detail, e = a.action || null, r = null != a.value ? a.value : null;
        e && this[e] && this[e](r);
    },
    getUserInfo: function() {
        var a = this;
        (0, _user.getUserInfo)().then(function(t) {
            a.setData({
                payMode: a.data.payMode
            });
        });
    },
    pay_close: function() {
        this.setData({
            pay_close: !1
        });
    },
    onLoad: function(t) {
        t.status && this.setData({
            orderStatus: t.status
        }), this.setData({
            "parameter.return": t.is_return ? "0" : "1"
        });
    },
    getOrderData: function() {
        var a = this;
        (0, _order.orderData)().then(function(t) {
            a.setData({
                orderData: t.data
            });
        });
    },
    cancelOrder: function(t) {
        var a = t.currentTarget.dataset.order_id, e = t.currentTarget.dataset.index, r = this;
        if (!a) return app.Tips({
            title: "缺少订单号无法取消订单"
        });
        (0, _order.orderCancel)(a).then(function(t) {
            return app.Tips({
                title: t.msg,
                icon: "success"
            }, function() {
                r.data.orderList.splice(e, 1), r.setData({
                    orderList: r.data.orderList,
                    "orderData.unpaid_count": r.data.orderData.unpaid_count - 1
                }), r.getOrderData();
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    goPay: function(t) {
        var a = t.currentTarget.dataset.order_id, e = t.currentTarget.dataset.pay_price;
        this.setData({
            pay_close: !0,
            pay_order_id: a,
            totalPrice: e
        });
    },
    pay_complete: function() {
        this.setData({
            loadend: !1,
            page: 1,
            orderList: [],
            pay_close: !1,
            pay_order_id: ""
        }), this.getOrderData(), this.getOrderList();
    },
    pay_fail: function() {
        this.setData({
            pay_close: !1,
            pay_order_id: ""
        });
    },
    goOrderDetails: function(t) {
        var a = t.currentTarget.dataset.order_id;
        if (!a) return app.Tips({
            title: "缺少订单号无法查看订单详情"
        });
        wx.navigateTo({
            url: "/order/pages/order_details/index?order_id=" + a
        });
    },
    statusClick: function(t) {
        var a = t.currentTarget.dataset.status;
        a != this.data.orderStatus && (this.setData({
            orderStatus: a,
            loadend: !1,
            page: 1,
            orderList: []
        }), this.getOrderList());
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
    delOrder: function(t) {
        var a = t.currentTarget.dataset.order_id, e = t.currentTarget.dataset.index, r = this;
        (0, _order.orderDel)(a).then(function(t) {
            return r.data.orderList.splice(e, 1), r.setData({
                orderList: r.data.orderList,
                "orderData.unpaid_count": r.data.orderData.unpaid_count - 1
            }), r.getOrderData(), app.Tips({
                title: "删除成功",
                icon: "success"
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        app.globalData.isLog && this.data.isClose && (this.getOrderData(), this.setData({
            loadend: !1,
            page: 1,
            orderList: []
        }), this.getOrderList());
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
    }
});