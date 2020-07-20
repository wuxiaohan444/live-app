Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getStoreDetail = getStoreDetail, exports.storeVisit = storeVisit, exports.storeCollect = storeCollect, 
exports.getGoodsList = getGoodsList, exports.goodsCategoryList = goodsCategoryList, 
exports.getColletStoreList = getColletStoreList;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getStoreDetail(e) {
    return _request2.default.get("plugin/merch/user/store/detail/" + e);
}

function storeVisit(e) {
    return _request2.default.get("plugin/merch/user/store/visit/" + e);
}

function storeCollect(e) {
    return _request2.default.post("plugin/merch/user/store/collect/" + e);
}

function getGoodsList(e, t) {
    return _request2.default.get("plugin/merch/user/goods/list/" + e, t, {
        noAuth: !0
    });
}

function goodsCategoryList(e) {
    return _request2.default.get("plugin/merch/user/goods/category/" + e);
}

function getColletStoreList(e) {
    return _request2.default.get("plugin/merch/user/store/collect-list", e);
}