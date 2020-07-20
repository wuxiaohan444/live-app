var _goods = require("../../../api/goods.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "搜索商品",
            color: !1
        },
        hot_goods: [],
        searchValue: "",
        placeholder: "搜索你要的商品",
        focus: !0,
        bastList: [],
        hotSearchList: [],
        first: 0,
        limit: 8,
        page: 1,
        loading: !1,
        loadend: !1
    },
    onLoad: function(t) {
        this.setData({
            searchValue: t.keywords,
            store_id: t.store_id
        }), t.keywords && this.setHistory(t.keywords), t.store_id && 0 < t.store_id && this.setData({
            placeholder: "搜索本店商品"
        });
    },
    getRoutineHotSearch: function() {
        var a = this;
        (0, _goods.getSearchKeyword)().then(function(t) {
            a.setData({
                hotSearchList: t.data
            });
        });
    },
    setHistory: function(t) {
        var a = "search_goods_keywords", e = _util2.default.getCache(a, []), o = !1;
        for (var s in e) e[s] == t && (o = !0);
        o || (e.length < 10 ? e.unshift(t) : (e.unshift(t), e.pop())), _util2.default.setCache(a, e, 0);
    },
    clearHistory: function() {
        _util2.default.removeCache("search_goods_keywords"), this.setData({
            historys: []
        });
    },
    getGoodsList: function() {
        var o = this;
        this.data.loading || this.data.loadend || (this.setData({
            loading: !0,
            loadTitle: "正在搜索"
        }), (0, _goods.getGoodsList)({
            store_id: o.data.store_id,
            keyword: o.data.searchValue,
            page: this.data.page,
            limit: this.data.limit
        }).then(function(t) {
            wx.hideLoading();
            var a = t.data, e = a.length < o.data.limit;
            o.data.bastList = app.SplitArray(a, o.data.bastList), o.setData({
                bastList: o.data.bastList,
                loading: !1,
                loadend: e,
                page: o.data.page + 1,
                loadTitle: e ? "加载完毕" : "加载更多"
            });
        }).catch(function(t) {
            wx.hideLoading(), o.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    getHotGoods: function() {
        var a = this;
        (0, _goods.getHotGoods)().then(function(t) {
            a.setData({
                hot_goods: t.data
            });
        });
    },
    onReady: function() {},
    setHotSearchValue: function(t) {
        this.setData({
            searchValue: t.currentTarget.dataset.item,
            loading: !1,
            loadend: !1,
            page: 1,
            bastList: []
        }), this.getGoodsList();
    },
    setValue: function(t) {
        this.setData({
            searchValue: t.detail
        });
    },
    searchBut: function() {
        var t = this;
        if (this.setData({
            focus: !1
        }), !t.data.searchValue) return app.Tips({
            title: "请输入要搜索的商品",
            icon: "none",
            duration: 1e3,
            mask: !0
        });
        this.setHistory(t.data.searchValue), t.setData({
            page: 1,
            loadend: !1,
            bastList: []
        }), wx.showLoading({
            title: "正在搜索中"
        }), t.getGoodsList();
    },
    onCancel: function() {
        this.setData({
            searchValue: ""
        });
    },
    onShow: function() {
        var t = this;
        t.data.searchValue && (t.setData({
            page: 1,
            loadend: !1,
            bastList: [],
            focus: !1
        }), wx.showLoading({
            title: "正在搜索中"
        }), t.getGoodsList()), this.getRoutineHotSearch(), this.getHotGoods();
        var a = _util2.default.getCache("search_goods_keywords", []);
        this.setData({
            historys: a
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getGoodsList(), this.selectComponent("#recommend").getHostProduct();
    },
    onShareAppMessage: function() {}
});