var t = require("../../../api/plugin/partner/setting"), a = require("../../../api/plugin/partner/partner"), e = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "合伙人套餐",
            color: !0,
            class: "red"
        },
        navH: e.globalData.navHeight,
        type: 0,
        currentIndex: 0,
        applyInfo: {},
        userInfo: {},
        extends: [],
        payMode: [ {
            name: "微信支付",
            icon: "icon-weixinzhifu",
            value: "weixin",
            title: "微信快捷支付"
        } ],
        pay_close: !1,
        pay_order_id: "",
        diyformDataId: 0,
        totalPrice: "",
        orderKey: "",
        extendsValue: [],
        background: [ {
            url: "../../../images/hehuorenT.png"
        }, {
            url: "../../../images/hehuorenY.png"
        }, {
            url: "../../../images/hehuorenJ.png"
        } ]
    },
    onLoad: function(t) {},
    onLoadFun: function(a) {
        var e = this;
        (0, t.getPartnerInfo)().then(function(t) {
            e.setData({
                applyInfo: t.data.applyInfo,
                userInfo: t.data.userInfo
            });
        });
    },
    submit: function(t) {
        var a = this;
        t.currentTarget.dataset.btn && this.canDo(function() {
            a.submitType(t);
        });
    },
    submitType: function(t) {
        1 == this.data.applyInfo.apply_limit_type && this.submitPayType(t);
    },
    submitPayType: function(t) {
        var a = this, e = {
            payid: t.currentTarget.dataset.payid,
            formId: t.detail.formId,
            payType: a.data.payType,
            diyformDataId: a.data.diyformDataId
        };
        a.setData({
            pay_close: !0,
            orderData: e
        });
    },
    doPaySuccess: function() {
        this.setData({
            isPaySuccess: !0,
            pay_close: !1
        });
    },
    pay_close: function() {
        this.setData({
            pay_close: !1
        });
    },
    pay_complete: function() {
        this.setData({
            pay_close: !1,
            pay_order_id: ""
        });
    },
    pay_fail: function() {
        this.setData({
            pay_close: !1,
            pay_order_id: ""
        });
    },
    onClose: function() {
        this.setData({
            show_form: !1
        });
    },
    canDo: function(t) {
        return 1 == this.data.applyInfo.need_true_login ? e.Tips({
            title: "您还未进行实名认证，请先认证"
        }, {
            tab: 5,
            url: "/membercenter/certification/add/index"
        }) : 1 == this.data.applyInfo.need_true_auth ? e.Tips({
            title: "实名认证正在审核中，请等待"
        }) : void (0 == this.data.diyformDataId && 1 == this.data.applyInfo.need_perfect_name && this.data.applyInfo.apply_diyform > 0 ? this.show_form() : t());
    },
    show_form: function() {
        this.setData({
            show_form: !0
        });
    },
    getDiyFormData: function(t) {
        this.setData({
            extendsValue: t.detail
        });
    },
    formSubmit: function(t) {
        for (var n = this, i = n.data.extendsValue, o = "", r = 0; r < i.extends.length; r++) i.extends[r].err_msg && (o += i.extends[r].err_msg + "\n");
        if (o) return e.Tips({
            title: o
        });
        (0, a.applyFormPartner)(i).then(function(t) {
            if (200 != t.status) return e.Tips({
                title: t.msg,
                icon: "error"
            });
            n.setData({
                diyformDataId: t.data.diyformDataId
            }), n.onClose();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    pagechange: function(t) {
        var a = t.detail.current;
        this.setData({
            currentIndex: a
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});