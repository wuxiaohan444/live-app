Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.commissionGoodsOrderDetail = commissionGoodsOrderDetail, exports.commissionGoodsOrderDeliver = commissionGoodsOrderDeliver;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function commissionGoodsOrderDetail(e) {
    return _request2.default.get("spread/commission-goods-order-detail/" + e);
}

function commissionGoodsOrderDeliver(e, r) {
    return _request2.default.post("spread/commission-goods-order-deliver/" + e, r);
}