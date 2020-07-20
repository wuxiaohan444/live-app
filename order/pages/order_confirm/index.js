var _order = require("../../../api/order.js"), _user = require("../../../api/user.js"), app = getApp(), util = require("../../../lib/utils/util.js");

Page({
    data: {
        textareaStatus: !0,
        parameter: {
            navbar: "1",
            return: "1",
            title: "提交订单"
        },
        payMode: [ {
            name: "微信支付",
            icon: "icon-weixinzhifu",
            value: "weixin",
            title: "微信快捷支付"
        }, {
            name: "余额支付",
            icon: "icon-yuezhifu",
            value: "yue",
            title: "可用余额:",
            number: 0
        } ],
        payType: "weixin",
        openType: 1,
        active: 0,
        coupon: {
            coupon: !1,
            list: [],
            statusTile: "立即使用"
        },
        address: {
            address: !1
        },
        addressInfo: {},
        pinkId: 0,
        addressId: 0,
        couponId: 0,
        cartId: "",
        userInfo: {},
        mark: "",
        marks: {},
        couponTitle: "请选择",
        coupon_price: 0,
        useIntegral: !1,
        integral_price: 0,
        ChangePrice: 0,
        formIds: [],
        status: 0,
        is_address: !1,
        isClose: !1,
        pay_close: !1,
        toPay: !1,
        goodsLength: 0
    },
    onLoadFun: function() {
        this.getaddressInfo(), this.getConfirm(), this.selectComponent("#address-window").getAddressList();
    },
    onShow: function() {
        this.setData({
            textareaStatus: !0,
            "address.address": !1
        }), app.globalData.isLog && this.data.isClose && 0 == this.data.toPay && (this.getaddressInfo(), 
        this.selectComponent("#address-window").getAddressList());
    },
    onHide: function() {
        this.setData({
            isClose: !0
        });
    },
    ChangCouponsClone: function() {
        this.setData({
            "coupon.coupon": !1
        });
    },
    changeTextareaStatus: function() {
        for (var t = 0, a = this.data.coupon.list.length; t < a; t++) this.data.coupon.list[t].use_title = "", 
        this.data.coupon.list[t].is_use = 0;
        this.setData({
            textareaStatus: !0,
            status: 0,
            "coupon.list": this.data.coupon.list
        });
    },
    ChangCoupons: function(t) {
        for (var a = t.detail, e = this.data.coupon.list, i = "请选择", s = 0, r = 0, d = 0, n = 0, o = 0, u = e.length; o < u; o++) o != a && (e[o].use_title = "", 
        e[o].is_use = 0), e[o].id == this.data.couponId && (n = e[o].coupon_price);
        if (this.data.totalPrice <= 0 && 1 != this.data.status) return app.Tips({
            title: "支付金额为0无法使用优惠卷！"
        });
        if (1 == this.data.status || this.data.is_address ? this.setData({
            totalPrice: this.data.priceGroup.totalPrice
        }) : this.setData({
            totalPrice: util.$h.Add(this.data.totalPrice, n)
        }), e[a].is_use) e[a].use_title = "", (e[a].is_use = 0) < (d = this.data.totalPrice) && this.data.useIntegral && !this.data.is_Integral && (d = this.changeCouponPrice(d, this.data.userInfo.integral), 
        this.setData({
            is_Integral: !0
        })), this.data.status = 0; else if (e[a].use_title = "不使用", e[a].is_use = 1, i = e[a].coupon_title, 
        s = e[a].id, r = e[a].coupon_price, this.data.totalPrice < r && this.data.useIntegral) {
            var l = util.$h.Sub(r, this.data.totalPrice), c = util.$h.Div(l, this.data.integralRatio);
            this.setData({
                integral: util.$h.Add(this.data.integral, c),
                integral_price: util.$h.Sub(this.data.integral_price, l)
            }), d = 0, this.data.status = 0;
        } else this.data.totalPrice < r && !this.data.useIntegral ? (d = 0, this.data.status = 1) : this.data.totalPrice > r && this.data.useIntegral ? (d = util.$h.Sub(this.data.totalPrice, e[a].coupon_price), 
        0 < this.data.integral && (d = this.changeCouponPrice(d, this.data.integral)), this.data.status = 0) : this.data.totalPrice > r && !this.data.useIntegral && (d = util.$h.Sub(this.data.totalPrice, e[a].coupon_price), 
        this.data.status = 0);
        this.setData({
            couponTitle: i,
            couponId: s,
            "coupon.coupon": !1,
            "coupon.list": e,
            coupon_price: r,
            totalPrice: d,
            status: this.data.status
        });
    },
    changeCouponPrice: function(t, a) {
        var e = util.$h.Mul(this.data.integralRatio, a);
        if (this.data.integral_price = 0, t < e) {
            var i = util.$h.Sub(e, t), s = util.$h.Div(i, this.data.integralRatio);
            this.setData({
                integral: s,
                integral_price: this.data.totalPrice
            }), t = 0;
        } else this.setData({
            integral: 0,
            integral_price: util.$h.Add(this.data.integral_price, e)
        }), t = util.$h.Sub(t, e);
        return t;
    },
    ChangeIntegral: function() {
        var t = parseFloat(this.data.integral);
        if (this.data.userInfo.integral <= 0) return app.Tips({
            title: "您当前积分为较低不能使用抵扣"
        }, function() {
            this.setData({
                useIntegral: !1
            });
        }.bind(this));
        if (this.data.totalPrice <= 0 && !this.data.useIntegral) return app.Tips({
            title: "当前支付金额不能在使用积分抵扣啦~"
        }, function() {
            this.setData({
                useIntegral: !1
            });
        }.bind(this));
        if (this.setData({
            useIntegral: !this.data.useIntegral
        }), this.data.useIntegral) {
            var a = util.$h.Mul(this.data.integralRatio, t);
            if (a > this.data.totalPrice) {
                var e = util.$h.Sub(a, this.data.totalPrice), i = util.$h.Div(e, this.data.integralRatio);
                console.log(i, e, a, this.data.integralRatio), this.setData({
                    integral: i,
                    integral_price: this.data.totalPrice,
                    totalPrice: 0
                });
            } else this.setData({
                integral: 0,
                integral_price: a,
                totalPrice: util.$h.Sub(this.data.totalPrice, a)
            });
        } else {
            var s = this.data.integral_price;
            this.setData({
                integral_price: 0,
                integral: this.data.userInfo.integral,
                totalPrice: util.$h.Add(this.data.totalPrice, s.toString())
            });
        }
    },
    OnChangeAddress: function(t) {
        this.setData({
            textareaStatus: !0,
            addressId: t.detail,
            "address.address": !1
        }), this.getaddressInfo();
    },
    onLoad: function(t) {
        if (!t.cartId) return app.Tips({
            title: "请选择要购买的商品"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            couponId: t.couponId || 0,
            pinkId: t.pinkId ? parseInt(t.pinkId) : 0,
            addressId: t.addressId || 0,
            cartId: t.cartId,
            is_address: !!t.is_address
        });
    },
    bindHideKeyboard: function(t) {
        if (this.data.enable_plugin_merch) {
            var a = t.currentTarget.dataset.store_id, e = this.data.marks;
            e[a] = t.detail.value, this.setData({
                marks: e
            });
        } else this.setData({
            mark: t.detail.value
        });
    },
    getConfirm: function() {
        var r = this, d = this;
        (0, _order.orderConfirm)(this.data.cartId).then(function(t) {
            var a = t.data.cartInfo;
            if (t.data.enable_plugin_merch && (a = Object.values(a)), t.data.enable_plugin_merch) {
                var e = 0;
                for (var i in a) for (var s in a[i].goods) e++;
                r.setData({
                    goodsLength: e
                });
            }
            d.setData({
                enable_plugin_merch: t.data.enable_plugin_merch,
                userInfo: t.data.userInfo,
                integral: t.data.userInfo.integral,
                cartInfo: a,
                integralRatio: t.data.integralRatio,
                offlinePostage: t.data.offlinePostage,
                orderKey: t.data.orderKey,
                priceGroup: t.data.priceGroup,
                totalPrice: app.help().Add(parseFloat(t.data.priceGroup.totalPrice), parseFloat(t.data.priceGroup.storePostage)),
                seckillId: parseInt(t.data.seckill_id),
                usableCoupon: t.data.usableCoupon
            }), d.setData({
                cartArr: d.data.cartArr,
                ChangePrice: d.data.totalPrice
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            }, {
                tab: 3,
                url: 1
            });
        });
    },
    getaddressInfo: function() {
        var a = this;
        a.data.addressId ? (0, _user.getAddressDetail)(a.data.addressId).then(function(t) {
            t.data.is_default = parseInt(t.data.is_default), a.setData({
                addressInfo: t.data || {},
                addressId: t.data.id || 0,
                "address.addressId": t.data.id || 0
            });
        }) : (0, _user.getAddressDefault)().then(function(t) {
            t.data.is_default = 1, a.setData({
                addressInfo: t.data || {},
                addressId: t.data.id || 0,
                "address.addressId": t.data.id || 0
            });
        });
    },
    payItem: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        a.setData({
            active: e,
            animated: !0,
            payType: a.data.cartArr[e].value
        }), setTimeout(function() {
            a.car();
        }, 500);
    },
    coupon: function() {
        this.setData({
            "coupon.coupon": !0
        });
    },
    car: function() {
        this.setData({
            animated: !1
        });
    },
    onAddress: function() {
        this.setData({
            textareaStatus: !1,
            "address.address": !0,
            pagesUrl: "/membercenter/user_address_list/index?cartId=" + this.data.cartId + "&pinkId=" + this.data.pinkId + "&couponId=" + this.data.couponId
        });
    },
    selectPayType: function() {},
    SubOrder: function(t) {
        var a, e = this;
        if (!this.data.addressId) return app.Tips({
            title: "请选择收货地址"
        });
        a = {
            addressId: e.data.addressId,
            couponId: e.data.couponId,
            payType: e.data.payType,
            useIntegral: e.data.useIntegral,
            bargainId: e.data.BargainId,
            combinationId: e.data.combinationId,
            pinkId: e.data.pinkId,
            seckill_id: e.data.seckillId,
            mark: e.data.mark,
            marks: e.data.marks
        }, this.setData({
            pay_close: !0,
            orderData: a
        });
    },
    doOrderPay: function(t) {}
});