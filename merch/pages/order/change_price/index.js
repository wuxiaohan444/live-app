var _order = require("../../../../api/plugin/merch/order.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "订单改价",
            color: "black",
            class: "white"
        },
        result_pay_price: 0,
        result_postage_price: 0,
        total_price: 0,
        result_price: 0,
        order: "",
        order_id: ""
    },
    onLoadFun: function() {
        this.getOrderDetail();
    },
    onLoad: function(e) {
        this.setData({
            order_id: e.order_id
        });
    },
    getOrderDetail: function() {
        var t = this;
        (0, _order.getOrderDetail)(this.data.order_id).then(function(e) {
            t.setData({
                order: e.data,
                result_goods_price: parseFloat(e.data.pay_price) - parseFloat(e.data.pay_postage),
                result_postage_price: e.data.pay_postage,
                result_price: parseFloat(e.data.pay_price)
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: "/merch/pages/order/list/index"
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    changePrice: function(e) {
        var t = e.currentTarget.dataset.column, r = parseFloat(e.detail.value) || 0;
        if ("pay_price" == t) {
            var a = r;
            this.setData({
                result_pay_price: r,
                result_price: a,
                result_goods_price: r - parseFloat(this.data.result_postage_price)
            });
        }
        if ("pay_postage" == t) {
            a = parseFloat(this.data.result_pay_price);
            this.setData({
                result_postage_price: r,
                result_price: a,
                result_goods_price: a - parseFloat(this.data.result_postage_price)
            });
        }
    },
    payPriceBlur: function(e) {
        var t = parseFloat(e.detail.value) || 0;
        return t <= 0 ? (this.setData({
            result_pay_price: this.data.order.pay_price
        }), app.Tips({
            title: "支付价格不能小于0"
        })) : t <= this.data.result_postage_price ? (this.setData({
            result_pay_price: this.data.order.pay_price
        }), app.Tips({
            title: "实际支付不能小于运费"
        })) : void 0;
    },
    previewImage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ t ],
            current: t,
            fail: function() {
                wx.showToast({
                    title: "预览图片失败",
                    icon: "none"
                });
            }
        });
    },
    submit: function() {
        var e = {
            pay_price: this.data.result_pay_price,
            pay_postage: this.data.result_postage_price
        }, t = getCurrentPages(), r = "/" + t[t.length - 2].route;
        (0, _order.changeOrderPrice)(this.data.order_id, e).then(function(e) {
            return r += "?order_id=" + e.data.order_id, app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: r
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: r
            });
        });
    }
});