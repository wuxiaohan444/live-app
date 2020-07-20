Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getApplyIntro = getApplyIntro, exports.applyPay = applyPay, exports.apply = apply, 
exports.userBindStore = userBindStore, exports.getPageStoreCenter = getPageStoreCenter, 
exports.getConfig = getConfig, exports.approveIntegrityPay = approveIntegrityPay, 
exports.getInfo = getInfo, exports.storeNotice = storeNotice, exports.getStat = getStat, 
exports.getBill = getBill, exports.extractBalance = extractBalance, exports.updateStore = updateStore;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getApplyIntro(e) {
    return _request2.default.get("plugin/merch/common/apply/intro");
}

function applyPay() {
    return _request2.default.get("plugin/merch/common/apply/pay");
}

function apply(e) {
    return _request2.default.post("plugin/merch/common/apply/submit", e);
}

function userBindStore(e) {
    return _request2.default.post("plugin/merch/store/user/bind", {
        id: e
    });
}

function getPageStoreCenter() {
    return _request2.default.get("plugin/merch/store/page/center");
}

function getConfig(e, t) {
    return void 0 === t ? _request2.default.get("plugin/merch/common/config/" + e, {}, {
        noAuth: !0
    }) : _request2.default.get("plugin/merch/common/config/" + e + "/" + t, {}, {
        noAuth: !0
    });
}

function approveIntegrityPay() {
    return _request2.default.get("plugin/merch/store/integrity/approvePay");
}

function getInfo() {
    return _request2.default.get("plugin/merch/store/manager/info");
}

function storeNotice(e) {
    return _request2.default.post("plugin/merch/store/manager/notice", e);
}

function getStat(e) {
    return _request2.default.get("plugin/merch/store/manager/stat", e);
}

function getBill(e) {
    return _request2.default.get("plugin/merch/store/manager/bill", e);
}

function extractBalance(e) {
    return _request2.default.post("plugin/merch/store/manager/extractBalance", e);
}

function updateStore(e) {
    return _request2.default.post("plugin/merch/store/manager/update", e);
}
