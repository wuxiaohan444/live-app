Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getIndexData = getIndexData, exports.getCartData = getCartData, exports.getLogo = getLogo, 
exports.getTabbar = getTabbar, exports.getSiteInfo = getSiteInfo, exports.setCouponReceive = setCouponReceive, 
exports.getCoupons = getCoupons, exports.getUserCoupons = getUserCoupons, exports.getArticleCategoryList = getArticleCategoryList, 
exports.getArticleList = getArticleList, exports.getArticleHotList = getArticleHotList, 
exports.getArticleBannerList = getArticleBannerList, exports.getArticleDetails = getArticleDetails, 
exports.loginMobile = loginMobile, exports.registerVerify = registerVerify, exports.phoneRegister = phoneRegister, 
exports.phoneRegisterReset = phoneRegisterReset, exports.phoneLogin = phoneLogin, 
exports.switchH5Login = switchH5Login, exports.bindingPhone = bindingPhone, exports.logout = logout, 
exports.getSlides = getSlides, exports.getConfig = getConfig, exports.getTplByKeys = getTplByKeys, 
exports.getExamineKeywords = getExamineKeywords;

var _request = require("./../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getIndexData() {
    return _request2.default.get("common/indexData", {}, {
        noAuth: !0
    }, 600);
}

function getCartData() {
    return _request2.default.get("common/cart", {}, {
        noAuth: !0
    });
}

function getLogo() {
    return _request2.default.get("wechat/get_logo", {}, {
        noAuth: !0
    });
}

function getTabbar() {
    return _request2.default.get("common/wxapp/tabbar", {}, {
        noAuth: !0
    });
}

function getSiteInfo() {
    return _request2.default.get("common/wxapp/siteinfo", {}, {
        noAuth: !0
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
    return _request2.default.post("binding", e);
}

function logout() {
    return _request2.default.get("logout");
}

function getSlides() {
    return _request2.default.get("common/getSlides", {}, {
        noAuth: !0
    });
}

function getConfig(e, t) {
    return void 0 === t ? _request2.default.get("common/config/" + e, {}, {
        noAuth: !0
    }) : _request2.default.get("common/config/" + e + "/" + t, {}, {
        noAuth: !0
    });
}

function getTplByKeys(e) {
    return _request2.default.post("wechat/get_tpl", e);
}

function getExamineKeywords() {
    return _request2.default.get("common/examine-keywords", {}, {
        noAuth: !0
    });
}