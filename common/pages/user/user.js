var _user = require("../../../api/user.js"), _common = require("../../../api/common.js");

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
            title: "个人中心",
            navbar: "1",
            return: "0",
            color: !0,
            class: "red"
        },
        userInfo: {},
        MyMenus: [],
        isGoIndex: !1,
        iShidden: !0,
        isAuto: !1,
        switchActive: !1,
        loginType: app.globalData.loginType,
        orderStatusNum: {},
        orderInfo: [{
            id: "topay",
            icon: "c1",
            num: "unpaid_count",
            url: "/membercenter/order_list/index?status=0",
            name: "待付款",
            ei: "order_obligation",
            en: "待付款"
        }, {
            id: "tosend",
            icon: "c2",
            num: "unshipped_count",
            url: "/membercenter/order_list/index?status=1",
            name: "待发货",
            ei: "order_shipment",
            en: "待发货"
        }, {
            id: "send",
            icon: "c3",
            num: "received_count",
            url: "/membercenter/order_list/index?status=2",
            name: "待收货",
            ei: "order_receipt",
            en: "待收货"
        }, {
            id: "tocomment",
            icon: "c4",
            num: "evaluated_count",
            url: "/membercenter/order_list/index?status=3",
            name: "待评价",
            ei: "order_rate",
            en: "待评价"
        }, {
            id: "rights",
            icon: "c5",
            num: "refund_count",
            url: "/membercenter/order_list/index?status=-3",
            name: "退货/款",
            ei: "order_aftersale",
            en: "退款/售后"
        }],
        examineKeywords: {},
        configBalance: {},
        deviceType: app.globalData.deviceType
    },
    close: function () {
        this.setData({
            switchActive: !1
        });
    },
    onLoadFun: function (e) {
        this.getUserInfo(), this.getMyMenus(), this.getConfig(), this.getExamineKeywords();
    },
    getConfig: function () {
        var t = this;
        (0, _common.getConfig)(13).then(function (e) {
            t.setData({
                configBalance: e.data.balance
            });
        });
    },
    getMyMenus: function () {
        var t = this;
        this.data.MyMenus.length || (0, _user.getMenu1List)().then(function (e) {
            t.setData({
                MyMenus: e.data
            });
        });
    },
    getUserInfo: function () {
        var t = this;
        (0, _user.getUserInfo)().then(function (e) {
            t.setData({
                userInfo: e.data,
                loginType: e.data.login_type,
                orderStatusNum: e.data.orderStatusNum
            });
        }).catch(function (e) {
            return app.Tips({
                title: e
            });
        });
    },
    getExamineKeywords: function () {
        var t = this;
        (0, _common.getExamineKeywords)().then(function (e) {
            t.setData({
                examineKeywords: e.data
            });
        }).catch(function (e) {
        });
    },
    goPages: function (e) {
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
    goLivePush: function () {
        wx.navigateTo({
            url: "/live/pages/live_push/index"
        });
    },
    skipFans: function (e) {
        let type = e.currentTarget.dataset.type
        wx.navigateTo({
            url: "/membercenter/user-fans/index?type=" + type
        });
    },
    onLoad: function (e) {
        this.setData({
            MyMenus: app.globalData.MyMenus
        }), template.tabbar("tabBar", 3, this);
    },
    onHide: function () {
        this.setData({
            switchActive: !1
        });
    },
    onUnload: function () {
    },
    onShow: function () {
        app.globalData.isLog && this.getUserInfo();
    }
}, "onUnload", function () {
}));

