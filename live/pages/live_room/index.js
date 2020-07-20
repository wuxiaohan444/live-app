var _Page, _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse), _order = require("../../../api/order.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util), _live = require("../../../api/live"), _common = require("../../../api/common"), _live2 = require("../../../api/plugin/viewing_rewards/live"), _goods = require("../../../api/goods");

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

var chatIm = require("../../../lib/chat/init.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {
        live_id: 0,
        live: {},
        comments: [],
        recommend_goods: [],
        chatConfig: {},
        chat_notice: "",
        isAuto: !0,
        iShidden: !0,
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
        inputValue: "",
        actions: [ {
            type: "share",
            name: "分享给好友",
            openType: "share"
        }, {
            type: "poster",
            name: "生成海报分享给好友"
        } ],
        isSlider: !1,
        sliderValue: 0,
        updateState: !1,
        allTime: "00:00:00",
        currentTime: "00:00:00",
        examineKeywords: {}
    },
    gopages: function(t) {
        t.target.dataset.url && wx.redirectTo({
            url: t.target.dataset.url
        });
    },
    onLoadFun: function(t) {
        this.getLiveDetail(this.data.live_id), this.downloadFilePromotionCode(), this.getLiveCommentsLists(this.data.live_id), 
        this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var e = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            e.setData({
                examineKeywords: t.data
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, e, 0);
        }).catch(function(t) {});
    },
    viewingRewardsPlugintoRoom: function(t) {
        (0, _live2.viewingRewardsPlugintoRoom)(t).then(function(t) {});
    },
    getLiveCommentsLists: function(t) {
        var e = this;
        (0, _live.getLiveCommentsLists)(t).then(function(t) {
            e.setData({
                comments: t.data
            }), e.queryMultipleNodes();
        });
    },
    getLiveDetail: function(e) {
        var a = this, i = this;
        (0, _live.getLiveDetail)(e).then(function(t) {
            i.setData({
                userInfo: t.data.userInfo,
                live: t.data.live,
                gives: t.data.gives,
                chatConfig: t.data.chatConfig,
                goodsCount: t.data.goodsCount,
                is_follow: t.data.is_follow,
                chat_notice: t.data.chat_notice,
                recommend_goods: t.data.recommend_goods,
                likeCount: t.data.live.likes
            }), chatIm.init(t.data.userInfo, t.data.chatConfig, e, a), i.downloadFilestoreImage(), 
            t.data.viewing_rewards && i.viewingRewardsPlugintoRoom(i.data.live_id);
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    receiveMsgs: function(t) {
        var e = this, a = chatIm.receiveMsgs(t, this.data.userInfo, this.data.chatConfig);
        if (a) {
            var i = this.data.comments || [];
            if (this.data.random != a.random && a.live_id == this.data.live_id) {
                if (this.setData({
                    "loginInfo.random": a.random
                }), 99 == a.content_type) return this.setData({
                    welcome: a.nickname,
                    showNotice: !0
                }), void setTimeout(function() {
                    e.setData({
                        showNotice: !1
                    });
                }, 2e3);
                if (300 != a.content_type) if (404 != a.content_type) a.user_id != this.data.userInfo.id || 400 != a.content_type && 600 != a.content_type || (i.push(a), 
                this.setData({
                    comments: i
                }), this.queryMultipleNodes()), 2 == a.content_type && (i.push(a), this.setData({
                    comments: i
                }), this.queryMultipleNodes()), 1 == a.content_type && (i.push(a), this.setData({
                    comments: i
                }), this.queryMultipleNodes()); else {
                    n = a.content;
                    if (0 < (o = this.data.recommend_goods).length) for (r = 0; r < o.length; r++) o[r].id == n.goods_id && o.splice(r, 1);
                    this.setData({
                        recommend_goods: o
                    });
                } else {
                    var o, n = a.content;
                    if (0 < (o = this.data.recommend_goods).length) for (var r = 0; r < o.length; r++) o[r].id == n.id && (0 == n.status && o.splice(r, 1), 
                    1 == n.status && o.push(n)); else 1 == n.status && o.push(n);
                    this.setData({
                        recommend_goods: o
                    });
                }
            }
        }
    },
    onLoad: function(t) {
        if (t.scene) {
            var e = _util2.default.getUrlParams(decodeURIComponent(t.scene));
            e.live_id && (t.live_id = e.live_id), e.spid && (app.globalData.spid = e.spid);
        }
        if (!t.live_id) return app.Tips({
            title: "缺少参数无法查看"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            live_id: t.live_id
        }), t.spid && (app.globalData.spid = t.spid);
    },
    liveLike: function(t) {
        this.setData({
            likeCount: this.data.likeCount + 1
        });
    },
    follow: function() {
        var e = this;
        (0, _live.followLive)(e.data.live_id, 1).then(function(t) {
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
        (0, _live.getLiveGoods)(e.data.live_id).then(function(t) {
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
    onTouchLike: function() {
        var a = this;
        this.setData({
            hoverLike: !0,
            dataLike: 1
        });
        var t = function() {
            var t = a.selectComponent("#bubble"), e = a.data.dataLike;
            a.setData({
                dataLike: e + 1
            }), t.showBubble();
        };
        t(), clearInterval(a.longTapBubbleTimer), a.longTapBubbleTimer = setInterval(t, 150);
    },
    onCancelTouchLike: function() {
        var e = this;
        this.setData({
            hoverLike: !1
        }), (0, _live.addLike)(e.data.live_id, {
            num: this.data.dataLike
        }).then(function(t) {
            e.setData({
                likeCount: t.data
            });
        }), clearInterval(this.longTapBubbleTimer);
    },
    onReady: function() {
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            screenTotalH: app.globalData.screenTotalH
        }), this.videoContext = wx.createVideoContext("livePlayer"), this.setData({
            updateState: !0
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
}), _defineProperty(_Page, "sendMsg", function(t) {
    var e = this, a = this;
    if (t.detail.value) var i = t.detail.value; else i = this.data.inputValue;
    if (i.replace(/^\s*|\s*$/g, "")) {
        this.setData({
            isInput: !1
        });
        var o = Math.round(4294967296 * Math.random());
        this.setData({
            "loginInfo.random": o,
            "loginInfo.content_type": 1
        }), (0, _live.getCommentsStore)(a.data.live_id, {
            content: i,
            content_type: 1
        }).then(function(t) {
            chatIm.sendMsg({
                content: i,
                content_type: 1,
                nickname: a.data.userInfo.nickname,
                user_id: a.data.userInfo.id,
                random: o
            }, e.data.userInfo, e.data.chatConfig);
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    }
}), _defineProperty(_Page, "onHide", function() {
    (0, _live2.viewingRewardsPlugleaveRoom)(this.data.live_id).then(function(t) {}), 
    chatIm.logout(this.data.chatConfig);
}), _defineProperty(_Page, "onUnload", function() {
    (0, _live2.viewingRewardsPlugleaveRoom)(this.data.live_id).then(function(t) {}), 
    chatIm.logout(this.data.chatConfig);
}), _defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "queryMultipleNodes", function() {
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
    var e = this, a = t.currentTarget.dataset.ispay, i = this.data.productValue[this.data.attrValue];
    return this.data.attrValue ? (this.setData({
        "attribute.cartAttr": !this.data.isOpen
    }), this.data.attribute.cartAttr ? this.closePopPay() : this.getPopPay()) : this.data.isOpen ? (this.setData({
        "attribute.cartAttr": !0
    }), this.closePopPay()) : (this.setData({
        "attribute.cartAttr": !this.data.attribute.cartAttr
    }), this.data.attribute.cartAttr ? this.closePopPay() : this.getPopPay()), !0 === this.data.attribute.cartAttr && 0 == this.data.isOpen ? this.setData({
        isOpen: !0
    }) : this.data.productAttr.length && void 0 === i && 1 == this.data.isOpen ? app.Tips({
        title: "请选择属性"
    }) : void (0, _order.postCartAdd)({
        productId: e.data.goods_id,
        relation_type: 1,
        relation_id: e.data.live_id,
        cartNum: e.data.cart_num,
        uniqueId: void 0 !== i ? i.unique : "",
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
    var i = this;
    (0, _goods.getGoodsDetail)(a).then(function(t) {
        var e = t.data.storeInfo;
        i.setData({
            storeInfo: e,
            goods_id: a,
            productAttr: t.data.productAttr,
            productValue: t.data.productValue
        }), i.DefaultSelect(), _wxParse2.default.wxParse("description", "html", i.data.description, i, 0);
    }).catch(function(t) {
        return app.Tips({
            title: t
        });
    });
}), _defineProperty(_Page, "DefaultSelect", function() {
    for (var t = this.data.productAttr, e = this.data.storeInfo, a = 0, i = t.length; a < i; a++) t[a].attr_value[0] && (t[a].checked = t[a].attr_value[0].attr);
    var o, n, r = this.data.productAttr.map(function(t) {
        return t.checked;
    }), s = this.data.productValue[r.sort().join(",")];
    s ? this.setData((_defineProperty(o = {}, "productSelect.store_name", e.store_name), 
    _defineProperty(o, "productSelect.image", s.image), _defineProperty(o, "productSelect.price", s.price), 
    _defineProperty(o, "productSelect.stock", s.stock), _defineProperty(o, "productSelect.unique", s.unique), 
    _defineProperty(o, "productSelect.cart_num", 1), _defineProperty(o, "attrValue", r), 
    _defineProperty(o, "attr", "已选择"), o)) : this.setData((_defineProperty(n = {}, "productSelect.store_name", e.store_name), 
    _defineProperty(n, "productSelect.image", e.image), _defineProperty(n, "productSelect.price", e.price), 
    _defineProperty(n, "productSelect.stock", this.data.productAttr.length ? 0 : e.stock), 
    _defineProperty(n, "productSelect.unique", ""), _defineProperty(n, "productSelect.cart_num", this.data.productAttr.length ? 0 : 1), 
    _defineProperty(n, "attrValue", ""), _defineProperty(n, "attr", "请选择"), n));
    this.setData({
        productAttr: t
    });
}), _defineProperty(_Page, "ChangeAttr", function(t) {
    var e, a, i = t.detail, o = this.data.productValue[i], n = this.data.storeInfo;
    o ? this.setData((_defineProperty(e = {}, "productSelect.image", o.image), _defineProperty(e, "productSelect.price", o.price), 
    _defineProperty(e, "productSelect.stock", o.stock), _defineProperty(e, "productSelect.unique", o.unique), 
    _defineProperty(e, "productSelect.cart_num", 1), _defineProperty(e, "attrValue", i), 
    _defineProperty(e, "attr", "已选择"), e)) : this.setData((_defineProperty(a = {}, "productSelect.image", n.image), 
    _defineProperty(a, "productSelect.price", n.price), _defineProperty(a, "productSelect.stock", 0), 
    _defineProperty(a, "productSelect.unique", ""), _defineProperty(a, "productSelect.cart_num", 0), 
    _defineProperty(a, "attrValue", ""), _defineProperty(a, "attr", "请选择"), a));
}), _defineProperty(_Page, "ChangeCartNum", function(t) {
    var e = t.detail, a = this.data.productValue[this.data.attrValue];
    if (void 0 !== a || this.data.productAttr.length || (a = this.data.productSelect), 
    void 0 !== a) {
        var i, o, n = a.stock || 0;
        if (null == a.cart_num && (a.cart_num = 1), e) a.cart_num++, a.cart_num > n && (a.cart_num = n), 
        a.cart_num < 1 && (a.cart_num = 1), this.setData((_defineProperty(i = {}, "productSelect.cart_num", a.cart_num), 
        _defineProperty(i, "cart_num", a.cart_num), i)); else a.cart_num--, a.cart_num < 1 && (a.cart_num = 1), 
        this.setData((_defineProperty(o = {}, "productSelect.cart_num", a.cart_num), _defineProperty(o, "cart_num", a.cart_num), 
        o));
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
        url: e.setDomain(e.data.live.local_cover),
        success: function(t) {
            e.setData({
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
    (0, _live.getLiveQrcode)(this.data.live_id, {
        type: 2
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
    return console.log(11111, "/live/pages/live_room/index?live_id=" + this.data.live_id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id), 
    {
        title: this.data.live.title || "",
        path: "/live/pages/live_room3/index?live_id=" + this.data.live_id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
    };
}), _defineProperty(_Page, "selectActionSheet", function(t) {
    this.setData({
        actionSheetHidden: !1
    }), "poster" == t.detail.type && this.goPoster();
}), _defineProperty(_Page, "formatSeconds", function(t) {
    var e = parseInt(t), a = 0, i = 0;
    60 < e && (a = parseInt(e / 60), e = parseInt(e % 60), 60 <= a && (i = parseInt(a / 60), 
    a = parseInt(a % 60)));
    var o = "00:00:" + (e = "60" == (e = e < 10 ? "0" + e : e) ? "00" : e);
    return 0 < (a = "60" == (a = a < 10 ? "0" + a : a) ? "00" : a) && (o = "00:" + a + ":" + e), 
    0 < (i = i < 10 ? "0" + i : i) && (o = i + ":" + a + ":" + e), o;
}), _defineProperty(_Page, "videoUpdate", function(t) {
    this.setData({
        isSlider: !0
    });
    var e = this.formatSeconds(t.detail.duration);
    if (this.setData({
        allTime: e
    }), this.data.updateState) {
        var a = this.formatSeconds(t.detail.currentTime), i = t.detail.currentTime / t.detail.duration * 100;
        this.setData({
            sliderValue: i,
            duration: t.detail.duration,
            currentTime: a
        });
    }
}), _defineProperty(_Page, "sliderChanging", function(t) {
    this.setData({
        updateState: !1
    });
}), _defineProperty(_Page, "sliderChange", function(t) {
    this.data.duration && (this.videoContext.seek(t.detail.value / 100 * this.data.duration), 
    this.setData({
        sliderValue: t.detail.value,
        updateState: !0
    }), this.videoContext.play());
}), _Page));