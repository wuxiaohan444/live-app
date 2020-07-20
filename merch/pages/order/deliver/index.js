var _order = require("../../../../api/plugin/merch/order.js"), _order2 = require("../../../../api/order"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

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
        this.getOrderDetail(), this.getExpress();
    },
    onLoad: function(e) {
        this.setData({
            order_id: e.order_id
        });
    },
    getExpress: function() {
        var t = this;
        (0, _order2.getExpressList)().then(function(e) {
            t.setData({
                express: e.data
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
    getOrderDetail: function() {
        var t = this;
        (0, _order.getOrderDetail)(this.data.order_id).then(function(e) {
            t.setData({
                order: e.data
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
    submit: function() {
        var e = this.data.delivery_id, t = this.data.express_id;
        if (!t) return app.Tips({
            title: "请选择物流公司"
        });
        if (!e) return app.Tips({
            title: "请填写物流单号"
        });
        var r = {
            delivery_id: e,
            express_id: t
        };
        (0, _order.orderDeliver)(this.data.order_id, r).then(function(e) {
            return app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: "/merch/pages/order/list/index"
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
    bindSetDeliveryId: function(e) {
        this.setData({
            delivery_id: e.detail.value
        });
    },
    bindExpressChange: function(e) {
        var t = e.detail.value;
        this.setData({
            express_index: e.detail.value,
            express_id: this.data.express[t].id,
            express_name: this.data.express[t].name
        });
    },
    scanDeliver: function(e) {
        var t = this;
        wx.scanCode({
            scanType: [ "barCode" ],
            success: function(e) {
                t.setData({
                    delivery_id: e.result
                });
            }
        });
    }
});