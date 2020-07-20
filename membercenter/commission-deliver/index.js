var _spread = require("../../api/spread"), _order = require("../../api/order"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "发货",
            color: "black",
            class: "white"
        },
        express: {},
        delivery_id: "",
        express_id: 0,
        express_index: -1,
        express_name: "",
        order: "",
        order_id: ""
    },
    onLoadFun: function() {
        this.commissionGoodsOrderDetail(), this.getExpress();
    },
    onLoad: function(e) {
        this.setData({
            order_id: e.order_id
        });
    },
    getExpress: function() {
        var r = this;
        (0, _order.getExpressList)().then(function(e) {
            r.setData({
                express: e.data
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: "/membercenter/user_spread_user/index"
            });
        });
    },
    commissionGoodsOrderDetail: function() {
        var r = this;
        (0, _spread.commissionGoodsOrderDetail)(this.data.order_id).then(function(e) {
            r.setData({
                order: e.data.order
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: "membercenter/ship-order/index"
            });
        });
    },
    submit: function() {
        var e = this.data.delivery_id, r = this.data.express_id;
        if (!r) return app.Tips({
            title: "请选择物流公司"
        });
        if (!e) return app.Tips({
            title: "请填写物流单号"
        });
        var t = {
            delivery_id: e,
            express_id: r
        };
        (0, _spread.commissionGoodsOrderDeliver)(this.data.order_id, t).then(function(e) {
            return app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: "/membercenter/user_spread_user/index"
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            }, {
                tab: 5,
                url: "/membercenter/user_spread_user/index"
            });
        });
    },
    bindSetDeliveryId: function(e) {
        this.setData({
            delivery_id: e.detail.value
        });
    },
    bindExpressChange: function(e) {
        var r = e.detail.value;
        this.setData({
            express_index: e.detail.value,
            express_id: this.data.express[r].id,
            express_name: this.data.express[r].name
        });
    },
    scanDeliver: function(e) {
        var r = this;
        wx.scanCode({
            scanType: [ "barCode" ],
            success: function(e) {
                r.setData({
                    delivery_id: e.result
                });
            }
        });
    }
});