Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getActivityGoods = getActivityGoods, exports.getTagGoods = getTagGoods, 
exports.getCategoryList = getCategoryList, exports.getSearchKeyword = getSearchKeyword, 
exports.getHotGoods = getHotGoods, exports.getGoodsList = getGoodsList, exports.getGoodsDetail = getGoodsDetail, 
exports.getGoodsCode = getGoodsCode, exports.getGoodsQrCode = getGoodsQrCode, exports.collectAdd = collectAdd, 
exports.collectDel = collectDel, exports.collectAll = collectAll;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getActivityGoods(e) {
    return _request2.default.get("shop/goods/activity_list/" + e, {}, {
        noAuth: !0
    });
}

function getTagGoods(e) {
    return _request2.default.get("shop/goods/tag_list/" + e, {}, {
        noAuth: !0
    });
}

function getCategoryList(e) {
    return e = void 0 === e ? 0 : e, _request2.default.get("shop/goods/category", {
        pid: e
    }, {
        noAuth: !0
    });
}

function getSearchKeyword() {
    return _request2.default.get("shop/goods/search/keywords", {}, {
        noAuth: !0
    });
}

function getHotGoods(e, t) {
    return _request2.default.get("shop/goods/hot", {
        page: void 0 === e ? 1 : e,
        limit: void 0 === t ? 4 : t
    }, {
        noAuth: !0
    });
}

function getGoodsList(e) {
    return _request2.default.get("shop/goods/list", e, {
        noAuth: !0
    });
}

function getGoodsDetail(e) {
    return _request2.default.get("shop/goods/detail/" + e, {}, {
        noAuth: !0
    });
}

function getGoodsCode(e) {
    return _request2.default.get("shop/goods/detail/" + e, {}, {
        noAuth: !0
    });
}

function getGoodsQrCode(e) {
    return _request2.default.get("shop/goods/qrccode/" + e, {
        user_type: "routine"
    });
}

function collectAdd(e, t) {
    return _request2.default.post("shop/goods/collect/add", {
        id: e,
        category: void 0 === t ? "goods" : t
    });
}

function collectDel(e, t) {
    return _request2.default.post("shop/goods/collect/del", {
        id: e,
        category: void 0 === t ? "goods" : t
    });
}

function collectAll(e, t) {
    return _request2.default.post("shop/goods/collect/all", {
        id: e,
        category: void 0 === t ? "goods" : t
    });
}