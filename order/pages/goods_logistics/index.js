var _order = require("../../../api/order.js"), _goods = require("../../../api/goods.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "物流信息"
        },
        orderId: "",
        product: {
            productInfo: {}
        },
        orderInfo: {},
        expressList: []
    },
    onLoadFun: function() {
        this.getExpress(), this.get_host_product();
    },
    copyOrderId: function() {
        wx.setClipboardData({
            data: this.data.orderInfo.delivery_id
        });
    },
    getExpress: function() {
        var e = this;
        (0, _order.express)(e.data.orderId).then(function(t) {
            var o = t.data.express.result || {};
            e.setData({
                product: t.data.order.cartInfo[0] || {},
                orderInfo: t.data.order,
                expressList: o.list || []
            });
        });
    },
    get_host_product: function() {
        var o = this;
        (0, _goods.getHotGoods)().then(function(t) {
            o.setData({
                host_product: t.data
            });
        });
    },
    onLoad: function(t) {
        if (!t.orderId) return app.Tips({
            title: "缺少订单号"
        });
        this.setData({
            orderId: t.orderId
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.selectComponent("#recommend").getHostProduct();
    },
    onShareAppMessage: function() {}
});