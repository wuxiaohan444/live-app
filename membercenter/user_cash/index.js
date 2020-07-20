var _user = require("../../api/user.js"), _api = require("../../api/api.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "提现",
            color: !0,
            class: "0"
        },
        navList: [ {
            name: "银行卡",
            type: "bank",
            icon: "icon-yinhangqia"
        }, {
            name: "微信",
            type: "wx",
            icon: "icon-weixin2"
        }, {
            name: "支付宝",
            type: "ali",
            icon: "icon-icon34"
        } ],
        currentTab: 0,
        index: 0,
        array: [],
        minPrice: 0,
        userInfo: [],
        onClickLoading: !1,
        isClone: !1
    },
    onLoadFun: function() {
        this.getUserInfo(), this.getUserExtractBank();
    },
    onLoad: function(a) {},
    getUserExtractBank: function() {
        var n = this;
        (0, _user.extractBank)().then(function(a) {
            var t = a.data.bank;
            t.unshift("请选择银行"), n.setData({
                array: t,
                commission: a.data.commission,
                minPrice: a.data.min_amount
            });
        });
    },
    getUserInfo: function() {
        var t = this;
        (0, _user.getUserInfo)().then(function(a) {
            t.setData({
                userInfo: a.data
            });
        });
    },
    swichNav: function(a) {
        console.log(121212, a), this.setData({
            currentTab: a.detail.index
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            index: a.detail.value
        });
    },
    subCash: function(a) {
        a.detail.formId;
        var t = this, n = a.detail.value;
        if (this.data.onClickLoading) return app.Tips({
            title: "申请中，请勿重复提交"
        });
        if (0 == t.data.currentTab) {
            if (0 == n.name.length) return app.Tips({
                title: "请填写持卡人姓名"
            });
            if (0 == n.cardnum.length) return app.Tips({
                title: "请填写卡号"
            });
            if (0 == n.bank_address.length) return app.Tips({
                title: "请填写开户行地址"
            });
            if (0 == t.data.index) return app.Tips({
                title: "请选择银行"
            });
            n.type = "bank", n.bankname = t.data.array[t.data.index];
        } else if (1 == t.data.currentTab) {
            if (n.type = "weixin", 0 == n.name.length) return app.Tips({
                title: "请填写微信号"
            });
            n.weixin = n.name;
        } else if (2 == t.data.currentTab) {
            if (n.type = "alipay", 0 == n.realname.length) return app.Tips({
                title: "请填写姓名"
            });
            if (0 == n.name.length) return app.Tips({
                title: "请填写账号"
            });
            n.alipay_code = n.name, n.realname = n.realname;
        }
        if (t.data.commission < t.data.minPrice) return app.Tips({
            title: "提现金额不能低于" + t.data.minPrice + "元"
        });
        this.setData({
            onClickLoading: !0
        }), (0, _user.extractCash)(n).then(function(a) {
            return t.setData({
                onClickLoading: !1
            }), t.getUserInfo(), app.Tips({
                title: a.msg,
                icon: "success"
            });
        }).catch(function(a) {
            return t.setData({
                onClickLoading: !1
            }), app.Tips({
                title: a
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        app.globalData.isLog && this.data.isClone && (this.getUserInfo(), this.getUserExtractBank());
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