function tabbarinit() {
    return [ {
        current: 0,
        pagePath: "/common/pages/index/index",
        iconPath: "iconvideo",
        selectedIconPath: "iconvideo icon-active",
        text: "首页"
    }, {
        current: 0,
        pagePath: "/live/pages/live_list/index",
        iconPath: "iconvideo",
        selectedIconPath: "iconvideo icon-active",
        text: "视频"
    }, {
        current: 0,
        pagePath: "/order/pages/order_addcart/order_addcart",
        iconPath: "iconcart-Empty-new",
        selectedIconPath: "iconcart-Empty-new icon-active",
        text: "购物车"
    }, {
        current: 0,
        pagePath: "/common/pages/user/user",
        iconPath: "iconaccount-new",
        selectedIconPath: "iconaccount-new icon-active",
        text: "我的"
    } ];
}

function tabbarmain() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "tabdata", e = arguments[1], a = arguments[2], c = {}, n = tabbarinit();
    n[e].iconPath = n[e].selectedIconPath, n[e].current = 1, c[t] = n, a.setData({
        bindData: c
    });
}

module.exports = {
    tabbar: tabbarmain
};