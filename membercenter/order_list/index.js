var _order = require("../../api/order.js"), _user = require("../../api/user.js"), _common = require("../../api/common"), _dialog = require("../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog);

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
            title: "我的订单",
            color: !0,
            class: "red"
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
        payModes: {
            1: {
                name: "微信支付",
                icon: "icon-weixinzhifu",
                value: "weixin",
                title: "微信快捷支付"
            },
            2: {
                name: "余额支付",
                icon: "icon-yuezhifu",
                value: "yue",
                title: "可用余额:",
                number: 0
            }
        },
        payMode: [],
        isAuto: !0,
        iShidden: !0,
        pay_close: !1,
        pay_order_id: "",
        totalPrice: "0",
        active: 0,
        orderTabs: [ {
            name: "全部",
            status: "all"
        }, {
            name: "待付款",
            status: 0
        }, {
            name: "待发货",
            status: 1
        }, {
            name: "待收货",
            status: 2
        }, {
            name: "待评价",
            status: 3
        }, {
            name: "退款/售后",
            status: -3
        } ]
    },
    onLoadFun: function() {
        this.getOrderData(), this.getOrderList(), this.getUserInfo();
    },
    onChangeFun: function(t) {
        var a = t.detail, e = a.action || null, r = null != a.value ? a.value : null;
        e && this[e] && this[e](r);
    },
    getUserInfo: function() {
        var e = this;
        (0, _user.getUserInfo)().then(function(t) {
            var a = t.data;
            e.setData({
                userInfo: a
            });
        });
    },
    pay_close: function() {
        this.setData({
            pay_close: !1
        });
    },
    onLoad: function(t) {
        if (t.status) {
            var a = 0;
            switch (t.status) {
              case "all":
                a = 0;

              case "0":
                a = 1;
                break;

              case "1":
                a = 2;
                break;

              case "2":
                a = 3;
                break;

              case "3":
                a = 4;
                break;

              case "-3":
                a = 5;
            }
            this.setData({
                orderStatus: t.status,
                active: a
            });
        } else this.setData({
            orderStatus: "all",
            active: 0
        });
        this.setData({
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
    cancelOrder: function(r) {
        var i = this;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: "确定关闭该订单吗?",
            cancelButtonText: "再考虑下",
            confirmButtonText: "取消订单"
        }).then(function() {
            var t = r.currentTarget.dataset.order_id, a = r.currentTarget.dataset.index, e = i;
            if (!t) return app.Tips({
                title: "缺少订单号无法取消订单"
            });
            (0, _order.orderCancel)(t).then(function(t) {
                return app.Tips({
                    title: t.msg,
                    icon: "success"
                }, function() {
                    e.data.orderList.splice(a, 1), e.setData({
                        orderList: e.data.orderList,
                        "orderData.unpaid_count": e.data.orderData.unpaid_count - 1
                    }), e.getOrderData();
                });
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function() {});
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
        var a = this.data.orderTabs[t.detail.index].status;
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
    },
    onSearch: function(t) {
        var a = t.detail;
        a && wx.navigateTo({
            url: "/goods/pages/goods_search/index?keywords=" + a
        });
    }
});