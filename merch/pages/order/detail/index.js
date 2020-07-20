var _order = require("../../../../api/plugin/merch/order.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _order2 = require("../../../../api/plugin/merch/order");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "订单详情"
        },
        order_id: "",
        evaluate: 0,
        cartInfo: [],
        orderInfo: {},
        isGoodsReturn: !1,
        status: {},
        isClose: !1,
        pay_close: !1,
        pay_order_id: "",
        totalPrice: "0",
        steps: [ {
            text: "待付款",
            desc: ""
        }, {
            text: "待发货",
            desc: ""
        }, {
            text: "待收货",
            desc: ""
        }, {
            text: "待评价",
            desc: ""
        }, {
            text: "已完成",
            desc: ""
        } ],
        active: 0,
        userInfo: {},
        reasonIndex: 0,
        showCancelReason: !1,
        cancelReason: [ "其他", "未及时付款", "买家不想买", "买家拍错了", "买家信息填写错误重新拍", "缺货", "同城见面交易", "恶意买家/同行捣乱" ]
    },
    onLoad: function(t) {
        t.order_id && this.setData({
            order_id: t.order_id
        });
    },
    onChangeFun: function(t) {
        var e = t.detail, a = e.action || null, n = null != e.value ? e.value : null;
        a && this[a] && this[a](n);
    },
    pay_close: function() {
        this.setData({
            pay_close: !1
        });
    },
    pay_open: function() {
        this.setData({
            pay_close: !0,
            pay_order_id: this.data.orderInfo.order_id,
            totalPrice: this.data.orderInfo.pay_price
        });
    },
    onLoadFun: function() {
        this.getOrderInfo();
    },
    getUserInfo: function(t) {
        function e() {
            return t.apply(this, arguments);
        }
        return e.toString = function() {
            return t.toString();
        }, e;
    }(function() {
        var e = this;
        getUserInfo().then(function(t) {
            e.setData({
                userInfo: t.data
            });
        });
    }),
    getOrderInfo: function() {
        var a = this;
        wx.showLoading({
            title: "正在加载中"
        }), (0, _order.getOrderDetail)(this.data.order_id).then(function(t) {
            var e = t.data._status._type;
            wx.hideLoading(), a.setData({
                orderInfo: t.data,
                active: a.getActiveByType(e),
                cartInfo: t.data.cartInfo,
                evaluate: 3 == e ? 3 : 0
            }), a.getOrderStatus();
        }).catch(function(t) {
            wx.hideLoading(), app.Tips({
                title: t
            }, "/merch/pages/order/list/index");
        });
    },
    getActiveByType: function(t) {
        return 0 == t || -9 == t ? 0 : t;
    },
    call: function(t) {
        var e = t.currentTarget.dataset.phone;
        e && wx.makePhoneCall({
            phoneNumber: e
        });
    },
    copy: function() {
        wx.setClipboardData({
            data: this.data.orderInfo.order_id
        });
    },
    copyAddress: function() {
        var t = this.data.orderInfo.real_name + " " + this.data.orderInfo.user_phone;
        t += "\n" + this.data.orderInfo.user_address, wx.setClipboardData({
            data: t
        });
    },
    goTel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.orderInfo.delivery_id
        });
    },
    getOrderStatus: function() {
        var t = this.data.orderInfo || {}, e = t._status || {
            _type: 0
        }, a = {}, n = parseInt(e._type), r = t.combination_id, o = t.delivery_type, i = t.seckill_id ? parseInt(t.seckill_id) : 0, s = t.bargain_id ? parseInt(t.bargain_id) : 0;
        r = t.combination_id ? parseInt(t.combination_id) : 0;
        a = {
            type: 9 == n ? -9 : n,
            class_status: 0
        }, 1 == n && 0 < r && (a.class_status = 1), 2 == n && "express" == o && (a.class_status = 2), 
        2 == n && (a.class_status = 3), 4 != n && 0 != n || (a.class_status = 4), i || s || r || 3 != n && 4 != n || (a.class_status = 5), 
        this.setData({
            status: a
        });
    },
    goJoinPink: function() {
        wx.navigateTo({
            url: "/pages/activity/goods_combination_status/index?id=" + this.data.orderInfo.pink_id
        });
    },
    goOrderConfirm: function() {
        orderAgain(this.data.orderInfo.order_id).then(function(t) {
            return wx.navigateTo({
                url: "/order/pages/order_confirm/index?cartId=" + t.data.cateId
            });
        });
    },
    confirmOrder: function() {
        var e = this;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: "为保障权益，请收到货确认无误后，再确认收货?",
            cancelButtonText: "再检查检查",
            confirmButtonText: "确认收货"
        }).then(function() {
            orderTake(e.data.order_id).then(function(t) {
                return app.Tips({
                    title: "操作成功",
                    icon: "success"
                }, function() {
                    e.getOrderInfo();
                });
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function() {});
    },
    delOrder: function() {
        orderDel(this.data.order_id).then(function(t) {
            return app.Tips({
                title: "删除成功",
                icon: "success"
            }, {
                tab: 3,
                url: 1
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    onShow: function() {
        app.globalData.isLog && this.data.isClose && this.getOrderInfo();
    },
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    cancelOrderPop: function(t) {
        var e = t.currentTarget.dataset.order_id;
        this.setData({
            showCancelReason: !0,
            order_id: e
        });
    },
    cancelOrder: function(t) {
        var e = this, a = this.data.order_id, n = this.data.reasonIndex, r = this.data.cancelReason[n];
        wx.showLoading(), (0, _order.cancelOrder)(a, {
            reason: r
        }).then(function(t) {
            wx.hideLoading(), e.showCancelReason(), e.onShow();
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
    previewRefundImage: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.previewImage({
            urls: this.data.orderInfo.refund_reason_wap_img,
            current: e,
            fail: function() {
                wx.showToast({
                    title: "预览图片失败",
                    icon: "none"
                });
            }
        });
    },
    refundConfirm: function(t) {
        var e = this, a = this;
        _dialog2.default.confirm({
            title: "",
            message: "同意退款后，款项将退回给买家",
            confirmButtonText: "同意退款",
            cancelButtonText: "暂不处理"
        }).then(function() {
            (0, _order.refundOrder)(e.data.order_id, {}).then(function(t) {
                return a.getOrderInfo(), app.Tips({
                    title: t.msg
                });
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function() {});
    }
});