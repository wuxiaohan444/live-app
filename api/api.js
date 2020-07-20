Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getIndexData = getIndexData, exports.getLogo = getLogo, exports.setFormId = setFormId, 
exports.setCouponReceive = setCouponReceive, exports.getCoupons = getCoupons, exports.getUserCoupons = getUserCoupons, 
exports.getArticleCategoryList = getArticleCategoryList, exports.getArticleList = getArticleList, 
exports.getArticleHotList = getArticleHotList, exports.getArticleBannerList = getArticleBannerList, 
exports.getArticleDetails = getArticleDetails, exports.loginMobile = loginMobile, 
exports.registerVerify = registerVerify, exports.phoneRegister = phoneRegister, 
exports.phoneRegisterReset = phoneRegisterReset, exports.phoneLogin = phoneLogin, 
exports.switchH5Login = switchH5Login, exports.bindingPhone = bindingPhone, exports.logout = logout;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getIndexData() {
    return _request2.default.get("index", {}, {
        noAuth: !0
    });
}

function getLogo() {
    return _request2.default.get("wechat/get_logo", {}, {
        noAuth: !0
    });
}

function setFormId(e) {
    return _request2.default.post("wechat/form-id-store", {
        formId: e
    });
}

function setCouponReceive(e) {
    return _request2.default.post("coupon/receive", {
        couponId: e
    });
}

function getCoupons(e) {
    return _request2.default.get("coupons", e, {
        noAuth: !0
    });
}

function getUserCoupons(e) {
    return _request2.default.get("coupons/user/" + e);
}

function getArticleCategoryList() {
    return _request2.default.get("article/category/list", {}, {
        noAuth: !0
    });
}

function getArticleList(e, t) {
    return _request2.default.get("article/list/" + e, t, {
        noAuth: !0
    });
}

function getArticleHotList() {
    return _request2.default.get("article/hot/list", {}, {
        noAuth: !0
    });
}

function getArticleBannerList() {
    return _request2.default.get("article/banner/list", {}, {
        noAuth: !0
    });
}

function getArticleDetails(e) {
    return _request2.default.get("article/details/" + e, {}, {
        noAuth: !0
    });
}

function loginMobile(e) {
    return _request2.default.post("login/mobile", e, {
        noAuth: !0
    });
}

function registerVerify(e, t) {
    return _request2.default.post("register/verify", {
        phone: e,
        type: void 0 === t ? "reset" : t
    }, {
        noAuth: !0
    });
}

function phoneRegister(e) {
    return _request2.default.post("register", e, {
        noAuth: !0
    });
}

function phoneRegisterReset(e) {
    return _request2.default.post("register/reset", e, {
        noAuth: !0
    });
}

function phoneLogin(e) {
    return _request2.default.post("login", e, {
        noAuth: !0
    });
}

function switchH5Login() {
    return _request2.default.post("switch_h5", {
        from: "routine"
    });
}

function bindingPhone(e) {
    return _request2.default.post("userinfo/bind-phone", e);
}

function logout() {
    return _request2.default.get("logout");
}