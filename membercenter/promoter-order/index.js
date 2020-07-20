var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "推广人订单",
            color: !0,
            class: "0"
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        limit: 20,
        page: 1,
        status: !1,
        recordList: [],
        recordCount: 0
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        this.getRecordOrderList();
    },
    getRecordOrderList: function() {
        var o = this;
        o.data.loadend || (o.data.loading || (o.setData({
            loading: !0,
            loadTitle: ""
        }), wx.showLoading(), 1 != o.data.status && (0, _user.spreadOrder)({
            page: o.data.page
        }).then(function(a) {
            var t = a.data.list || [], e = t.length < a.data.limit;
            o.data.recordList = app.SplitArray(t, o.data.recordList), o.setData({
                recordCount: a.data.count || 0,
                recordList: o.data.recordList,
                loadend: e,
                limit: a.data.limit,
                loading: !1,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: o.data.page + 1
            }), wx.hideLoading();
        })));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getRecordOrderList();
    },
    onShareAppMessage: function() {}
});