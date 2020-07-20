var _goods = require("../../api/goods.js"), _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的收藏",
            color: !0,
            class: "red"
        },
        host_product: [],
        loadTitle: "加载更多",
        loading: !1,
        loadend: !1,
        collectProductList: [],
        limit: 8,
        page: 1
    },
    onLoadFun: function() {
        this.get_user_collect_product(), this.get_host_product();
    },
    onLoad: function(t) {},
    get_user_collect_product: function() {
        var e = this;
        this.data.loading || this.data.loadend || (e.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _user.getCollectUserList)({
            page: e.data.page,
            limit: e.data.limit
        }).then(function(t) {
            var a = t.data, o = a.length < e.data.limit;
            console.log(a.length), e.data.collectProductList = app.SplitArray(a, e.data.collectProductList), 
            e.setData({
                collectProductList: e.data.collectProductList,
                loadend: o,
                loadTitle: o ? "拉到底了哦" : "加载更多",
                page: e.data.page + 1,
                loading: !1
            });
        }).catch(function(t) {
            e.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    delCollection: function(t) {
        var a = t.target.dataset.id, o = this, e = t.target.dataset.index;
        (0, _goods.collectDel)(a).then(function(t) {
            return app.Tips({
                title: "取消收藏成功",
                icon: "success"
            }, function() {
                o.data.collectProductList.splice(e, 1), o.setData({
                    collectProductList: o.data.collectProductList
                });
            });
        });
    },
    get_host_product: function() {
        var a = this;
        (0, _goods.getHotGoods)().then(function(t) {
            a.setData({
                host_product: t.data
            });
        });
    },
    onReachBottom: function() {
        this.get_user_collect_product();
    }
});