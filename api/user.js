Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.login = login, exports.authMobile = authMobile, exports.getUserLocation = getUserLocation,
    exports.getMenuList = getMenuList, exports.getMenu1List = getMenu1List, exports.applyCommission = applyCommission,
    exports.getSpreadInfo = getSpreadInfo, exports.getSpreadPic = getSpreadPic, exports.getUserCommissionInfo = getUserCommissionInfo,
    exports.getUserInfo = getUserInfo, exports.userEdit = userEdit, exports.userLevelGrade = userLevelGrade,
    exports.userLevelTask = userLevelTask, exports.userLevelDetection = userLevelDetection,
    exports.spreadBanner = spreadBanner, exports.spreadPeople = spreadPeople, exports.getLevelLists = getLevelLists,
    exports.spreadCommission = spreadCommission, exports.spreadCount = spreadCount,
    exports.spreadOrder = spreadOrder, exports.commissionGoodsOrder = commissionGoodsOrder,
    exports.spreadLiveOrder = spreadLiveOrder, exports.anchorEquity = anchorEquity,
    exports.spreadAnchorOrder = spreadAnchorOrder, exports.extractCash = extractCash,
    exports.extractBalance = extractBalance, exports.extractBank = extractBank, exports.userActivity = userActivity,
    exports.rechargeBalance = rechargeBalance, exports.getAddressList = getAddressList,
    exports.setAddressDefault = setAddressDefault, exports.getAddressDefault = getAddressDefault,
    exports.delAddress = delAddress, exports.editAddress = editAddress, exports.getAddressDetail = getAddressDetail,
    exports.userShare = userShare, exports.getCollectUserList = getCollectUserList,
    exports.getSignConfig = getSignConfig, exports.getSignList = getSignList, exports.getSignMonthList = getSignMonthList,
    exports.setSignIntegral = setSignIntegral, exports.postSignUser = postSignUser,
    exports.getIntegralList = getIntegralList, exports.getCouponReceive = getCouponReceive,
    exports.getCoupon = getCoupon, exports.getCertification = getCertification, exports.addCertification = addCertification,
    exports.getCreditBill = getCreditBill, exports.getParentUid = getParentUid, exports.storeParentUid = storeParentUid,
    exports.getParentInfo = getParentInfo, exports.newRecharge = newRecharge, exports.purchaseCombo = purchaseCombo,exports.getFans=getFans,exports.getFllow=getFllow;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function login(e) {
    return _request2.default.post("wechat/mp_auth", e, {
        noAuth: !0
    });
}

function authMobile(e) {
    return _request2.default.post("wechat/auth_mobile", e);
}

function getUserLocation(e) {
    return _request2.default.post("wechat/get_user_location", e);
}

function getMenuList() {
    return _request2.default.get("menu/user-menus");
}

function getMenu1List() {
    return _request2.default.get("menu1/center");
}

function applyCommission() {
    return _request2.default.post("spread/apply");
}

function getSpreadInfo() {
    return _request2.default.get("spread/get-info");
}

function getSpreadPic() {
    return _request2.default.get("spread/picture");
}

function getUserCommissionInfo() {
    return _request2.default.get("spread/commission");
}

function getUserInfo() {
    console.log(1);
    return _request2.default.get("userinfo");
}

function userEdit(e) {
    return _request2.default.post("userinfo/update", e);
}

function userLevelGrade() {
    return _request2.default.get("user/level/grade");
}

function userLevelTask(e) {
    return _request2.default.get("user/level/task/" + e);
}

function userLevelDetection() {
    return _request2.default.get("user/level/detection");
}

function spreadBanner() {
    return _request2.default.get("spread/banner", {
        type: 1
    });
}

function spreadPeople(e) {
    return _request2.default.post("spread/subordinate", e);
}

function getLevelLists(e, t) {
    return _request2.default.post("spread/offline-lists/" + e, t);
}

function spreadCommission(e, t) {
    return _request2.default.get("spread/commission-list/" + e, t);
}

function spreadCount(e) {
    return _request2.default.get("spread/commission-count/" + e);
}

function spreadOrder(e) {
    return _request2.default.post("spread/order", e);
}

function commissionGoodsOrder(e) {
    return _request2.default.post("spread/commission-goods-order", e);
}

function spreadLiveOrder(e) {
    return _request2.default.post("spread/live-order", e);
}

function anchorEquity() {
    return _request2.default.post("anchor/anchor-equity");
}

function spreadAnchorOrder(e) {
    return _request2.default.post("spread/anchor-order", e);
}

function extractCash(e) {
    return _request2.default.post("commission/cash-apply", e);
}

function extractBalance(e) {
    return _request2.default.post("member/credit/extractBalance", e);
}

function extractBank() {
    return _request2.default.get("commission/bank");
}

function userActivity() {
    return _request2.default.get("user/activity");
}

function rechargeBalance(e) {
    return _request2.default.post("member/credit/rechargeBalance", e);
}

function getAddressList(e) {
    return _request2.default.get("address", e);
}

function setAddressDefault(e) {
    return _request2.default.post("address/change-default", {
        id: e
    });
}

function getAddressDefault() {
    return _request2.default.get("address/default");
}

function delAddress(e) {
    return _request2.default.post("address/del", {
        id: e
    });
}

function editAddress(e) {
    return _request2.default.post("address/store", e);
}

function getAddressDetail(e) {
    return _request2.default.get("address/detail/" + e);
}

function userShare() {
    return _request2.default.post("user/share");
}

function getCollectUserList(e) {
    return _request2.default.get("goods/collect/list", e);
}

function getSignConfig() {
    return _request2.default.get("sign/config");
}

function getSignList(e) {
    return _request2.default.get("sign/list", e);
}

function getSignMonthList(e) {
    return _request2.default.get("sign/month", e);
}

function setSignIntegral() {
    return _request2.default.post("sign/integral");
}

function postSignUser(e) {
    return _request2.default.post("sign/user", e);
}

function getIntegralList(e) {
    return _request2.default.get("integral/list", e);
}

function getCouponReceive(e) {
    return _request2.default.post("coupon/receive", e);
}

function getCoupon(e) {
    return _request2.default.get("coupons", e);
}

function getCertification() {
    return _request2.default.get("member/certification/info");
}

function addCertification(e) {
    return _request2.default.post("member/certification/add", e);
}

function getCreditBill(e) {
    return _request2.default.get("member/credit/bill", e);
}

function getParentUid(e) {
    return _request2.default.post("userinfo/get-parent-uid", e);
}

function storeParentUid(e) {
    return _request2.default.post("userinfo/store-parent-uid", e);
}

function getParentInfo(e, t) {
    return _request2.default.post("userinfo/get-parent-info/" + e, t);
}

function newRecharge(e) {
    return _request2.default.post("anchor/recharge-fee-day", e);
}

function purchaseCombo(e) {
    return _request2.default.post("member/credit/rechargeMember", e);
}

function getFans() {
    return _request2.default.get("follow/fdownlist");
}

function getFllow() {
    return _request2.default.get("follow/fuplist");
}