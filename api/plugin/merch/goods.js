Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getGoodsList = getGoodsList, exports.addGoods = addGoods, exports.updateGoods = updateGoods, 
exports.goodsCategoryList = goodsCategoryList, exports.goodsCategoryDelete = goodsCategoryDelete, 
exports.goodsCategoryAdd = goodsCategoryAdd, exports.goodsCategoryUpdate = goodsCategoryUpdate, 
exports.goodsUpState = goodsUpState, exports.liveGoodsUpdate = liveGoodsUpdate, 
exports.goodsDelete = goodsDelete, exports.goodsInfo = goodsInfo;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getGoodsList(e) {
    return _request2.default.get("plugin/merch/store/goods/list", e);
}

function addGoods(e) {
    return _request2.default.post("plugin/merch/store/goods/store", e);
}

function updateGoods(e, t) {
    return _request2.default.post("plugin/merch/store/goods/update/" + e, t);
}

function goodsCategoryList() {
    return _request2.default.get("plugin/merch/store/category/list");
}

function goodsCategoryDelete(e) {
    return _request2.default.get("plugin/merch/store/category/destory/" + e);
}

function goodsCategoryAdd(e) {
    return _request2.default.post("plugin/merch/store/category/store", e);
}

function goodsCategoryUpdate(e, t) {
    return _request2.default.post("plugin/merch/store/category/update/" + e, t);
}

function goodsUpState(e, t) {
    return _request2.default.post("plugin/merch/store/goods/upState/" + e, {
        state: t
    });
}

function liveGoodsUpdate(e) {
    return _request2.default.post("plugin/merch/store/goods/liveGoodsUpdate/" + e);
}

function goodsDelete(e) {
    return _request2.default.post("plugin/merch/store/goods/delete/" + e);
}

function goodsInfo(e) {
    return _request2.default.get("plugin/merch/store/goods/info/" + e);
}