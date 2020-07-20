var _goods = require("../../../api/goods.js"), _order = require("../../../api/order.js"), _user = require("../../../api/user.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util), _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            navbar: "1",
            return: "1",
            title: "商品详情"
        },
        attribute: {
            cartAttr: !1
        },
        coupon: {
            coupon: !1,
            list: []
        },
        attr: "请选择",
        attrValue: "",
        animated: !1,
        id: 0,
        replyCount: 0,
        reply: [],
        storeInfo: {},
        productAttr: [],
        productValue: [],
        couponList: [],
        productSelect: {},
        cart_num: 1,
        isAuto: !1,
        iShidden: !0,
        isOpen: !1,
        isLog: app.globalData.isLog,
        actionSheetHidden: !1,
        posterImageStatus: !1,
        storeImage: "",
        PromotionCode: "",
        canvasStatus: !1,
        posterImage: "",
        posterbackgd: "/images/posterbackgd.png",
        sharePacket: {
            isState: !0
        },
        uid: 0,
        actions: [ {
            type: "share",
            name: "分享给好友",
            openType: "share"
        }, {
            type: "poster",
            name: "生成海报分享给好友"
        } ]
    },
    onLoadFun: function(t) {
        this.setData({
            isLog: !0
        }), this.getCartCount(), this.downloadFilePromotionCode(), this.getUserInfo(), this.get_product_collect();
    },
    ChangCouponsClone: function() {
        this.setData({
            "coupon.coupon": !1
        });
    },
    getUserInfo: function() {
        var e = this;
        (0, _user.getUserInfo)().then(function(t) {
            e.setData({
                "sharePacket.isState": !t.data.is_promoter,
                uid: t.data.uid
            });
        });
    },
    ChangeCartNum: function(t) {
        if (3 != this.data.storeInfo.buymode) {
            var e = t.detail, a = this.data.productValue[this.data.attrValue];
            if (void 0 !== a || this.data.productAttr.length || (a = this.data.productSelect), 
            void 0 !== a) {
                var o, r, i = a.stock || 0;
                if (null == a.cart_num && (a.cart_num = 1), e) a.cart_num++, a.cart_num > i && (a.cart_num = i), 
                a.cart_num < 1 && (a.cart_num = 1), this.setData((_defineProperty(o = {}, "productSelect.cart_num", a.cart_num), 
                _defineProperty(o, "cart_num", a.cart_num), o)); else a.cart_num--, a.cart_num < 1 && (a.cart_num = 1), 
                this.setData((_defineProperty(r = {}, "productSelect.cart_num", a.cart_num), _defineProperty(r, "cart_num", a.cart_num), 
                r));
            }
        }
    },
    ChangeAttr: function(t) {
        var e, a, o = t.detail, r = this.data.productValue[o], i = this.data.storeInfo;
        r ? this.setData((_defineProperty(e = {}, "productSelect.image", r.image), _defineProperty(e, "productSelect.price", r.price), 
        _defineProperty(e, "productSelect.stock", r.stock), _defineProperty(e, "productSelect.unique", r.unique), 
        _defineProperty(e, "productSelect.cart_num", 1), _defineProperty(e, "attrValue", o), 
        _defineProperty(e, "attr", "已选择"), e)) : this.setData((_defineProperty(a = {}, "productSelect.image", i.image), 
        _defineProperty(a, "productSelect.price", i.price), _defineProperty(a, "productSelect.stock", 0), 
        _defineProperty(a, "productSelect.unique", ""), _defineProperty(a, "productSelect.cart_num", 0), 
        _defineProperty(a, "attrValue", ""), _defineProperty(a, "attr", "请选择"), a));
    },
    ChangCoupons: function(t) {
        var e = t.detail, a = _util2.default.ArrayRemove(this.data.couponList, "id", e.id);
        this.setData({
            couponList: a
        });
    },
    onLoad: function(t) {
        if (t.scene) {
            var e = _util2.default.getUrlParams(decodeURIComponent(t.scene));
            e.id && (t.id = e.id), e.spid && (app.globalData.spid = e.spid);
        }
        if (!t.id) return app.Tips({
            title: "缺少参数无法查看商品"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            id: t.id
        }), t.spid && (app.globalData.spid = t.spid), this.getGoodsDetails();
    },
    getGoodsDetails: function() {
        var r = this;
        (0, _goods.getGoodsDetail)(r.data.id).then(function(t) {
            var e, a = t.data.storeInfo, o = t.data.shopInfo;
            r.setData((_defineProperty(e = {
                storeInfo: a,
                shopInfo: o,
                reply: t.data.reply ? [ t.data.reply ] : [],
                replyCount: t.data.replyCount,
                description: a.description,
                replyChance: t.data.replyChance,
                productAttr: t.data.productAttr,
                productValue: t.data.productValue
            }, "sharePacket.priceName", t.data.priceName), _defineProperty(e, "parameter.title", a.store_name), 
            e)), r.downloadFilestoreImage(), r.DefaultSelect(), _wxParse2.default.wxParse("description", "html", r.data.description, r, 0);
        }).catch(function(t) {
            return app.Tips({
                title: t
            }, {
                tab: 3,
                url: 1
            });
        });
    },
    DefaultSelect: function() {
        for (var t = this.data.productAttr, e = this.data.storeInfo, a = 0, o = t.length; a < o; a++) t[a].attr_value[0] && (t[a].checked = t[a].attr_value[0].attr);
        var r, i, n = this.data.productAttr.map(function(t) {
            return t.checked;
        }), s = this.data.productValue[n.sort().join(",")];
        s ? this.setData((_defineProperty(r = {}, "productSelect.store_name", e.store_name), 
        _defineProperty(r, "productSelect.image", s.image), _defineProperty(r, "productSelect.price", s.price), 
        _defineProperty(r, "productSelect.stock", s.stock), _defineProperty(r, "productSelect.unique", s.unique), 
        _defineProperty(r, "productSelect.buymode", e.buymode), _defineProperty(r, "productSelect.cart_num", 1), 
        _defineProperty(r, "attrValue", n), _defineProperty(r, "attr", "已选择"), r)) : this.setData((_defineProperty(i = {}, "productSelect.store_name", e.store_name), 
        _defineProperty(i, "productSelect.image", e.image), _defineProperty(i, "productSelect.price", e.price), 
        _defineProperty(i, "productSelect.stock", this.data.productAttr.length ? 0 : e.stock), 
        _defineProperty(i, "productSelect.unique", ""), _defineProperty(i, "productSelect.buymode", e.buymode), 
        _defineProperty(i, "productSelect.cart_num", this.data.productAttr.length ? 0 : 1), 
        _defineProperty(i, "attrValue", ""), _defineProperty(i, "attr", "请选择"), i));
        this.setData({
            productAttr: t
        });
    },
    get_product_collect: function() {
        var e = this;
        (0, _goods.getGoodsDetail)(e.data.id).then(function(t) {
            e.setData({
                "storeInfo.userCollect": t.data.storeInfo.userCollect
            });
        });
    },
    getCouponList: function() {
        var r = this;
        getCoupons({
            page: 1,
            limit: 10
        }).then(function(t) {
            for (var e, a = [], o = 0; o < t.data.length; o++) !t.data[o].is_use && a.length < 2 && a.push(t.data[o]);
            r.setData((_defineProperty(e = {}, "coupon.list", t.data), _defineProperty(e, "couponList", a), 
            e));
        });
    },
    setCollect: function() {
        if (!1 === app.globalData.isLog) this.setData({
            isAuto: !0,
            iShidden: !1
        }); else {
            var e = this;
            this.data.storeInfo.userCollect ? (0, _goods.collectDel)(this.data.storeInfo.id).then(function(t) {
                e.setData(_defineProperty({}, "storeInfo.userCollect", !e.data.storeInfo.userCollect));
            }) : (0, _goods.collectAdd)(this.data.storeInfo.id).then(function(t) {
                e.setData(_defineProperty({}, "storeInfo.userCollect", !e.data.storeInfo.userCollect));
            });
        }
    },
    selecAttr: function() {
        !1 === app.globalData.isLog ? this.setData({
            isAuto: !0,
            iShidden: !1
        }) : this.setData({
            "attribute.cartAttr": !0,
            isOpen: !0
        });
    },
    coupon: function() {
        !1 === app.globalData.isLog ? this.setData({
            isAuto: !0,
            iShidden: !1
        }) : (this.getCouponList(), this.setData({
            "coupon.coupon": !0
        }));
    },
    onMyEvent: function(t) {
        this.setData({
            "attribute.cartAttr": t.detail.window,
            isOpen: !1
        });
    },
    joinCart: function(t) {
        !1 === app.globalData.isLog ? this.setData({
            isAuto: !0,
            iShidden: !1
        }) : this.goCat();
    },
    goCat: function(e) {
        var a = this, t = this.data.productValue[this.data.attrValue];
        return this.data.attrValue ? this.setData({
            "attribute.cartAttr": !this.data.isOpen
        }) : this.data.isOpen ? this.setData({
            "attribute.cartAttr": !0
        }) : this.setData({
            "attribute.cartAttr": !this.data.attribute.cartAttr
        }), !0 === this.data.attribute.cartAttr && 0 == this.data.isOpen ? this.setData({
            isOpen: !0
        }) : this.data.productAttr.length && void 0 === t && 1 == this.data.isOpen ? app.Tips({
            title: "请选择属性"
        }) : void (0, _order.postCartAdd)({
            productId: a.data.id,
            cartNum: a.data.cart_num,
            uniqueId: void 0 !== t ? t.unique : "",
            new: void 0 === e ? 0 : 1
        }).then(function(t) {
            a.setData({
                isOpen: !1,
                "attribute.cartAttr": !1
            }), e ? wx.navigateTo({
                url: "/order/pages/order_confirm/index?cartId=" + t.data.cartId
            }) : app.Tips({
                title: "添加购物车成功",
                icon: "success"
            }, function() {
                a.getCartCount(!0);
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    getCartCount: function(a) {
        var o = this;
        (0, _order.getCartCounts)().then(function(t) {
            var e;
            (o.setData({
                CartCount: t.data.count
            }), a) && (o.setData((_defineProperty(e = {
                animated: !0,
                attrValue: "",
                attr: "请选择"
            }, "productSelect.image", o.data.storeInfo.image), _defineProperty(e, "productSelect.price", o.data.storeInfo.price), 
            _defineProperty(e, "productSelect.stock", o.data.storeInfo.stock), _defineProperty(e, "productSelect.unique", ""), 
            _defineProperty(e, "productSelect.cart_num", 1), e)), o.selectComponent("#product-window").ResetAttr(), 
            setTimeout(function() {
                o.setData({
                    animated: !1
                });
            }, 500));
        });
    },
    goBuy: function(t) {
        !1 === app.globalData.isLog ? this.setData({
            isAuto: !0,
            iShidden: !1
        }) : this.goCat(!0);
    },
    listenerActionSheet: function() {
        !1 === app.globalData.isLog ? this.setData({
            isAuto: !0,
            iShidden: !1
        }) : this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    posterImageClose: function() {
        this.setData({
            posterImageStatus: !1
        });
    },
    setDomain: function(t) {
        return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
    },
    downloadFilestoreImage: function() {
        var e = this;
        wx.downloadFile({
            url: e.setDomain(e.data.storeInfo.image),
            success: function(t) {
                e.setData({
                    storeImage: t.tempFilePath
                });
            },
            fail: function() {
                return app.Tips({
                    title: ""
                });
            }
        });
    },
    downloadFilePromotionCode: function(e) {
        var a = this;
        (0, _goods.getGoodsQrCode)(this.data.id).then(function(t) {
            wx.downloadFile({
                url: a.setDomain(t.data.code),
                success: function(t) {
                    "function" == typeof e ? e && e(t.tempFilePath) : a.setData({
                        PromotionCode: t.tempFilePath
                    });
                },
                fail: function() {
                    a.setData({
                        PromotionCode: ""
                    });
                }
            });
        }).catch(function(t) {
            a.setData({
                PromotionCode: ""
            });
        });
    },
    goPoster: function() {
        var e = this;
        e.setData({
            canvasStatus: !0
        });
        var a = [ e.data.posterbackgd, e.data.storeImage, e.data.PromotionCode ];
        wx.getImageInfo({
            src: e.data.PromotionCode,
            fail: function(t) {
                return app.Tips({
                    title: "小程序二维码需要发布正式版后才能获取到"
                });
            },
            success: function() {
                "" == a[2] ? e.downloadFilePromotionCode(function(t) {
                    if (a[2] = t, "" == a[2]) return app.Tips({
                        title: "海报二维码生成失败！"
                    });
                    _util2.default.PosterCanvas(a, e.data.storeInfo.store_name, e.data.storeInfo.price, function(t) {
                        e.setData({
                            posterImage: t,
                            posterImageStatus: !0,
                            canvasStatus: !1,
                            actionSheetHidden: !1
                        });
                    });
                }) : _util2.default.PosterCanvas(a, e.data.storeInfo.store_name, e.data.storeInfo.price, function(t) {
                    e.setData({
                        posterImage: t,
                        posterImageStatus: !0,
                        canvasStatus: !1,
                        actionSheetHidden: !1
                    });
                });
            }
        });
    },
    savePosterPath: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                    filePath: e.data.posterImage,
                    success: function(t) {
                        e.posterImageClose(), app.Tips({
                            title: "保存成功",
                            icon: "success"
                        });
                    },
                    fail: function(t) {
                        app.Tips({
                            title: "保存失败"
                        });
                    }
                }) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.saveImageToPhotosAlbum({
                            filePath: e.data.posterImage,
                            success: function(t) {
                                e.posterImageClose(), app.Tips({
                                    title: "保存成功",
                                    icon: "success"
                                });
                            },
                            fail: function(t) {
                                app.Tips({
                                    title: "保存失败"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    selectActionSheet: function(t) {
        this.setData({
            actionSheetHidden: !1
        }), "poster" == t.detail.type && this.goPoster();
    },
    onShareAppMessage: function() {
        var t = this;
        t.setData({
            actionSheetHidden: !t.data.actionSheetHidden
        });
        var e = "/goods/pages/goods_details/index?id=" + t.data.id + "&spid=" + app.globalData.userInfo.id + "&mid=" + app.globalData.userInfo.id;
        return {
            title: t.data.storeInfo.store_name || "",
            imageUrl: t.data.storeInfo.image || "",
            path: e
        };
    }
});