var _order = require("../../../api/order.js"), _api = require("../../../api/api.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

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
            title: "申请退货",
            color: !1
        },
        refund_reason_wap_img: [],
        orderInfo: {},
        RefundArray: [],
        index: 0,
        typeindex: 0,
        refundTypeArray: [ "退货", "退款", "退货退款" ],
        orderId: 0
    },
    onLoadFun: function() {
        this.getOrderInfo(), this.getRefundReason();
    },
    onLoad: function(e) {
        if (!e.orderId) return app.Tips({
            title: "缺少订单id,无法退款"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            orderId: e.orderId
        });
    },
    getOrderInfo: function() {
        var a = this;
        (0, _order.getOrderDetail)(a.data.orderId).then(function(e) {
            a.setData({
                orderInfo: e.data
            });
        });
    },
    getRefundReason: function() {
        var a = this;
        (0, _order.ordeRefundReason)().then(function(e) {
            a.setData({
                RefundArray: e.data
            });
        });
    },
    DelPic: function(e) {
        var a = e.target.dataset.index, r = this;
        this.data.refund_reason_wap_img[a];
        r.data.refund_reason_wap_img.splice(a, 1), r.setData({
            refund_reason_wap_img: r.data.refund_reason_wap_img
        });
    },
    uploadpic: function() {
        var a = this;
        _util2.default.uploadImageOne("common/upload/image", function(e) {
            a.data.refund_reason_wap_img.push(e.data.url), a.setData({
                refund_reason_wap_img: a.data.refund_reason_wap_img
            });
        });
    },
    subRefund: function(e) {
        var a = this, r = e.detail.formId, t = e.detail.value;
        if (!t.refund_reason_wap_explain) return app.Tips({
            title: "请输入退款原因"
        });
        (0, _api.setFormId)(r), (0, _order.orderRefundVerify)({
            type: a.data.refundTypeArray[a.data.typeindex] || "",
            text: a.data.RefundArray[a.data.index] || "",
            refund_reason_wap_explain: t.refund_reason_wap_explain,
            refund_reason_wap_img: a.data.refund_reason_wap_img.join(","),
            uni: a.data.orderId
        }).then(function(e) {
            return app.Tips({
                title: "申请成功",
                icon: "success"
            }, {
                tab: 5,
                url: "/order/pages/order_details/index?order_id=" + a.data.orderId
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        });
    },
    bindPickerRefundTypeChange: function(e) {
        this.setData({
            typeindex: e.detail.value
        });
    }
});