var _order = require("../../../../api/plugin/merch/order.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util), _api = require("../../../../api/api");

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
            title: "订单修改地址",
            color: "black",
            class: "white"
        },
        result_pay_price: 0,
        result_postage_price: 0,
        total_price: 0,
        result_price: 0,
        order: "",
        order_id: "",
        region: [ "省", "市", "区" ],
        cartId: "",
        pinkId: 0,
        couponId: 0,
        id: 0
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
        var r = this;
        (0, _order.getOrderDetail)(this.data.order_id).then(function(e) {
            var t = e.data.user_address.split(" ");
            r.setData({
                order: e.data,
                address_info: t[3],
                region: t
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
            var i = parseFloat(this.data.result_postage_price) + r;
            this.setData({
                result_pay_price: r,
                result_price: i
            });
        }
        if ("pay_postage" == t) {
            i = parseFloat(this.data.result_pay_price) + r;
            this.setData({
                result_postage_price: r,
                result_price: i
            });
        }
    },
    payPriceBlur: function(e) {
        if ((parseFloat(e.detail.value) || 0) <= 0) return this.setData({
            result_pay_price: this.data.order.pay_price
        }), app.Tips({
            title: "支付价格不能小于0"
        });
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
        }, t = getCurrentPages(), r = t[t.length - 2], i = r.data.order_id, a = "/" + r.route + "?order_id=" + i;
        changeOrderPrice(this.data.order_id, e).then(function(e) {
            return app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: a
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: a
            });
        });
    },
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        });
    },
    formSubmit: function(e) {
        var t = this, r = e.detail.value;
        if (!r.realname) return app.Tips({
            title: "请填写收货人姓名"
        });
        if (!r.mobile) return app.Tips({
            title: "请填写联系电话"
        });
        if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(r.mobile)) return app.Tips({
            title: "请输入正确的手机号码"
        });
        if ("省" == t.data.region[0]) return app.Tips({
            title: "请选择所在地区"
        });
        if (!r.address_info) return app.Tips({
            title: "请填写详细地址"
        });
        r.address = {
            province: t.data.region[0],
            city: t.data.region[1],
            district: t.data.region[2]
        };
        var i = getCurrentPages(), a = "/" + i[i.length - 2].route;
        (0, _order.changeOrderAddress)(this.data.order_id, r).then(function(e) {
            return a += "?order_id=" + e.data.order_id, app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: a
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    }
});