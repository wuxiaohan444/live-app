var _wxParse = require("../../../lib/wxParse/wxParse"), _wxParse2 = _interopRequireDefault(_wxParse), _order = require("../../../api/order.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util), _live = require("../../../api/live"), _goods = require("../../../api/goods.js");

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

var webim = require("../../../resource/js/chat/webim.js"), webimhandler = require("../../../resource/js/chat/webim_handler.js"), tls = require("../../../resource/js/chat/tls.js"), app = getApp();

Component({
    properties: {
        hidden: Boolean,
        isInput: {
            type: Boolean,
            value: !1
        },
        live_id: {
            type: Number,
            value: 0
        },
        userInfo: {
            type: Object,
            value: []
        },
        likeCount: {
            type: Number,
            value: 0
        }
    },
    data: {
        popPayShow: !1,
        random: "",
        userInfo: {},
        live: {},
        gives: [],
        comments: [],
        scrollT: 0,
        goods_id: 0,
        cart_num: 0,
        goodsCount: 0,
        actionSheetHidden: !0,
        likeCount: 0,
        welcome: "",
        attribute: {
            cartAttr: !1
        },
        productAttr: [],
        posterbackgd: "/images/posterbackgd.png",
        productSelect: {}
    },
    pageLifetimes: {
        hide: function() {
            clearInterval(this.longTapBubbleTimer);
        }
    },
    attached: function() {
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            screenTotalH: app.globalData.screenTotalH
        });
    },
    ready: function() {},
    methods: {
        onLoadFun: function(t) {
            console.log(this.data.live), this.getLiveDetail(this.data.live_id), this.downloadFilePromotionCode();
        },
        queryMultipleNodes: function() {
            var e = this;
            wx.nextTick(function() {
                wx.createSelectorQuery().in(e).select("#chatInfo").boundingClientRect(function(t) {
                    t && (console.log(3333, t), e.setData({
                        scrollT: t.height
                    }));
                }).exec();
            });
        },
        onMyEvent: function(t) {
            this.setData({
                "attribute.cartAttr": t.detail.window,
                isOpen: !1
            });
        },
        joinCart: function(t) {
            var e = t.currentTarget.dataset.goodsid;
            this.getGoodsDetails(e), this.setData({
                "attribute.cartAttr": !0,
                isOpen: !0
            }), this.closePopPay();
        },
        closePopCart: function() {
            this.setData({
                "attribute.cartAttr": !1,
                isOpen: !1
            }), this.getPopPay();
        },
        goCat: function(t) {
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
                }), e.getPopPay(), a ? wx.navigateTo({
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
        },
        getGoodsDetails: function(a) {
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
        },
        DefaultSelect: function() {
            for (var t = this.data.productAttr, e = this.data.storeInfo, a = 0, i = t.length; a < i; a++) t[a].attr_value[0] && (t[a].checked = t[a].attr_value[0].attr);
            var o, r, n = this.data.productAttr.map(function(t) {
                return t.checked;
            }), s = this.data.productValue[n.sort().join(",")];
            s ? this.setData((_defineProperty(o = {}, "productSelect.store_name", e.store_name), 
            _defineProperty(o, "productSelect.image", s.image), _defineProperty(o, "productSelect.price", s.price), 
            _defineProperty(o, "productSelect.stock", s.stock), _defineProperty(o, "productSelect.unique", s.unique), 
            _defineProperty(o, "productSelect.cart_num", 1), _defineProperty(o, "attrValue", n), 
            _defineProperty(o, "attr", "已选择"), o)) : this.setData((_defineProperty(r = {}, "productSelect.store_name", e.store_name), 
            _defineProperty(r, "productSelect.image", e.image), _defineProperty(r, "productSelect.price", e.price), 
            _defineProperty(r, "productSelect.stock", this.data.productAttr.length ? 0 : e.stock), 
            _defineProperty(r, "productSelect.unique", ""), _defineProperty(r, "productSelect.cart_num", this.data.productAttr.length ? 0 : 1), 
            _defineProperty(r, "attrValue", ""), _defineProperty(r, "attr", "请选择"), r));
            this.setData({
                productAttr: t
            });
        },
        ChangeAttr: function(t) {
            var e, a, i = t.detail, o = this.data.productValue[i], r = this.data.storeInfo;
            o ? this.setData((_defineProperty(e = {}, "productSelect.image", o.image), _defineProperty(e, "productSelect.price", o.price), 
            _defineProperty(e, "productSelect.stock", o.stock), _defineProperty(e, "productSelect.unique", o.unique), 
            _defineProperty(e, "productSelect.cart_num", 1), _defineProperty(e, "attrValue", i), 
            _defineProperty(e, "attr", "已选择"), e)) : this.setData((_defineProperty(a = {}, "productSelect.image", r.image), 
            _defineProperty(a, "productSelect.price", r.price), _defineProperty(a, "productSelect.stock", 0), 
            _defineProperty(a, "productSelect.unique", ""), _defineProperty(a, "productSelect.cart_num", 0), 
            _defineProperty(a, "attrValue", ""), _defineProperty(a, "attr", "请选择"), a));
        },
        ChangeCartNum: function(t) {
            var e = t.detail, a = this.data.productValue[this.data.attrValue];
            if (void 0 !== a || this.data.productAttr.length || (a = this.data.productSelect), 
            void 0 !== a) {
                var i, o, r = a.stock || 0;
                if (null == a.cart_num && (a.cart_num = 1), e) a.cart_num++, a.cart_num > r && (a.cart_num = r), 
                a.cart_num < 1 && (a.cart_num = 1), this.setData((_defineProperty(i = {}, "productSelect.cart_num", a.cart_num), 
                _defineProperty(i, "cart_num", a.cart_num), i)); else a.cart_num--, a.cart_num < 1 && (a.cart_num = 1), 
                this.setData((_defineProperty(o = {}, "productSelect.cart_num", a.cart_num), _defineProperty(o, "cart_num", a.cart_num), 
                o));
            }
        },
        listenerActionSheet: function() {
            this.setData({
                actionSheetHidden: !this.data.actionSheetHidden
            });
        },
        setDomain: function(t) {
            return -1 < (t = t ? t.toString() : "").indexOf("https://") ? t : t.replace("http://", "https://");
        },
        getCommentsLists: function(t) {
            var e = this;
            (0, _live.getCommentsLists)(t).then(function(t) {
                e.setData({
                    comments: t.data
                }), e.queryMultipleNodes();
            });
        },
        getLiveDetail: function(t) {
            var e = this;
            wx.showLoading(), (0, _live.getLiveDetail)(t).then(function(t) {
                e.setData({
                    userInfo: t.data.userInfo,
                    live: t.data.live,
                    gives: t.data.gives,
                    goodsCount: t.data.goodsCount,
                    is_follow: t.data.is_follow,
                    chat_notice: t.data.chat_notice,
                    recommend_goods: t.data.recommend_goods,
                    likeCount: t.data.live.likes
                }), e.triggerEvent("setLive", {
                    live: t.data.live
                }), e.requestInitIM(t.data.userInfo), wx.hideLoading();
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        },
        requestInitIM: function() {
            var e = this;
            (0, _live.getChatConfig)(e.data.live_id).then(function(t) {
                e.setData({
                    chatConfig: t.data
                }), tls.init({
                    sdkappid: t.data.sdk_appid
                }), e.initIM();
            });
        },
        initIM: function() {
            var e = this, t = e.data.chatConfig;
            webimhandler.init({
                accountMode: 1,
                accountType: "",
                sdkAppID: t.sdk_appid,
                avChatRoomId: t.chat_id,
                selType: webim.SESSION_TYPE.GROUP,
                selToID: t.chat_id,
                selSess: null
            });
            var a = {
                sdkAppID: t.sdk_appid,
                appIDAt3rd: t.sdk_appid,
                accountType: "",
                identifier: t.identifier,
                identifierNick: e.data.userInfo.nickname,
                avatar: e.data.userInfo.avatar,
                user_id: e.data.userInfo.id,
                userSig: t.usersig,
                live_id: e.data.live_id,
                content_type: 0,
                random: 0
            };
            this.setData({
                loginInfo: a
            });
            webimhandler.onDestoryGroupNotify, webimhandler.onRevokeGroupNotify, webimhandler.onCustomGroupNotify;
            var i = {
                onConnNotify: function(t) {
                    switch (t.ErrorCode) {
                      case webim.CONNECTION_STATUS.ON:
                        break;

                      case webim.CONNECTION_STATUS.OFF:
                        webim.Log.warn("连接已断开，无法收到新消息，请检查下你的网络是否正常");
                        break;

                      default:
                        webim.Log.error("未知连接状态,status=" + t.ErrorCode);
                    }
                },
                onBigGroupMsgNotify: function(t) {
                    webimhandler.onBigGroupMsgNotify(t, function(t) {
                        e.receiveMsgs(t);
                    });
                },
                onMsgNotify: webimhandler.onMsgNotify,
                onGroupSystemNotifys: webimhandler.onGroupSystemNotifys,
                onGroupInfoChangeNotify: webimhandler.onGroupInfoChangeNotify
            };
            webimhandler.sdkLogin(this.data.loginInfo, i, {
                isAccessFormalEnv: !0,
                isLogOn: !1
            }, t.chat_id);
        },
        receiveMsgs: function(t) {
            var e = this, a = this.data.comments || [], i = t.content.match(/data\=(.*?)\,\s+desc\=(.*?)\,\s+ext\=(.*)/i);
            if (i) {
                var o = i[3];
                o = JSON.parse(o);
                var r = this.data.random, n = o.random, s = o.nickname, d = o.user_id, c = o.live_id;
                if (r != n && c == this.data.live_id) {
                    if (this.setData({
                        "loginInfo.random": n
                    }), t.content = i[1], t.nickname = s, t.user_id = d, 99 == o.content_type) return this.setData({
                        welcome: t.fromAccountNick,
                        showNotice: !0
                    }), void setTimeout(function() {
                        e.setData({
                            showNotice: !1
                        });
                    }, 2e3);
                    1 == o.content_type && (a.push(t), this.setData({
                        comments: a
                    }), this.queryMultipleNodes());
                }
            }
        },
        sendMsg: function(e) {
            var a = this, i = Math.round(4294967296 * Math.random());
            this.setData({
                "loginInfo.random": i,
                "loginInfo.content_type": 1
            }), (0, _live.getCommentsStore)(a.data.live_id, {
                content: e,
                content_type: 1
            }).then(function(t) {
                webimhandler.onSendMsg({
                    content: e,
                    content_type: 1,
                    nickname: a.data.userInfo.nickname,
                    random: i
                }, function() {});
            }).catch(function(t) {
                return app.Tips({
                    title: t
                });
            });
        },
        liveLike: function(t) {
            var e = {
                checkedNum: this.data.likeCount + 1
            };
            this.triggerEvent("traCheckedNum", e);
        },
        follow: function() {
            var e = this;
            (0, _live.followLive)(e.data.live_id, 1).then(function(t) {
                e.setData({
                    is_follow: t.data.is_follow
                });
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
        liveBack: function() {
            1 < getCurrentPages().length ? wx.navigateBack() : wx.reLaunch({
                url: "/common/pages/loading/loading"
            });
        },
        getPopPay: function() {
            console.log(11111), this.getLiveGoods();
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
        }
    }
});