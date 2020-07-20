Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getArticleList = getArticleList, exports.getArticleDetail = getArticleDetail;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getArticleList(e, t) {
    return t.category = e, _request2.default.get("market/article/list", t, {
        noAuth: !0
    });
}

function getArticleDetail(e) {
    return _request2.default.get("market/article/detail/" + e, {}, {
        noAuth: !0
    });
}