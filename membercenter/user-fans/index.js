var _user = require("../../api/user.js"), _common = require("../../api/common.js");

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var app = getApp();

Page(_defineProperty({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red",
            type:''
        },
        fansList: []
    },
    onLoad: function (e) {
        let type = e.type;
        if (type == 1) {
            this.data.parameter.title = '关注我的';
            this.getFans()
        } else if (type == 2) {
            this.data.parameter.title = '我关注的';
            this.getFllow()
        }
        this.setData({
            parameter: this.data.parameter,
            type:type
        })
    },
    goLivePush: function () {
        wx.navigateTo({
            url: "/live/pages/live_push/index"
        });
    },
    onUnload: function () {
    },
    onShow: function () {

    },
    getFllow: function () {
        let that = this;
        (0, _user.getFllow)({}).then(function (a) {
            console.log(a);
            that.setData({
                fansList:a.data
            })
        }).catch(function (a) {
            return app.Tips({
                title: a
            })
        });
    },
    getFans: function () {
        let that = this;
        (0, _user.getFans)({}).then(function (a) {
            console.log(a);
            that.setData({
                fansList:a.data
            })
        }).catch(function (a) {
            return app.Tips({
                title: a
            })
        });
    }
}, "onUnload", function () {
}));

