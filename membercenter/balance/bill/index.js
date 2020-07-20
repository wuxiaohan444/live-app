var _user = require("../../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "账单明细",
            color: !0,
            class: "0"
        },
        loadTitle: "加载更多",
        loading: !1,
        loadend: !1,
        page: 1,
        limit: 10,
        pm: 0,
        userBillList: []
    },
    onLoadFun: function() {
        this.getUserBillList();
    },
    onLoad: function(t) {
        this.setData({
            pm: t.pm || 0
        });
    },
    getUserBillList: function() {
        var e = this;
        if (!e.data.loadend && !e.data.loading) {
            e.setData({
                loading: !0,
                loadTitle: ""
            });
            var t = {
                page: e.data.page,
                limit: e.data.limit,
                pm: e.data.pm
            };
            (0, _user.getCreditBill)(t, 0).then(function(t) {
                var a = t.data, i = a.length < e.data.limit;
                e.data.userBillList = app.SplitArray(a, e.data.userBillList), e.setData({
                    userBillList: e.data.userBillList,
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
    changePm: function(t) {
        this.setData({
            pm: t.currentTarget.dataset.pm,
            loadend: !1,
            page: 1,
            userBillList: []
        }), this.getUserBillList();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getUserBillList();
    }
});