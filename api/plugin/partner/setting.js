Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPartnerInfo = getPartnerInfo;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getPartnerInfo() {
    return _request2.default.get("plugin/partner/partner/level/get-info");
}