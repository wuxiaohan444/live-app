var _user = require("../../../api/user.js"), _common = require("../../../api/common.js"),
    _live = require("../../../api/live.js"),
    _common2 = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse"),
    _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {default: e}
}

var app = getApp();
Page({
    data: {
        parameter: {title: "充值", navbar: "1", return: "1", color: !0, class: "red"},
        navRecharge: ["账户充值"],
        active: 0,
        config: "",
        rule: "",
        tmplIds: "",
        balance_market_index: "",
        balance_text: "余额",
        // balance_market: "",
        focus: !0,
        placeholder: "请输入充值天数",
        residue: '',//剩余天数
        price: '0',//单价
        number: "",//充值天数
        total_money: 0,//总金额
    }, onLoadFun: function () {
        this.getUserInfo(), this.getConfig(), this.getTmplIds(), this.getExamineKeywords(), this.getUser()
    },
    getExamineKeywords: function () {
        var t = this;
        (0, _common2.getExamineKeywords)().then(function (e) {
            t.setData({examineKeywords: e.data}), _wxParse2.default.wxParse("page_content", "html", e.data.page_content, t, 0)
        }).catch(function (e) {
        })
    },
    setPlaceholder: function () {
        this.setData({placeholder: ""})
    },
    navRecharge: function (e) {
        this.setData({active: e.currentTarget.dataset.id})
    },
    onLoad: function (e) {
    },
    getUserInfo: function () {
        var t = this;
        (0, _user.getUserInfo)().then(function (e) {
            t.setData({userinfo: e.data})
        })
    },
    getConfig: function () {
        var n = this;
        (0, _common.getConfig)(13).then(function (e) {
            var t = e.data;
            if (t.balance) {
                n.setData({config: t}), t.balance.balance_text && n.setData({
                    balance_text: t.balance.balance_text,
                    "parameter.title": t.balance.balance_text + "充值"
                });
                var a = "";
                t.balance.min_recharge && (a += "最低充值" + t.balance.min_recharge), n.setData({rule: a})
            }
        }), (0, _common.getConfig)(18).then(function (e) {
            var t = e.data;
            n.setData({balance_market: t})
        })
    },
    getTmplIds: function () {
        var t = this;
        (0, _common.getTplByKeys)({key: 496}).then(function (e) {
            t.setData({tmplIds: e.data})
        })
    },
    selectBalanceMarket: function (e) {
        this.setData({balance_market_index: e.currentTarget.dataset.balance_market_index})
    },
    //支付
    submitSub: function (e) {
        var a = this, n = this.data.total_money, t = this.data.balance_market_index, i = this.data.balance_market;
        if (t && (n = i[t - 1].enough), !n || parseFloat(n) < 0) return app.Tips({title: "请输入天数"});
        // 参数
        wx.showLoading({title: "正在支付"}), (0, _user.newRecharge)({money: n, type: 9}).then(function (e) {
            wx.hideLoading();
            var t = e.data.jsConfig;
            wx.requestPayment({
                timeStamp: t.timestamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: t.signType,
                paySign: t.paySign,
                success: function (e) {
                    a.refurbish()
                },
                fail: function () {
                    console.log(1);
                    return app.Tips({title: "支付失败"})
                },
                complete: function (e) {
                    if ("requestPayment:cancel" == e.errMsg) return app.Tips({title: "取消支付"})
                }
            })
        }).catch(function (e) {
            return wx.hideLoading(), app.Tips({title: e})
        })
    },
    bindKeyInput: function (e) {
        var t = {};
        t.number = e.detail.value, this.setData(t);
        this.setData({
            total_money: this.floatMul(this.data.number, this.data.price)
        })
    },
    getUser() {
        var i = this;
        wx.showLoading(), this.getExamineKeywords(), (0, _live.getAnchorLiveInfo)().then(function (t) {
            console.log(t);
            i.setData({
                residue: t.data.live.fee_days,
                price: t.data.config.chat_fee
            }), wx.hideLoading();
        }).catch(function (t) {

        });
    },
    //乘法
    floatMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    refurbish: function () {
        this.setData({
            placeholder: "请输入充值天数",
            number: "",//充值天数
            total_money: 0,//总金额
        })
        this.getUser();
    }

});
