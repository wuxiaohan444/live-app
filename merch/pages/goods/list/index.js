var _goods = require("../../../../api/plugin/merch/goods.js"), _store = require("../../../../api/plugin/merch/store.js"), _live = require("../../../../api/live.js"), _common = require("../../../../api/common.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "商品管理",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        type: 1,
        loadTitle: "",
        loading: !1,
        loadend: !1,
        page: 1,
        limit: 10,
        store: {},
        goods: [],
        examineKeywords: {}
    },
    onLoad: function(t) {
        var o = t.type || 1;
        this.setData({
            type: o
        });
    },
    onLoadFun: function() {
        this.getInfo(), this.getGoodsList(), this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var o = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            o.setData({
                examineKeywords: t.data
            });
        }).catch(function(t) {});
    },
    getInfo: function() {
        var o = this;
        (0, _store.getInfo)().then(function(t) {
            o.setData({
                store: t.data
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            loadend: !1,
            loading: !1,
            goods: []
        }), this.getGoodsList();
    },
    onReachBottom: function() {
        this.getGoodsList();
    },
    onShareAppMessage: function() {},
    getGoodsList: function() {
        var e = this;
        e.data.loadend || e.data.loading || (e.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _goods.getGoodsList)({
            type: e.data.type,
            page: e.data.page,
            limit: e.data.limit
        }).then(function(t) {
            var o = t.data || [], a = o.length < e.data.limit;
            e.data.goods = app.SplitArray(o, e.data.goods), wx.stopPullDownRefresh(), e.setData({
                goods: e.data.goods,
                limit: e.data.limit,
                loadend: a,
                loading: !1,
                loadTitle: a ? "拉到底了哦" : "加载更多",
                page: e.data.page + 1
            });
        }));
    },
    switchType: function(t) {
        if (this.data.type === t.target.dataset.type) return !1;
        this.setData({
            type: t.target.dataset.type,
            page: 1,
            loadend: !1,
            goods: []
        }), this.getGoodsList();
    },
    upState: function(t) {
        var o = this, a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.state;
        wx.showLoading(), (0, _goods.goodsUpState)(a, e).then(function(t) {
            wx.hideLoading(), o.setData({
                loading: !1,
                loadend: !1,
                page: 1,
                goods: []
            }), o.onLoadFun();
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    },
    liveGoodsUpdate: function(t) {
        var o = this, a = t.currentTarget.dataset.id;
        wx.showLoading(), (0, _goods.liveGoodsUpdate)(a).then(function(t) {
            wx.hideLoading(), o.setData({
                loading: !1,
                loadend: !1,
                page: 1,
                goods: []
            }), o.onLoadFun();
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    },
    delGoods: function(t) {
        var o = this, a = t.currentTarget.dataset.id;
        _dialog2.default.confirm({
            title: "",
            message: "确定删除吗?"
        }).then(function() {
            wx.showLoading(), (0, _goods.goodsDelete)(a).then(function(t) {
                wx.hideLoading(), o.setData({
                    loading: !1,
                    loadend: !1,
                    page: 1,
                    goods: []
                }), o.onLoadFun();
            }).catch(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 2e3
                });
            });
        }).catch(function() {});
    }
});