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
            title: "拒绝原因",
            color: "black",
            class: "white"
        },
        order: "",
        order_id: ""
    },
    onLoadFun: function() {},
    onLoad: function(e) {
        this.setData({
            order_id: e.order_id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    submit: function(e) {
        var r = e.detail.value, t = getCurrentPages(), i = "/" + t[t.length - 2].route;
        if (!r.reason) return app.Tips({
            title: "请输入退款原因"
        });
        (0, _order.refundRejectOrder)(this.data.order_id, r).then(function(e) {
            return i += "?order_id=" + e.data.order_id, app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: i
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    }
});