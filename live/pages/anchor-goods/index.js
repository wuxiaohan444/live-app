var _Page, _live = require("../../../api/live.js"), _dialog = require("../../../vant/dialog/dialog"),
    _dialog2 = _interopRequireDefault(_dialog), _common = require("../../../api/common"),
    _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse);

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
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "直播商品",
            color: !0,
            class: "0"
        },
        examineKeywords: {},
        addGoodsShow: !1,
        live_id: 0,
        searchGoods: [],
        liveGoods: [],
        goodsPage: {
            loading: !1,
            loadend: !1,
            page: 1,
            limit: 10
        },
        liveButton: true
    },
    onLoad(e) {
        if (e.add == 1) {
            this.setData({
                liveButton: false
            })
        } else {
            this.setData({
                liveButton: true
            })
        }
    },
    onLoadFun: function () {
        this.getAnchorInfo(), this.getExamineKeywords();
    },
    getExamineKeywords: function () {
        var e = this;
        (0, _common.getExamineKeywords)().then(function (t) {
            e.setData({
                examineKeywords: t.data,
                // "parameter.title": t.data.keywords_live_anchor + "申请"
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, e, 0);
        }).catch(function (t) {
        });
    },
    getAnchorInfo: function () {
        var e = this;
        (0, _live.getAnchorInfo)().then(function (t) {
            e.setData({
                live_id: t.data.live.id
            }), e.getInfo();
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    addGoodsOpen: function () {
        this.setData({
            addGoodsShow: !this.data.addGoodsShow
        }), this.getCommissionGoods();
    },
    changTop: function (t) {
        var a = this, o = this.data.liveGoods, i = t.currentTarget.dataset.goodsid, n = t.currentTarget.dataset.sort;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: 1 == n ? "确定置顶该商品吗?" : "确定要取消置顶该商品吗?",
            cancelButtonText: "在考虑下",
            confirmButtonText: 1 == n ? "置顶" : "取消置顶"
        }).then(function () {
            (0, _live.changTop)(a.data.live_id, {
                goods_id: i,
                sort: n
            }).then(function (t) {
                for (var e = 0; e < o.length; e++) o[e].id == i && (o[e].sort = n), a.setData({
                    liveGoods: o
                });
            }).catch(function (t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function () {
        });
    },
    addliveGoods: function (t) {
        var a = t.currentTarget.dataset.goodsid, o = this, i = this.data.liveGoods;
        (0, _live.addLiveGoods)(this.data.live_id, {
            goods_id: a
        }).then(function (t) {
            i.push(t.data), o.setData({
                liveGoods: i
            });
            for (var e = 0; e < o.data.searchGoods.length; e++) o.data.searchGoods[e].id == a && (o.data.searchGoods[e].has_add = !0,
                o.setData({
                    searchGoods: o.data.searchGoods
                }));
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    searchGoods: function (t) {
        var e = t.detail.value;
        this.setData({
            keywords: e,
            searchGoods: [],
            goodsPage: {
                loading: !1,
                loadend: !1,
                page: 1
            }
        }), this.getCommissionGoods();
    },
    getCommissionGoods: function () {
        var o = this, i = this.data.goodsPage;
        i.loadend || i.loading || (i.loading = !0, i.loadTitle = "",
            o.setData({
                goodsPage: i
            }), (0, _live.getCommissionGoods)(this.data.live_id, {
            keywords: this.data.keywords,
            page: i.page
        }).then(function (t) {
            var e = t.data.goods || [], a = e.length < t.data.limit;
            o.data.searchGoods = app.SplitArray(e, o.data.searchGoods), i.loadend = a, i.limit = t.data.limit,
                i.loading = !1, i.page = i.page + 1, i.loadTitle = a ? "拉到底了哦" : "加载更多", o.setData({
                // searchGoods: o.data.searchGoods,
                goodsPage: i
            });
            var obj = {};
            o.data.searchGoods = o.data.searchGoods.reduce(function (item, next) {
                obj[next.id] ? '' : obj[next.id] = true && item.push(next);
                return item;
            }, []);
            o.setData({
                searchGoods: o.data.searchGoods
            })
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        }));
    },
    getInfo: function () {
        var e = this;
        (0, _live.getAnchorLiveGoods)(this.data.live_id).then(function (t) {
            e.setData({
                liveGoods: t.data.goods
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    delLiveGoods: function (t) {
        var e = this;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: "确定移除商品吗?",
            cancelButtonText: "算了",
            confirmButtonText: "移除商品"
        }).then(function () {
            var o = e, i = e.data.liveGoods, n = t.currentTarget.dataset.goodsid;
            (0, _live.delLiveGoods)(o.data.live_id, {
                goods_id: n
            }).then(function (t) {
                for (var e = 0; e < i.length; e++) i[e].id == n && i.splice(e, 1), o.setData({
                    liveGoods: i
                });
                var a = Math.round(4294967296 * Math.random());
                chatIm.sendMsg({
                    content: {
                        goods_id: n
                    },
                    content_type: 404,
                    nickname: o.data.userInfo.nickname,
                    user_id: o.data.userInfo.id,
                    random: a
                }, o.data.userInfo, o.data.chatConfig);
            }).catch(function (t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function () {
        });
    },
    goLivePush: function () {
        wx.reLaunch({
            url: "/live/pages/live_push/index"
        })
    },
    exposure: function (t) {
        var a = this, o = this.data.liveGoods, i = t.currentTarget.dataset.goodsid, n = t.currentTarget.dataset.status;
        _dialog2.default.confirm({
            title: "温馨提示",
            message: 1 == n ? "确定曝光该商品吗?" : "确定要取消曝光该商品吗?",
            cancelButtonText: "在考虑下",
            confirmButtonText: 1 == n ? "曝光" : "取消曝光"
        }).then(function () {
            (0, _live.exposure)(a.data.live_id, {
                goods_id: i,
                status: n
            }).then(function (t) {
                for (var e = 0; e < o.length; e++) o[e].id == i && (o[e].status = n, o[e]), a.setData({
                    liveGoods: o
                });
            }).catch(function (t) {
                return app.Tips({
                    title: t
                });
            });
        }).catch(function () {
        });
    }
}, "changTop", function (t) {
    var a = this, o = this.data.liveGoods, i = t.currentTarget.dataset.goodsid, n = t.currentTarget.dataset.sort;
    _dialog2.default.confirm({
        title: "温馨提示",
        message: 1 == n ? "确定置顶该商品吗?" : "确定要取消置顶该商品吗?",
        cancelButtonText: "在考虑下",
        confirmButtonText: 1 == n ? "置顶" : "取消置顶"
    }).then(function () {
        (0, _live.changTop)(a.data.live_id, {
            goods_id: i,
            sort: n
        }).then(function (t) {
            for (var e = 0; e < o.length; e++) o[e].id == i && (o[e].sort = n), a.setData({
                liveGoods: o
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    }).catch(function () {
    });
}), _defineProperty(_Page, "onGoodscroll", function () {
    this.getCommissionGoods();
}), _Page));