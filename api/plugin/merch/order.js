Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getOrderList = getOrderList, exports.cancelOrder = cancelOrder, exports.getOrderDetail = getOrderDetail, 
exports.changeOrderPrice = changeOrderPrice, exports.orderDeliver = orderDeliver, 
exports.changeOrderAddress = changeOrderAddress, exports.refundOrder = refundOrder, 
exports.refundRejectOrder = refundRejectOrder;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getOrderList(e) {
    return _request2.default.get("plugin/merch/store/order/list", e);
}

function cancelOrder(e, r) {
    return _request2.default.post("plugin/merch/store/order/cancel/" + e, r);
}

function getOrderDetail(e) {
    return _request2.default.get("plugin/merch/store/order/detail/" + e);
}

function changeOrderPrice(e, r) {
    return _request2.default.post("plugin/merch/store/order/change_price/" + e, r);
}

function orderDeliver(e, r) {
    return _request2.default.post("plugin/merch/store/order/deliver/" + e, r);
}

function changeOrderAddress(e, r) {
    return _request2.default.post("plugin/merch/store/order/change_address/" + e, r);
}

function refundOrder(e, r) {
    return _request2.default.post("plugin/merch/store/order/refund/" + e, r);
}

function refundRejectOrder(e, r) {
    return _request2.default.post("plugin/merch/store/order/refund_reject/" + e, r);
}