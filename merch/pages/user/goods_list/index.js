var _goods = require("../../../../api/goods.js"), _user = require("../../../../api/plugin/merch/user.js");

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
        productList: [],
        parameter: {
            navbar: "1",
            return: "1",
            title: "商品列表",
            color: !0,
            class: "0"
        },
        navH: "",
        is_switch: !0,
        where: {
            sid: 0,
            keyword: "",
            priceOrder: "",
            salesOrder: "",
            news: 0,
            page: 1,
            limit: 10,
            cid: 0
        },
        price: 0,
        stock: 0,
        nows: !1,
        loadend: !1,
        loading: !1,
        loadTitle: "加载更多"
    },
    onLoad: function(t) {
        var e;
        this.setData((_defineProperty(e = {
            store_id: t.store_id
        }, "where.sid", t.sid || 0), _defineProperty(e, "title", t.title || ""), _defineProperty(e, "where.keyword", t.searchValue || ""), 
        _defineProperty(e, "navH", app.globalData.navHeight), e)), this.get_product_list(), 
        this.get_host_product();
    },
    Changswitch: function() {
        this.setData({
            is_switch: !this.data.is_switch
        });
    },
    searchSubmit: function(t) {
        var e;
        this.setData((_defineProperty(e = {}, "where.keyword", t.detail.value), _defineProperty(e, "loadend", !1), 
        _defineProperty(e, "where.page", 1), e)), this.get_product_list(!0);
    },
    get_host_product: function() {
        var e = this;
        (0, _goods.getHotGoods)().then(function(t) {
            e.setData({
                host_product: t.data
            });
        });
    },
    set_where: function(t) {
        switch (t.target.dataset.type) {
          case "1":
            return wx.navigateBack({
                delta: 1
            });

          case "2":
            0 == this.data.price ? this.data.price = 1 : 1 == this.data.price ? this.data.price = 2 : 2 == this.data.price && (this.data.price = 0), 
            this.setData({
                price: this.data.price,
                stock: 0
            });
            break;

          case "3":
            0 == this.data.stock ? this.data.stock = 1 : 1 == this.data.stock ? this.data.stock = 2 : 2 == this.data.stock && (this.data.stock = 0), 
            this.setData({
                stock: this.data.stock,
                price: 0
            });
            break;

          case "4":
            this.setData({
                nows: !this.data.nows
            });
        }
        this.setData(_defineProperty({
            loadend: !1
        }, "where.page", 1)), this.get_product_list(!0);
    },
    setWhere: function() {
        0 == this.data.price ? this.data.where.priceOrder = "" : 1 == this.data.price ? this.data.where.priceOrder = "desc" : 2 == this.data.price && (this.data.where.priceOrder = "asc"), 
        0 == this.data.stock ? this.data.where.salesOrder = "" : 1 == this.data.stock ? this.data.where.salesOrder = "desc" : 2 == this.data.stock && (this.data.where.salesOrder = "asc"), 
        this.data.where.news = this.data.nows ? 1 : 0, this.setData({
            where: this.data.where
        });
    },
    get_product_list: function(t) {
        var s = this;
        this.setWhere(), s.data.loadend || s.data.loading || (!0 === t && s.setData({
            productList: []
        }), s.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _user.getGoodsList)(this.data.store_id, s.data.where).then(function(t) {
            var e = t.data, a = app.SplitArray(e, s.data.productList), i = e.length < s.data.where.limit;
            s.setData(_defineProperty({
                loadend: i,
                loading: !1,
                loadTitle: i ? "已全部加载" : "加载更多",
                productList: a
            }, "where.page", s.data.where.page + 1));
        }).catch(function(t) {
            s.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t;
        this.setData((_defineProperty(t = {}, "where.page", 1), _defineProperty(t, "loadend", !1), 
        _defineProperty(t, "productList", []), t)), this.get_product_list(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.get_product_list(), this.selectComponent("#recommend").getHostProduct();
    }
});