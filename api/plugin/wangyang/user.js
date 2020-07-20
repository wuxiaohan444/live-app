Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSellerOrderInfo = getSellerOrderInfo, exports.saveSellerOrder = saveSellerOrder, 
exports.getSellerOrders = getSellerOrders, exports.getSellerOrderDetail = getSellerOrderDetail, 
exports.downloadSellerOrder = downloadSellerOrder, exports.orderComment = orderComment;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getSellerOrderInfo(e) {
    return _request2.default.get("plugin/wangyang/user/seller_order/detail/" + e);
}

function saveSellerOrder(e, r, t) {
    return t.id = e, t.type = r, _request2.default.post("plugin/wangyang/user/seller_order/save", t);
}

function getSellerOrders(e) {
    return _request2.default.get("plugin/wangyang/user/seller_order/list", e);
}

function getSellerOrderDetail(e) {
    return _request2.default.get("plugin/wangyang/user/seller_order/detail/" + e);
}

function downloadSellerOrder(e) {
    return _request2.default.get("plugin/wangyang/user/seller_order/download/" + e);
}

function orderComment(e, r) {
    return _request2.default.post("plugin/wangyang/user/seller_order/comment/" + e, {
        content: r
    });
}