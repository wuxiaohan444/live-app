Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.applyPartnerPay = applyPartnerPay, exports.applyFormPartner = applyFormPartner, 
exports.partnerCenter = partnerCenter, exports.ownPartners = ownPartners, exports.ownAnchors = ownAnchors, 
exports.iniLogs = iniLogs, exports.commission = commission, exports.achievement = achievement, 
exports.getQrcode = getQrcode, exports.partnerEquity = partnerEquity;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}

function applyPartnerPay(r) {
    return _request2.default.post("plugin/partner/partner/partner/apply-pay", r);
}

function applyFormPartner(r) {
    return _request2.default.post("plugin/partner/partner/partner/apply-form", r);
}

function partnerCenter() {
    return _request2.default.get("plugin/partner/partner/partner/center");
}

function ownPartners() {
    return _request2.default.get("plugin/partner/partner/partner/own-partners");
}

function ownAnchors() {
    return _request2.default.get("plugin/partner/partner/partner/own-anchors");
}

function iniLogs() {
    return _request2.default.get("plugin/partner/partner/partner/ini-logs");
}

function commission() {
    return _request2.default.get("plugin/partner/partner/partner/commission");
}

function achievement() {
    return _request2.default.get("plugin/partner/partner/partner/achievement");
}

function getQrcode() {
    return _request2.default.get("plugin/partner/partner/partner/qrccode");
}

function partnerEquity() {
    return _request2.default.post("plugin/partner/partner/partner/partner-equity");
}