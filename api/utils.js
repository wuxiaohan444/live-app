Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getDiyPage = getDiyPage;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getDiyPage(e) {
    return _request2.default.get("common/diypage/" + e, {}, {
        noAuth: !0
    });
}