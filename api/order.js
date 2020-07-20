Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.postCartAdd = postCartAdd, exports.getCartList = getCartList, exports.getCartCounts = getCartCounts, 
exports.changeCartNum = changeCartNum, exports.cartDel = cartDel, exports.getOrderList = getOrderList, 
exports.orderConfirm = orderConfirm, exports.orderAgain = orderAgain, exports.orderPay = orderPay, 
exports.getOrderDetail = getOrderDetail, exports.orderDel = orderDel, exports.orderTake = orderTake, 
exports.orderExpress = orderExpress, exports.orderComment = orderComment, exports.orderCancel = orderCancel, 
exports.orderGoods = orderGoods, exports.orderRefundVerify = orderRefundVerify, 
exports.ordeRefundReason = ordeRefundReason, exports.orderData = orderData, exports.getCouponsOrderPrice = getCouponsOrderPrice, 
exports.orderCreate = orderCreate, exports.express = express, exports.getExpressList = getExpressList, 
exports.getReplyList = getReplyList, exports.getReplyConfig = getReplyConfig;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function postCartAdd(e) {
    return _request2.default.post("shop/cart/add", e);
}

function getCartList() {
    return _request2.default.get("shop/cart/list");
}

function getCartCounts(e) {
    return _request2.default.get("shop/cart/count", {
        numType: void 0 === e || e
    });
}

function changeCartNum(e, r) {
    return _request2.default.post("shop/cart/num", {
        id: e,
        number: r
    });
}

function cartDel(e) {
    return "object" === ("undefined" == typeof id ? "undefined" : _typeof(id)) && (e = e.join(",")), 
    _request2.default.post("shop/cart/del", {
        ids: e
    });
}

function getOrderList(e) {
    return _request2.default.get("shop/order/list", e);
}

function orderConfirm(e) {
    return _request2.default.post("shop/order/confirm", {
        cartId: e
    });
}

function orderAgain(e) {
    return _request2.default.post("shop/order/again", {
        uni: e
    });
}

function orderPay(e) {
    return _request2.default.post("shop/order/pay", e);
}

function getOrderDetail(e) {
    return _request2.default.get("shop/order/detail/" + e);
}

function orderDel(e) {
    return _request2.default.post("shop/order/del", {
        uni: e
    });
}

function orderTake(e) {
    return _request2.default.post("shop/order/take", {
        uni: e
    });
}

function orderExpress(e) {
    return _request2.default.get("shop/order/express/" + e);
}

function orderComment(e) {
    return _request2.default.post("shop/order/comment", e);
}

function orderCancel(e) {
    return _request2.default.post("shop/order/cancel", {
        id: e
    });
}

function orderGoods(e) {
    return _request2.default.post("shop/order/goods", {
        unique: e
    });
}

function orderRefundVerify(e) {
    return _request2.default.post("shop/order/refund/verify", e);
}

function ordeRefundReason() {
    return _request2.default.get("shop/order/refund/reason");
}

function orderData() {
    return _request2.default.get("shop/order/data");
}

function getCouponsOrderPrice(e) {
    return _request2.default.get("shop/coupons/order/" + e);
}

function orderCreate(e, r) {
    return _request2.default.post("shop/order/create/" + e, r);
}

function express(e) {
    return _request2.default.get("shop/order/express/" + e);
}

function getExpressList() {
    return _request2.default.get("shop/common/express-list");
}

function getReplyList(e, r) {
    return _request2.default.get("shop/goods/reply/list/" + e, r);
}

function getReplyConfig(e) {
    return _request2.default.get("shop/goods/reply/config/" + e);
}