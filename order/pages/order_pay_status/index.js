var _order = require("../../../api/order.js"), _api = require("../../../api/api.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "支付成功"
        },
        orderId: "",
        order_pay_info: {
            paid: 1
        }
    },
    onLoadFun: function() {
        this.getOrderPayInfo();
    },
    onLoad: function(r) {
        if (!r.order_id) return app.Tips({
            title: "缺少参数无法查看订单支付状态"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            orderId: r.order_id,
            status: r.status || 0,
            msg: r.msg || ""
        });
    },
    getOrderPayInfo: function() {
        var e = this;
        wx.showLoading({
            title: "正在加载中"
        }), (0, _order.getOrderDetail)(this.data.orderId).then(function(r) {
            wx.hideLoading(), e.setData({
                order_pay_info: r.data,
                "parameter.title": r.data.paid ? "支付成功" : "支付失败"
            });
        }).catch(function(r) {
            wx.hideLoading();
        });
    },
    goIndex: function(r) {
        var e = r.detail.formId;
        (0, _api.setFormId)(e), wx.redirectTo({
            url: "/common/pages/index/index"
        });
    },
    goOrderDetails: function(r) {
        var e = r.detail.formId;
        (0, _api.setFormId)(e), wx.navigateTo({
            url: "/order/pages/order_details/index?order_id=" + this.data.orderId
        });
    }
});