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
            title: "订单管理",
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
        pay_close: !1,
        order_id: "",
        totalPrice: "0",
        active: 0,
        reasonIndex: 0,
        showCancelReason: !1,
        cancelReason: [ "其他", "未及时付款", "买家不想买", "买家拍错了", "买家信息填写错误重新拍", "缺货", "同城见面交易", "恶意买家/同行捣乱" ],
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
            name: "已完成",
            status: 4
        }, {
            name: "已关闭",
            status: -99
        } ]
    },
    onLoadFun: function() {
        this.getOrderList();
    },
    onChangeFun: function(t) {
        var a = t.detail, e = a.action || null, n = null != a.value ? a.value : null;
        e && this[e] && this[e](n);
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

              case "4":
                a = 5;
                break;

              case "-99":
                a = 6;
            }
            this.setData({
                orderStatus: t.status,
                active: a
            });
        } else this.setData({
            orderStatus: "all",
            active: 0
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