var _data, _user = require("../../api/user.js");

function _defineProperty(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}

var app = getApp();

Page({
    data: (_data = {
        parameter: {
            navbar: "1",
            return: "1",
            title: "分销商申请",
            color: !0,
            class: "0"
        },
        show: !0,
        set: {
            become: 1
        },
        spreadInfo: {},
        userInfo: {},
        member: {
            status: 0,
            isagent: 0
        }
    }, _defineProperty(_data, "userInfo", []), _defineProperty(_data, "yesterdayPrice", 0), 
    _defineProperty(_data, "already", 0), _defineProperty(_data, "need", 0), _defineProperty(_data, "isClone", !1), 
    _data),
    onLoadFun: function() {
        console.log(1111), this.getInfo();
    },
    submit: function() {
        (0, _user.applyCommission)({}).then(function(e) {
            return 200 == e.status ? app.Tips({
                title: e.msg,
                icon: "success"
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            }) : app.Tips({
                title: e.msg,
                icon: "error"
            });
        }).catch(function(e) {
            return app.Tips({
                title: e
            });
        });
    },
    onLoad: function(e) {
        console.log(1111);
    },
    onReady: function() {},
    onShow: function() {
        app.globalData.isLog && this.data.isClone;
    },
    getInfo: function() {
        var n = this;
        (0, _user.getSpreadInfo)().then(function(e) {
            n.setData({
                spreadInfo: e.data
            });
        });
    },
    onHide: function() {
        this.setData({
            isClone: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});