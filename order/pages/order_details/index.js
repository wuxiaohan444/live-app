var _order = require("../../../api/order.js"), _user = require("../../../api/user.js"), _dialog = require("../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _order2 = require("../../../api/order");

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
        payMode: [ {
            name: "微信支付",
            icon: "icon-weixinzhifu",
            value: "weixin",
            title: "微信快捷支付"
        } ],
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
        userInfo: {}
    },
    onLoad: function(t) {
        t.order_id && this.setData({
            order_id: t.order_id
        }), t.isReturen && (this.setData({
            "parameter.class": "2",
            isGoodsReturn: !0
        }), this.selectComponent("#navbar").setClass());
    },
    onChangeFun: function(t) {
        var e = t.detail, a = e.action || null, r = null != e.value ? e.value : null;
        a && this[a] && this[a](r);
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
    pay_complete: function() {
        this.setData({
            pay_close: !1,
            pay_order_id: ""
        }), this.getOrderInfo();
    },
    pay_fail: function() {
        this.setData({
            pay_close: !1,
            pay_order_id: ""
        });
    },
    onLoadFun: function() {
        this.getOrderInfo(), this.getUserInfo();
    },
    getUserInfo: function() {
        var e = this;
        (0, _user.getUserInfo)().then(function(t) {
            e.setData({
                userInfo: t.data
            });
        });
    },
    getOrderInfo: function() {
        var a = this;
        wx.showLoading({
            title: "正在加载中"
        }), (0, _order.getOrderDetail)(this.data.order_id).then(function(t) {
            console.log(t);
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
            }, "/membercenter/order_list/index");
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
    copyData: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.content
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
        }, a = {}, r = parseInt(e._type), i = t.combination_id, n = t.delivery_type, o = t.seckill_id ? parseInt(t.seckill_id) : 0, s = t.bargain_id ? parseInt(t.bargain_id) : 0;
        i = t.combination_id ? parseInt(t.combination_id) : 0;
        a = {
            type: 9 == r ? -9 : r,
            class_status: 0
        }, 1 == r && 0 < i && (a.class_status = 1), 2 == r && "express" == n && (a.class_status = 2), 
        2 == r && (a.class_status = 3), 4 != r && 0 != r || (a.class_status = 4), o || s || i || 3 != r && 4 != r || (a.class_status = 5), 
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
        (0, _order.orderAgain)(this.data.orderInfo.order_id).then(function(t) {
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
            (0, _order.orderTake)(e.data.order_id).then(function(t) {
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
        (0, _order.orderDel)(this.data.order_id).then(function(t) {
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
    }
});