var _store = require("../../../../api/plugin/merch/store.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "交易明细",
            color: !0,
            class: "0"
        },
        loadTitle: "加载更多",
        loading: !1,
        loadend: !1,
        page: 1,
        limit: 10,
        income: 0,
        userBillList: []
    },
    onLoadFun: function() {
        this.getBillList();
    },
    onLoad: function(t) {
        this.setData({
            income: t.income || 0
        });
    },
    getBillList: function() {
        var e = this;
        if (!e.data.loadend && !e.data.loading) {
            e.setData({
                loading: !0,
                loadTitle: ""
            });
            var t = {
                page: e.data.page,
                limit: e.data.limit,
                income: e.data.income
            };
            (0, _store.getBill)(t, 0).then(function(t) {
                var a = t.data, i = a.length < e.data.limit;
                e.data.list = app.SplitArray(a, e.data.list), e.setData({
                    list: e.data.list,
                    loadend: i,
                    loading: !1,
                    loadTitle: i ? "拉到底了哦!" : "加载更多",
                    page: e.data.page + 1
                });
            }, function(t) {
                e.setData({
                    loading: !1,
                    loadTitle: "加载更多"
                });
            });
        }
    },
    changeIncome: function(t) {
        this.setData({
            income: t.currentTarget.dataset.income,
            loadend: !1,
            page: 1,
            list: []
        }), this.getBillList();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getBillList();
    }
});