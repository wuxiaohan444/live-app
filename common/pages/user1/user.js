var _user = require("../../../api/user.js");

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var app = getApp(), template = require("../../template/template.js");

Page(_defineProperty({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            navbar: "1",
            return: "0",
            title: "我的",
            color: "black",
            class: "white"
        },
        userInfo: {},
        MyMenus: [],
        isGoIndex: !1,
        iShidden: !0,
        isAuto: !1,
        switchActive: !1,
        loginType: app.globalData.loginType,
        orderStatusNum: {},
        orderInfo: [ {
            id: "topay",
            num: "unpaid_count",
            url: "/membercenter/order_list/index?status=0",
            name: "待付款",
            ei: "order_obligation",
            en: "待付款"
        }, {
            id: "tosend",
            num: "unshipped_count",
            url: "/membercenter/order_list/index?status=1",
            name: "待发货",
            ei: "order_shipment",
            en: "待发货"
        }, {
            id: "send",
            num: "received_count",
            url: "/membercenter/order_list/index?status=2",
            name: "待收货",
            ei: "order_receipt",
            en: "待收货"
        }, {
            id: "tocomment",
            num: "evaluated_count",
            url: "/membercenter/order_list/index?status=3",
            name: "待评价",
            ei: "order_rate",
            en: "待评价"
        }, {
            id: "rights",
            num: "refund_count",
            url: "/membercenter/order_list/index?status=-3",
            name: "退款/售后",
            ei: "order_aftersale",
            en: "退款/售后"
        } ]
    },
    close: function() {
        this.setData({
            switchActive: !1
        });
    },
    onLoadFun: function(e) {
        this.getUserInfo(), this.getMyMenus();
    },
    getMyMenus: function() {
        var t = this;
        this.data.MyMenus.length || (0, _user.getMenuList)().then(function(e) {
            t.setData({
                MyMenus: e.data.routine_my_menus
            });
        });
    },
    getUserInfo: function() {
        var t = this;
        (0, _user.getUserInfo)().then(function(e) {
            t.setData({
                userInfo: e.data,
                loginType: e.data.login_type,
                orderStatusNum: e.data.orderStatusNum
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    goPages: function(e) {
        if (app.globalData.isLog && this.data.userInfo.id) {
            if ("/pages/user_spread_user/index" == e.currentTarget.dataset.url && 1 == this.data.userInfo.statu && !this.data.userInfo.is_promoter) return app.Tips({
                title: "您还没有推广权限！！"
            });
            if ("/pages/logon/index" == e.currentTarget.dataset.url) return this.setData({
                switchActive: !0
            });
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            });
        } else this.setData({
            iShidden: !1
        });
    },
    goLivePush: function() {
        wx.navigateTo({
            url: "/live/pages/live_push/index"
        });
    },
    onLoad: function(e) {
        this.setData({
            MyMenus: app.globalData.MyMenus
        }), template.tabbar("tabBar", 3, this);
    },
    onHide: function() {
        this.setData({
            switchActive: !1
        });
    },
    onUnload: function() {},
    onShow: function() {
        app.globalData.isLog && this.getUserInfo();
    }
}, "onUnload", function() {}));