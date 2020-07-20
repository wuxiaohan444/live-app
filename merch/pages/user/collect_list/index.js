var _user = require("../../../../api/plugin/merch/user.js"), app = getApp();

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
        list: [],
        limit: 8,
        page: 1
    },
    onLoadFun: function() {
        this.getColletStoreList();
    },
    onLoad: function(t) {},
    getColletStoreList: function() {
        var i = this;
        this.data.loading || this.data.loadend || (i.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _user.getColletStoreList)({
            page: i.data.page,
            limit: i.data.limit
        }).then(function(t) {
            var a = t.data, e = a.length < i.data.limit;
            console.log(a.length), i.data.list = app.SplitArray(a, i.data.list), i.setData({
                list: i.data.list,
                loadend: e,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: i.data.page + 1,
                loading: !1
            });
        }).catch(function(t) {
            i.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    delCollection: function(t) {
        var a = t.target.dataset.id, e = this, i = t.target.dataset.index;
        (0, _user.storeCollect)(a).then(function(t) {
            return app.Tips({
                title: "取消收藏成功",
                icon: "success"
            }, function() {
                e.data.list.splice(i, 1), e.setData({
                    list: e.data.list
                });
            });
        });
    },
    onReachBottom: function() {
        this.getColletStoreList();
    }
});