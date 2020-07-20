var _common = require("../../../api/common.js"), _order = require("../../../api/order.js"), _goods = require("../../../api/goods.js");

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var template = require("../../../common/template/template.js"), app = getApp(), util = require("../../../lib/utils/util.js");

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "购物车",
            color: !1
        },
        deviceType: app.globalData.deviceType,
        navH: 0,
        validLenth: 0,
        selectCartCount: 0,
        goodsHidden: !0,
        footerswitch: !0,
        host_product: [],
        cartList: [],
        isAllSelect: !1,
        selectValue: [],
        selectCountPrice: 0,
        isGoIndex: !0,
        iShidden: !1,
        titles: [],
        count:''
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            navH: app.globalData.navHeight
        }), app.globalData.token && e.setData({
            iShidden: !0
        }), (0, _common.getCartData)().then(function(t) {
            e.setData({
                titles: t.data.titles
            });
        }), template.tabbar("tabBar", 2, e);
    },
    onCloseAuto: function() {
        this.setData({
            iShidden: !0
        });
    },
    subDel: function(t) {
        t.detail.formId;
        var e = this, a = e.data.selectValue;
        if (!(0 < a.length)) return app.Tips({
            title: "请选择产品"
        });
        (0, _order.cartDel)(a).then(function(t) {
            e.getCartList();
        });
    },
    getSelectValueProductId: function() {
        var t = this, e = t.data.cartList.valid, a = t.data.selectValue, r = [];
        if (this.data.cartList.enable_plugin_merch) {
            if (0 < a.length) {
                var n = e;
                for (var i in n) for (var o in n[i].goods) t.inArray(n[i].goods[o].id, a) && r.push(n[i].goods[o].product_id);
            }
        } else if (0 < a.length) for (var o in e) t.inArray(e[o].id, a) && r.push(e[o].product_id);
        return r;
    },
    subCollect: function(t) {
        t.detail.formId;
        var e = this;
        if (!(0 < e.data.selectValue.length)) return app.Tips({
            title: "请选择产品"
        });
        e.getSelectValueProductId();
        (0, _goods.collectAll)(e.getSelectValueProductId().join(",")).then(function(t) {
            return app.Tips({
                title: t.msg,
                icon: "success"
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    subOrder: function(t) {
        t.detail.formId;
        var e = this.data.selectValue;
        if (!(0 < e.length)) return app.Tips({
            title: "请选择需要购买的商品"
        });
        wx.navigateTo({
            url: "/order/pages/order_confirm/index?cartId=" + e.join(",")
        });
    },
    checkboxAllChange: function(t) {
        0 < t.detail.value.length ? this.setAllSelectValue(1) : this.setAllSelectValue(0);
    },
    setAllSelectValue: function(t) {
        var e = this, a = [], r = e.data.cartList.valid;
        if (e.data.cartList.enable_plugin_merch) {
            var n = r;
            if (0 < r.length) {
                var i;
                for (var o in n) for (var c in n[o].goods) 1 == t ? (n[o].goods[c].checked = !0, 
                a.push(n[o].goods[c].id)) : n[o].goods[c].checked = !1;
                var d = "cartList.valid";
                e.setData((_defineProperty(i = {}, d, r), _defineProperty(i, "selectValue", a), 
                i)), e.switchSelect();
            }
        } else if (0 < r.length) {
            var s;
            for (var c in r) 1 == t ? (r[c].checked = !0, a.push(r[c].id)) : r[c].checked = !1;
            d = "cartList.valid";
            e.setData((_defineProperty(s = {}, d, r), _defineProperty(s, "selectValue", a), 
            s)), e.switchSelect();
        }
    },
    checkboxChange: function(t) {
        var e = t.detail.value, a = this.data.cartList.valid;
        if (this.data.cartList.enable_plugin_merch) {
            var r, n = a;
            for (var i in n) for (var o in n[i].goods) this.inArray(n[i].goods[o].id, e) ? n[i].goods[o].checked = !0 : n[i].goods[o].checked = !1;
            a = n;
            var c = "cartList.valid";
            this.setData((_defineProperty(r = {}, c, a), _defineProperty(r, "isAllSelect", e.length == this.data.validLenth), 
            _defineProperty(r, "selectValue", e), r));
        } else {
            var d;
            for (var o in a) this.inArray(a[o].id, e) ? a[o].checked = !0 : a[o].checked = !1;
            c = "cartList.valid";
            this.setData((_defineProperty(d = {}, c, a), _defineProperty(d, "isAllSelect", e.length == this.data.cartList.valid.length), 
            _defineProperty(d, "selectValue", e), d));
        }
        this.switchSelect();
    },
    inArray: function(t, e) {
        for (var a in e) if (e[a] == t) return !0;
        return !1;
    },
    switchSelect: function() {
        var t = this, e = t.data.cartList.valid, a = t.data.selectValue, r = 0;
        if (this.data.cartList.enable_plugin_merch) {
            var n = e;
            if (a.length < 1) t.setData({
                selectCountPrice: r,
                selectCartCount: 0
            }); else {
                var i = 0;
                for (var o in n) for (var c in n[o].goods) t.inArray(n[o].goods[c].id, a) && (r = Number(r) + Number(n[o].goods[c].cart_num) * Number(n[o].goods[c].truePrice), 
                i++);
                t.setData({
                    selectCountPrice: r.toFixed(2),
                    selectCartCount: i
                });
            }
        } else if (a.length < 1) t.setData({
            selectCountPrice: r,
            selectCartCount: 0
        }); else {
            i = 0;
            for (var c in e) t.inArray(e[c].id, a) && (r = Number(r) + Number(e[c].cart_num) * Number(e[c].truePrice), 
            i++);
            t.setData({
                selectCountPrice: r.toFixed(2),
                selectCartCount: i
            });
        }
    },
    subCart: function(t) {
        var a = this, e = !1, r = t.currentTarget.dataset.index;
        if (this.data.cartList.enable_plugin_merch) {
            var n = t.currentTarget.dataset.group_index;
            (i = a.data.cartList.valid[n].goods[r]).cart_num = i.cart_num - 1, i.cart_num < 1 && (e = !0), 
            i.cart_num <= 1 ? (i.cart_num = 1, i.numSub = !0) : (i.numSub = !1, i.numAdd = !1), 
            0 == e && a.setCartNum(i.id, i.cart_num, function(t) {
                var e = "cartList.valid[" + n + "].goods[" + r + "]";
                a.setData(_defineProperty({}, e, i)), a.switchSelect();
            });
        } else {
            var i;
            (i = a.data.cartList.valid[r]).cart_num = i.cart_num - 1, i.cart_num < 1 && (e = !0), 
            i.cart_num <= 1 ? (i.cart_num = 1, i.numSub = !0) : (i.numSub = !1, i.numAdd = !1), 
            0 == e && a.setCartNum(i.id, i.cart_num, function(t) {
                var e = "cartList.valid[" + r + "]";
                a.setData(_defineProperty({}, e, i)), a.switchSelect();
            });
        }
    },
    addCart: function(t) {
        var a = this, r = t.currentTarget.dataset.index;
        if (this.data.cartList.enable_plugin_merch) {
            var n = t.currentTarget.dataset.group_index;
            (i = a.data.cartList.valid[n].goods[r]).cart_num = i.cart_num + 1, i.productInfo.hasOwnProperty("attrInfo") && i.cart_num >= i.productInfo.attrInfo.stock ? (i.cart_num = i.productInfo.attrInfo.stock, 
            i.numAdd = !0) : i.cart_num >= i.productInfo.stock ? (i.cart_num = i.productInfo.stock, 
            i.numAdd = !0) : i.numAdd = !1, i.numSub = !1, a.setCartNum(i.id, i.cart_num, function(t) {
                var e = "cartList.valid[" + n + "].goods[" + r + "]";
                a.setData(_defineProperty({}, e, i)), a.switchSelect();
            });
        } else {
            var i;
            (i = a.data.cartList.valid[r]).cart_num = i.cart_num + 1, i.productInfo.hasOwnProperty("attrInfo") && i.cart_num >= i.productInfo.attrInfo.stock ? (i.cart_num = i.productInfo.attrInfo.stock, 
            i.numAdd = !0) : i.cart_num >= i.productInfo.stock ? (i.cart_num = i.productInfo.stock, 
            i.numAdd = !0) : i.numAdd = !1, i.numSub = !1, a.setCartNum(i.id, i.cart_num, function(t) {
                var e = "cartList.valid[" + r + "]";
                a.setData(_defineProperty({}, e, i)), a.switchSelect();
            });
        }
    },
    setCartNum: function(t, e, a) {
        (0, _order.changeCartNum)(t, e).then(function(t) {
            a && a(t.data);
        }).catch(function(t) {
            wx.showToast({
                icon: "none",
                title: t
            });
        });
    },
    getCartList: function() {
        var c = this;
        (0, _order.getCartList)().then(function(t) {
            var e = t.data;
            c.setData({
                count:e.count
            })
            if (e.enable_plugin_merch) {
                var a = 0, r = e.valid;
                if (0 < Object.keys(r).length) {
                    for (var n in r) for (var i in r[n].goods) {
                        1 == r[n].goods[i].cart_num ? r[n].goods[i].numSub = !0 : r[n].goods[i].numSub = !1, 
                        r[n].goods[i].productInfo.hasOwnProperty("attrInfo") && r[n].goods[i].cart_num == r[n].goods[i].productInfo.attrInfo.stock ? r[n].goods[i].numAdd = !0 : r[n].goods[i].cart_num == r[n].goods[i].productInfo.stock ? r[n].goods[i].numAdd = !0 : r[n].goods[i].numAdd = !1, 
                        r[n].goods[i].checked = !1, a++;
                    }
                    e.valid = Object.values(r), e.invalid = Object.values(e.invalid);
                } else {
                    var o = e.valid;
                    if (0 < o.length) {
                        for (var i in o) {
                            1 == o[i].cart_num ? o[i].numSub = !0 : o[i].numSub = !1, o[i].productInfo.hasOwnProperty("attrInfo") && o[i].cart_num == o[i].productInfo.attrInfo.stock ? o[i].numAdd = !0 : o[i].cart_num == o[i].productInfo.stock ? o[i].numAdd = !0 : o[i].numAdd = !1, 
                            o[i].checked = !1;
                        }
                        e.valid = o;
                    }
                }
            }
            c.setData({
                validLenth: a,
                cartList: e,
                goodsHidden: !(e.valid.length <= 0)
            }), c.switchSelect();
        });
    },
    goodsOpen: function() {
        this.setData({
            goodsHidden: !this.data.goodsHidden
        });
    },
    manage: function() {
        this.setData({
            footerswitch: !this.data.footerswitch
        });
    },
    onReady: function() {},
    onLoadFun: function() {
        this.getCartList();
    },
    onShow: function() {
        1 == app.globalData.isLog && (this.getCartList(), this.setData({
            goodsHidden: !0,
            footerswitch: !0,
            host_product: [],
            cartList: [],
            isAllSelect: !1,
            selectValue: [],
            selectCountPrice: 0,
            cartCount: 0,
            iShidden: !0
        }));
    },
    unsetCart: function() {
        var e = this, t = [];
        if (this.data.cartList.enable_plugin_merch) {
            var a = e.data.cartList.invalid;
            for (var r in a) for (var n in a[r].goods) t.push(a[r].goods[n].id);
        } else for (var i = 0, o = e.data.cartList.invalid.length; i < o; i++) t.push(e.data.cartList.invalid[i].id);
        (0, _order.cartDel)(t).then(function(t) {
            app.Tips({
                title: "清除成功"
            }), e.setData({
                "cartList.invalid": []
            });
        }).catch(function(t) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.selectComponent("#recommend").getHostProduct();
    }
});