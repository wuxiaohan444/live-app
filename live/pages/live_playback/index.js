var _data, _Page, _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse), _order = require("../../../api/order.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util), _live = require("../../../api/live"), _goods = require("../../../api/goods"), _common = require("../../../api/common");

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

Page((_defineProperty(_Page = {
    data: (_data = {
        playback: 0,
        live: {},
        comments: [],
        recommend_goods: [],
        chatConfig: {},
        chat_notice: "",
        random: "",
        userInfo: {},
        goods: [],
        navH: 0,
        winH: 0,
        hoverLike: 0,
        isInput: !1,
        showNotice: !1,
        popPayShow: !1,
        scrollT: 0,
        goods_id: 0,
        cart_num: 0,
        goodsCount: 0,
        actionSheetHidden: !1,
        likeCount: 0,
        welcome: "",
        attribute: {
            cartAttr: !1
        },
        productAttr: [],
        posterbackgd: "/images/posterbackgd.png",
        productSelect: {},
        storeImage: "",
        inputValue: ""
    }, _defineProperty(_data, "comments", []), _defineProperty(_data, "examineKeywords", {}), 
    _defineProperty(_data, "actions", [ {
        type: "share",
        name: "分享给好友",
        openType: "share"
    }, {
        type: "poster",
        name: "生成海报分享给好友"
    } ]), _data),
    gopages: function(t) {
        t.target.dataset.url && wx.redirectTo({
            url: t.target.dataset.url
        });
    },
    onLoadFun: function(t) {
        this.getLivePlayback(this.data.playback);
    },
    getLivePlayback: function(t) {
        var e = this;
        wx.showLoading(), (0, _live.getLivePlayback)(t).then(function(t) {
            e.setData({
                userInfo: t.data.userInfo,
                live: t.data.live,
                goodsCount: t.data.goodsCount,
                is_follow: t.data.is_follow,
                chat_notice: t.data.chat_notice,
                recommend_goods: t.data.recommend_goods
            }), e.downloadFilestoreImage(), e.downloadFilePromotionCode(), e.getCommentsLists(), 
            wx.hideLoading();
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    getCommentsLists: function() {
        var e = this;
        (0, _live.getCommentsLists)(this.data.live.live_id).then(function(t) {
            e.setData({
                comments: t.data
            });
        }).catch(function(t) {
            e.setData({
                comments: []
            });
        });
    },
    onLoad: function(t) {
        if (t.scene) {
            var e = _util2.default.getUrlParams(decodeURIComponent(t.scene));
            e.playback && (t.playback = e.playback), e.spid && (app.globalData.spid = e.spid);
        }
        if (!t.playback) return app.Tips({
            title: "缺少参数无法查看"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            playback: t.playback
        }), t.spid && (app.globalData.spid = t.spid), this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var e = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            e.setData({
                examineKeywords: t.data
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, e, 0);
        }).catch(function(t) {});
    },
    follow: function() {
        var e = this;
        (0, _live.followLive)(e.data.live.live_id, 1).then(function(t) {
            e.setData({
                is_follow: t.data.is_follow
            });
        });
    },
    liveBack: function() {
        1 < getCurrentPages().length ? wx.navigateBack() : wx.reLaunch({
            url: "/common/pages/loading/loading"
        });
    },
    getPopPay: function() {
        this.getLiveGoods();
    },
    getLiveGoods: function() {
        var e = this;
        (0, _live.getLiveGoods)(e.data.live.live_id).then(function(t) {
            e.setData({
                goods: t.data.goods,
                popPayShow: !0
            });
        });
    },
    closePopPay: function() {
        this.setData({
            popPayShow: !1
        });
    },
    onReady: function() {
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            screenTotalH: app.globalData.screenTotalH
        });
    },
    getInput: function() {
        this.triggerEvent("getInput", !0), this.setData({
            isInput: !0
        });
    },
    closeInput: function() {
        this.setData({
            isInput: !1
        });
    },
    getShowNotice: function() {
        this.setData({
            showNotice: !this.data.showNotice
        });
    },
    onShow: function() {}
}, "closeInput", function() {
    this.setData({
        isInput: !1
    });
}), _defineProperty(_Page, "onInput", function(t) {
    this.setData({
        inputValue: t.detail.value
    });
}), _defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "queryMultipleNodes", function() {
    var e = this;
    wx.nextTick(function() {
        wx.createSelectorQuery().in(e).select("#chatInfo").boundingClientRect(function(t) {
            t && (console.log(3333, t), e.setData({
                scrollT: t.height
            }));
        }).exec();
    });
}), _defineProperty(_Page, "joinCart", function(t) {
    var e = t.currentTarget.dataset.goodsid;
    this.getGoodsDetails(e), this.setData({
        "attribute.cartAttr": !0,
        isOpen: !0
    }), this.closePopPay();
}), _defineProperty(_Page, "closePopCart", function() {
    this.setData({
        "attribute.cartAttr": !1,
        isOpen: !1
    }), this.getPopPay();
}), _defineProperty(_Page, "goCat", function(t) {
    var e = this, a = t.currentTarget.dataset.ispay, o = this.data.productValue[this.data.attrValue];
    return this.data.attrValue ? (this.setData({
        "attribute.cartAttr": !this.data.isOpen
    }), this.data.attribute.cartAttr ? this.closePopPay() : this.getPopPay()) : this.data.isOpen ? (this.setData({
        "attribute.cartAttr": !0
    }), this.closePopPay()) : (this.setData({
        "attribute.cartAttr": !this.data.attribute.cartAttr
    }), this.data.attribute.cartAttr ? this.closePopPay() : this.getPopPay()), !0 === this.data.attribute.cartAttr && 0 == this.data.isOpen ? this.setData({
        isOpen: !0
    }) : this.data.productAttr.length && void 0 === o && 1 == this.data.isOpen ? app.Tips({
        title: "请选择属性"
    }) : void (0, _order.postCartAdd)({
        productId: e.data.goods_id,
        relation_type: 1,
        relation_id: e.data.live.live_id,
        cartNum: e.data.cart_num,
        uniqueId: void 0 !== o ? o.unique : "",
        new: 0 === a ? 0 : 1
    }).then(function(t) {
        e.setData({
            isOpen: !1,
            "attribute.cartAttr": !1
        }), e.getPopPay(), a ? wx.redirectTo({
            url: "/order/pages/order_confirm/index?cartId=" + t.data.cartId
        }) : app.Tips({
            title: "添加购物车成功",
            icon: "success"
        }, function() {});
    }).catch(function(t) {
        return app.Tips({
            title: t
        });
    });
}), _defineProperty(_Page, "getGoodsDetails", function(a) {
    var o = this;
    (0, _goods.getGoodsDetail)(a).then(function(t) {
        var e = t.data.storeInfo;
        o.setData({
            storeInfo: e,
            goods_id: a,
            productAttr: t.data.productAttr,
            productValue: t.data.productValue
        }), o.DefaultSelect(), _wxParse2.default.wxParse("description", "html", o.data.description, o, 0);
    }).catch(function(t) {
        return app.Tips({
            title: t
        });
    });
}), _defineProperty(_Page, "DefaultSelect", function() {
    for (var t = this.data.productAttr, e = this.data.storeInfo, a = 0, o = t.length; a < o; a++) t[a].attr_value[0] && (t[a].checked = t[a].attr_value[0].attr);
    var i, r, n = this.data.productAttr.map(function(t) {
        return t.checked;
    }), s = this.data.productValue[n.sort().join(",")];
    s ? this.setData((_defineProperty(i = {}, "productSelect.store_name", e.store_name), 
    _defineProperty(i, "productSelect.image", s.image), _defineProperty(i, "productSelect.price", s.price), 
    _defineProperty(i, "productSelect.stock", s.stock), _defineProperty(i, "productSelect.unique", s.unique), 
    _defineProperty(i, "productSelect.cart_num", 1), _defineProperty(i, "attrValue", n), 
    _defineProperty(i, "attr", "已选择"), i)) : this.setData((_defineProperty(r = {}, "productSelect.store_name", e.store_name), 
    _defineProperty(r, "productSelect.image", e.image), _defineProperty(r, "productSelect.price", e.price), 
    _defineProperty(r, "productSelect.stock", this.data.productAttr.length ? 0 : e.stock), 
    _defineProperty(r, "productSelect.unique", ""), _defineProperty(r, "productSelect.cart_num", this.data.productAttr.length ? 0 : 1), 
    _defineProperty(r, "attrValue", ""), _defineProperty(r, "attr", "请选择"), r));
    this.setData({
        productAttr: t
    });
}), _defineProperty(_Page, "ChangeAttr", function(t) {
    var e, a, o = t.detail, i = this.data.productValue[o], r = this.data.storeInfo;
    i ? this.setData((_defineProperty(e = {}, "productSelect.image", i.image), _defineProperty(e, "productSelect.price", i.price), 
    _defineProperty(e, "productSelect.stock", i.stock), _defineProperty(e, "productSelect.unique", i.unique), 
    _defineProperty(e, "productSelect.cart_num", 1), _defineProperty(e, "attrValue", o), 
    _defineProperty(e, "attr", "已选择"), e)) : this.setData((_defineProperty(a = {}, "productSelect.image", r.image), 
    _defineProperty(a, "productSelect.price", r.price), _defineProperty(a, "productSelect.stock", 0), 
    _defineProperty(a, "productSelect.unique", ""), _defineProperty(a, "productSelect.cart_num", 0), 
    _defineProperty(a, "attrValue", ""), _defineProperty(a, "attr", "请选择"), a));
}), _defineProperty(_Page, "ChangeCartNum", function(t) {
    var e = t.detail, a = this.data.productValue[this.data.attrValue];
    if (void 0 !== a || this.data.productAttr.length || (a = this.data.productSelect), 
    void 0 !== a) {
        var o, i, r = a.stock || 0;
        if (null == a.cart_num && (a.cart_num = 1), e) a.cart_num++, a.cart_num > r && (a.cart_num = r), 
        a.cart_num < 1 && (a.cart_num = 1), this.setData((_defineProperty(o = {}, "productSelect.cart_num", a.cart_num), 
        _defineProperty(o, "cart_num", a.cart_num), o)); else a.cart_num--, a.cart_num < 1 && (a.cart_num = 1), 
        this.setData((_defineProperty(i = {}, "productSelect.cart_num", a.cart_num), _defineProperty(i, "cart_num", a.cart_num), 
        i));
    }
}), _defineProperty(_Page, "listenerActionSheet", function() {
    this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
    });
}), _defineProperty(_Page, "setDomain", function(t) {
    return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
}), _defineProperty(_Page, "downloadFilestoreImage", function() {
    var e = this;
    wx.downloadFile({
        url: e.data.live.local_cover,
        success: function(t) {
            console.log(9999, t), e.setData({
                storeImage: t.tempFilePath
            });
        },
        fail: function() {
            e.setData({
                storeImage: ""
            });
        }
    });
}), _defineProperty(_Page, "downloadFilePromotionCode", function(e) {
    var a = this;
    console.log(111111, this.data.live), (0, _live.getLiveQrcode)(this.data.live.live_id, {
        type: 3
    }).then(function(t) {
        wx.downloadFile({
            url: t.data.code,
            success: function(t) {
                "function" == typeof e ? e && e(t.tempFilePath) : a.setData({
                    PromotionCode: t.tempFilePath
                });
            },
            fail: function(t) {
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
}), _defineProperty(_Page, "posterImageClose", function() {
    this.setData({
        posterImageStatus: !1
    });
}), _defineProperty(_Page, "goPoster", function() {
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
                _util2.default.PosterCanvas(a, e.data.live.title, "", function(t) {
                    e.setData({
                        posterImage: t,
                        posterImageStatus: !0,
                        canvasStatus: !1,
                        actionSheetHidden: !e.data.actionSheetHidden
                    });
                });
            }) : _util2.default.PosterCanvas(a, e.data.live.title, "", function(t) {
                console.log(222222, a, e.data.live.title), e.setData({
                    posterImage: t,
                    posterImageStatus: !0,
                    canvasStatus: !1,
                    actionSheetHidden: !e.data.actionSheetHidden
                });
            });
        }
    });
}), _defineProperty(_Page, "savePosterPath", function() {
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
}), _defineProperty(_Page, "onMyEvent", function(t) {
    this.setData({
        "attribute.cartAttr": t.detail.window,
        isOpen: !1
    });
}), _defineProperty(_Page, "onShareAppMessage", function() {
    return {
        title: this.data.live.title || "",
        path: "/live/pages/live_playback/index?playback=" + this.data.playback + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
    };
}), _defineProperty(_Page, "selectActionSheet", function(t) {
    this.setData({
        actionSheetHidden: !1
    }), "poster" == t.detail.type && this.goPoster();
}), _Page));